'use client';

import Editor from '@/components/common/form/Editor';
import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Input, Switch } from 'antd';
import { Timestamp } from 'firebase/firestore';
import useFireStore from '@/hooks/admin/useFireStore';
import { useRouter } from 'next/navigation';
import SelectCategory from '@/components/admin/board/SelectCategory';
import { Board, Post } from '@/types/board';
import useMessage from '@/hooks/admin/useMessage';
import { AiFillLock } from 'react-icons/ai';
import ImageUploader from '@/components/common/form/ImageUploader';
const Home = () => {
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryList, setCategoryList] = useState<Board[]>([]);

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();

  const message = useMessage();

  const { writeData, getDataList } = useFireStore();

  const getCategoryList = useCallback(async () => {
    const res = await getDataList('boards');
    setCategoryList(res);
  }, [getDataList]);

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setTitle(title);
  }, []);

  const changeWriter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const writer = e.currentTarget.value;
    setWriter(writer);
  }, []);

  const changeIsSecret = useCallback((checked: boolean) => {
    setIsSecret(checked);
  }, []);

  const save = async () => {
    if (!title) {
      message.warning('제목은 필수입니다');
      return;
    }

    if (!writer) {
      message.warning('작가는 필수입니다');
      return;
    }

    if (!categoryId) {
      message.warning('카테고리 선택은 필수입니다.');
      return;
    }

    const data: Post = {
      content: value,
      category: categoryId,
      title,
      isSecret,
      writer,
      createdAt: Timestamp.fromDate(new Date()),
      thumbnailUrl: imageUrl || '',
      heart: 0,
    };

    await writeData('posts', data);
    router.back();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      {message.contextHolder}
      <SelectCategory data={categoryList} setCategoryId={setCategoryId} />
      <div className='mb-3'></div>

      <Input placeholder='제목' className='mb-2' onChange={changeTitle} />
      <Input placeholder='작가' onChange={changeWriter} />

      <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />

      <div className='mb-3'></div>
      <Editor value={value} setValue={setValue} />

      <div className='mb-3'>
        <AiFillLock className='align-middle' />
        <Switch
          className='mr-2 ml-2'
          checkedChildren='잠금'
          unCheckedChildren='공개'
          defaultChecked={isSecret}
          onChange={changeIsSecret}
        />
      </div>

      <Button type='primary' className='my-5' onClick={save}>
        등록
      </Button>
      <Button className='ml-2' onClick={goBack}>
        목록으로
      </Button>
    </div>
  );
};

export default Home;
