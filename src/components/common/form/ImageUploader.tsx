import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { uploadImage } from '@/utils/storage';
import { SetStateAction } from 'jotai';
import Image from 'next/image';

interface Props {
	imageUrl: string;
	setImageUrl: React.Dispatch<SetStateAction<string>>
}
const App: React.FC<Props> = ({imageUrl, setImageUrl}) => {
  const [loading, setLoading] = useState(false);

  const beforeUpload = async (file: RcFile) => {
    const isJpgOrPng = file.type.startsWith('image/');
    if (!isJpgOrPng) {
      message.error('이미지만 업로드하세요');
      return false;
    }

    try {
      setLoading(true);
      const res = await uploadImage(file);
      setImageUrl(res);
      message.success('업로드 완료');
    } catch (err) {
      message.error('업로드 실패');
    } finally {
      setLoading(false);
    }

	return false
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        beforeUpload={beforeUpload}>
        {imageUrl ? (
          <Image src={imageUrl} alt='avatar' style={{ width: '100%' }} width={150} height={150} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default App;
