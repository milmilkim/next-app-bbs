'use client';

import React, { useState, SetStateAction } from 'react';
import { Button, Modal } from 'antd';
import useFireStore from '@/hooks/admin/useFireStore';
import SelectCategory from './SelectCategory';
import { Board } from '@/types/board';

interface PostModalProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  selectedIds: string[];
  categoryList: Board[];
  fetchData: () => Promise<void>;
}
const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  setIsOpen,
  categoryList,
  selectedIds,
  fetchData,
}) => {
  const firestore = useFireStore();

  const update = async () => {
    try {
      if(!categoryId) {
        return;
      }
      const dataList = selectedIds.map((id) => ({
        id,
        data: { category: categoryId },
      }));
      await firestore.updateDataList('posts', dataList);
      setIsOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const [categoryId, setCategoryId] = useState('');

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      forceRender
      title='카테고리 이동'
      open={isOpen}
      footer={null}
      onCancel={handleCancel}>
      <div className='my-5 w-full flex justify-center'>
        <SelectCategory data={categoryList} setCategoryId={setCategoryId} />
        <Button type={'primary'} className='ml-3' onClick={update} disabled={!categoryId} >
          이동
        </Button>
      </div>
    </Modal>
  );
};

export default PostModal;
