'use client';

import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { Board, BoardType } from '@/types/board';
import useMessage from '@/hooks/admin/useMessage';
import dynamic from 'next/dynamic';
import useFireStore from '@/hooks/admin/useFireStore';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 10 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const App: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Board[]>([]);

  const BoardModal = dynamic(
    async () => await import('@/components/admin/board/BoardModal'),
    { ssr: false }
  );
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setCategoryList((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'add' | 'edit'>('add');
  const [category, setCategory] = useState<Board | null>(null);
  const { contextHolder, success, error, warning } = useMessage();

  const {getDataList,...firestore} = useFireStore();

  const columns: ColumnsType<Board> = [
    {
      key: 'sort',
      title: '순서 변경',
    },
    {
      title: '이름',
      dataIndex: 'title',
      render: (text, record) => (
        <Button type='link' onClick={() => openEditModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'url',
      dataIndex: 'url',
      width: 150,
    },
    {
      title: '공개 설정',
      dataIndex: 'isPublic',
      render: (text) => {
        return text ? '공개' : '비공개';
      },
    },
    {
      title: '게시판 타입',
      dataIndex: 'type',
      render: (text: BoardType) => {
        switch (text) {
          case 'GALLERY':
            return '갤러리';

          case 'DEFAULT':
          default:
            return '목록';
        }
      },
    },
    {
      title: '삭제',
      dataIndex: 'id',
      render: (_, record) => {
        return (
          <div>
            <Button onClick={() => removeCategory(record)} danger>
              삭제
            </Button>
          </div>
        );
      },
    },
  ];

  const openAddModal = () => {
    setStatus('add');
    setCategory(null);
    setIsOpen(true);
  };

  const openEditModal = (val: Board) => {
    setStatus('edit');
    setCategory(val);
    setIsOpen(true);
  };

  const removeCategory = async (cate: Board) => {
    await firestore.deleteDataListByIds('boards', [cate.id]);
    getDataSource();
  };

  const getDataSource = useCallback(async () => {
    const res = (await getDataList<Board[]>('boards')) || [];
    setCategoryList(res.sort((a,b) => a.order - b.order));
  }, [getDataList])

  const saveOrder = async () => {
    const list = categoryList.map((category, index) => ({
      id: category.id,
      data: {
        order: index + 1,
      },
    }));

    await firestore.updateDataList('boards', list);
  };

  useEffect(() => {
    getDataSource();
  }, [getDataSource]);


  return (
    <>
      {contextHolder}
      <div className='flex'>
        <div className='ml-auto'>
          <Button onClick={() => openAddModal()}>게시판 추가</Button>
          <Button
            onClick={() => saveOrder()}
            type='primary'
            className='ml-2 mb-5'>
            순서 저장
          </Button>
        </div>
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={categoryList.map((i) => i.id!)}
          strategy={verticalListSortingStrategy}>
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey='id'
            columns={columns}
            dataSource={categoryList}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </SortableContext>
      </DndContext>

      <BoardModal
        fetchData={getDataSource}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        status={status}
        category={category}
        categoryList={categoryList}
      />
    </>
  );
};

export default App;
