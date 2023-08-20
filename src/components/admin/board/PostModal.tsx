'use client';

import React, { useState, SetStateAction, useEffect, useCallback } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import Editor from '@/components/common/form/Editor';
import useFireStore from '@/hooks/admin/useFireStore';
import { Post } from '@/types/board';
import { extractFirstImage } from '@/utils/post';

interface PostModalProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  currentId: string;
  fetchData: () => Promise<void>;
}
const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  setIsOpen,
  currentId,
  fetchData,
}) => {
  const firestore = useFireStore();

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState<Post | null>(null);

  const update = async () => {

    // html안 첫 번째 이미지 추출
    const thumbnailUrl = extractFirstImage(value);

    console.log({
      title,
      content: value,
      thumbnailUrl
    })

    await firestore.updateData('posts', currentId, {
      title,
      content: value,
      thumbnailUrl
    });
    fetchData();
    setIsOpen(false);
  };

  const getPost = useCallback(async () => {
    const data = await firestore.getData('posts', currentId);
    setPost(data);
  }, [currentId]);

  useEffect(() => {
    if (currentId) {
      getPost();
    }
  }, [currentId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setValue(post.content);
    }
  }, [post]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setTitle(title);
  };

  return (
    <Modal
      forceRender
      title='게시글 수정'
      open={isOpen}
      footer={null}
      width={'700px'}
      onCancel={handleCancel}>
      <>
        <Input
          placeholder='제목'
          className='mt-3'
          onChange={changeTitle}
          value={title}
        />
        <div className='mb-5'></div>
        <Editor value={value} setValue={setValue} />

        <Button type='primary' onClick={update} className='mt-10'>
          수정
        </Button>
      </>
    </Modal>
  );
};

export default PostModal;
