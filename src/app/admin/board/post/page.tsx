'use client';

import SelectCategory from '@/components/admin/board/SelectCategory';
import { Button, Popconfirm, Table } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ColumnsType } from 'antd/es/table';
import { Board, Post } from '@/types/board';
import useFireStore from '@/hooks/admin/useFireStore';
import { Timestamp, orderBy, where } from 'firebase/firestore';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Page = () => {
  const PostModal = useMemo(
    () =>
      dynamic(async () => await import('@/components/admin/board/PostModal'), {
        ssr: false,
      }),
    []
  );

  const MoveCategoryModal = useMemo(
    () =>
      dynamic(
        async () => await import('@/components/admin/board/MoveCategoryModal'),
        {
          ssr: false,
        }
      ),
    []
  );

  const [categoryId, setCategoryId] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<Required<Post>[]>([]);

  // 수정 모달
  const [isOpen, setIsOpen] = useState(false);
  // 카테고리 이동 모달
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const {getDataList, ...firestore} = useFireStore();

  const getCategoryList = useCallback(async () => {
    const res = await getDataList('boards', orderBy('order', 'asc'));
    setCategoryList(res);
  }, [getDataList]);

  const fetchData = useCallback(async () => {
    let res;
    if (categoryId) {
      res = await getDataList(
        'posts',
        where('category', '==', categoryId || null),
        orderBy('createdAt', 'desc')
      );
    } else {
      res = await getDataList('posts', orderBy('createdAt', 'desc'));
    }

    setPostCount(res.length);
    setData(res);
  }, [categoryId, getDataList])

  const [categoryList, setCategoryList] = useState<Board[]>([]);

  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    fetchData();
    getCategoryList();
  }, [categoryId, getCategoryList, fetchData]);


  const getCategoryName = useCallback(
    (id: string) => {
      const categoryName = categoryList.find((cate) => cate.id === id)?.title;
      return categoryName;
    },
    [categoryList]
  );

  const openModal = useCallback((post: Required<Post>) => {
    setCurrentId(post.id);
    setIsOpen(true);
  }, []);

  const openMoveCategoryModal = useCallback(() => {
    setIsCategoryOpen(true);
  }, []);

  const deletePosts = useCallback(async () => {
    try {
      await firestore.deleteDataListByIds('posts', selectedRowKeys as string[]);

      // 선택 초기화
      setSelectedRowKeys([]);
      // 리스트 다시 불러옴
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, [fetchData, firestore, selectedRowKeys]);

  const columns: ColumnsType<Required<Post>> = useMemo(
    () => [
      {
        title: '카테고리',
        dataIndex: 'category',
        render: (text: string) => getCategoryName(text) || '-',
      },
      {
        title: '제목',
        dataIndex: 'title',
        render: (text: string, record: Required<Post>) => (
          <Button onClick={() => openModal(record)} type='link'>
            {text}
          </Button>
        ),
      },
      {
        title: '작성일시',
        dataIndex: 'createdAt',
        render: (text: Timestamp) => {
          const date = dayjs(text.toDate()).format('YYYY-MM-DD HH:mm');
          return date;
        },
      },
    ],
    [getCategoryName, openModal]
  );

  return (
    <div>
      <div className='flex w-full flex-wrap'>
        <div className='w-full flex md:w-1/2'>
          <SelectCategory data={categoryList} setCategoryId={setCategoryId} />

          <Link href='/admin/board/post/add'>
            <Button type='primary' className='ml-3'>
              새 글 작성
            </Button>
          </Link>
        </div>

        <Button
          disabled={!hasSelected}
          onClick={openMoveCategoryModal}
          className='mt-3 md:mt-0 md:ml-auto mr-3'>
          선택 게시글 이동
        </Button>
        <Popconfirm
          disabled={!hasSelected}
          title='게시글 삭제'
          description='정말 삭제할까요? 삭제한 게시글은 복구할 수 없습니다.'
          onConfirm={deletePosts}
          okText='네!'
          cancelText='취소'>
          <Button className='mt-3 md:mt-0' danger disabled={!hasSelected}>
            선택 삭제
          </Button>
        </Popconfirm>
      </div>
      <div className='text-lg mt-3'>
        {categoryId ? getCategoryName(categoryId) : '모든 카테고리'}
        <b className='font-bold'> ({postCount})</b>
      </div>

      <div>
        <div className='h-5'>
          <span>
            {hasSelected ? `${selectedRowKeys.length} 개 선택` : '   '}
          </span>
        </div>

        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <PostModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        currentId={currentId}
        fetchData={fetchData}
      />
      <MoveCategoryModal
        setIsOpen={setIsCategoryOpen}
        isOpen={isCategoryOpen}
        selectedIds={selectedRowKeys as string[]}
        fetchData={fetchData}
        categoryList={categoryList}
      />
    </div>
  );
};

export default Page;
