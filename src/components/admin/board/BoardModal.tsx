'use client';

import React, { useState, SetStateAction, useEffect, useCallback } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { Board, BoardType } from '@/types/board';
import useMessage from '@/hooks/admin/useMessage';
import useFireStore from '@/hooks/admin/useFireStore';

interface BoardModalProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  status: 'add' | 'edit';
  category: Board | null;
  categoryList: Board[];
  fetchData: () => Promise<void>;
}
const BoardModal: React.FC<BoardModalProps> = ({
  isOpen,
  setIsOpen,
  status,
  category,
  categoryList,
  fetchData,
}) => {
  const { contextHolder, success, error } = useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFireStore();

  const [form] = Form.useForm();

  const checkDuplicate = useCallback(
    (value: string) => {
      const tmp = categoryList.map((cate) => cate.url);
      const urls = tmp.filter((url) => url !== category?.url);
      return urls.includes(value);
    },
    [categoryList]
  );

  useEffect(() => {
    form.setFieldsValue({
      title: category?.title,
      url: category?.url,
      isPublic: category?.isPublic,
      type: category?.type,
    });
  }, [category]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onFinish = async (val: {
    title: string;
    url: string;
    isPublic: boolean;
    type: BoardType;
  }) => {
    try {
      setIsLoading(true);
      if (status === 'add') {
        firestore.writeData('boards', {
          ...val,
          order: 0,
          type: val.type || 'DEFAULT',
          isPublic: val.isPublic || false,
        });

        await fetchData();
      } else if (status === 'edit') {
        if (category) {
          firestore.updateData('boards', category?.id, {
            ...val,
            type: val.type || 'DEFAULT',
            isPublic: val.isPublic || false,
            id: category!.id,
            order: category!.order,
          });

          await fetchData();
        }
      }
      form.resetFields();
      success();
      setIsOpen(false);
    } catch (err) {
      error();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      forceRender
      title='카테고리'
      open={isOpen}
      footer={null}
      onCancel={handleCancel}>
      <>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item
            label='게시판 이름'
            name='title'
            rules={[{ required: true, message: '게시판 이름은 필수값입니다' }]}>
            <Input placeholder='게시판' />
          </Form.Item>

          <Form.Item
            label='게시판 URL'
            name='url'
            rules={[
              { required: true, message: 'URL은 필수값입니다' },
              { max: 20, message: 'URL은 20자를 초과할 수 없습니다' },
              {
                validator: (_, value) => {
                  if (value && value.includes('/')) {
                    return Promise.reject("URL에는 '/'가 포함되면 안 됩니다");
                  }
                  return Promise.resolve();
                },
              },
              {
                validator: (_, value) => {
                  if (value && checkDuplicate(value)) {
                    return Promise.reject('이미 존재하는 URL입니다');
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <Input placeholder='my-board' />
          </Form.Item>

          <Form.Item label='게시판 타입' name='type'>
            <Select placeholder='타입 선택'>
              <Select.Option value='DEFAULT'>기본 게시판</Select.Option>
              <Select.Option value='GALLERY'>갤러리</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='게시판 공개 설정'
            name='isPublic'
            valuePropName='checked'>
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              저장
            </Button>
          </Form.Item>
        </Form>
      </>
      {contextHolder}
    </Modal>
  );
};

export default BoardModal;
