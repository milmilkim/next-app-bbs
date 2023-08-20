'use client';

import { auth } from '@/lib/firebase';
import { Button, Input, QRCode, Space, Alert } from 'antd';
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import messageAtom from '@/atoms/messageAtom';
import { Divider } from 'antd';

export const MyInfo = () => {
  const session = useSession();
  const message = useAtomValue(messageAtom);
  const [url, setUrl] = useState('');

  const handleReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      message.success('비밀번호 재설정 이메일을 전송했습니다.');
    } catch (err) {
      console.error(err);
      message.error('비밀번호 재설정 이메일 전송 중 오류:');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.origin;
      setUrl(url);
    }
  }, []);

  return (
    <div>
      <Divider orientation='left'>계정</Divider>

      <div className='w-full h-10 flex flex-col'>
        <Input
          placeholder='이메일'
          value={session.data?.user.email}
          disabled={true}
        />
      </div>
      <div className='w-full'>
        <Button
          className='float-right'
          type='primary'
          disabled={!session.data?.user.email}
          onClick={() => handleReset(session.data?.user.email!)}>
          비밀번호 재설정
        </Button>
      </div>
      <div className='w-full'></div>

      <Divider orientation='left'>QR CODE</Divider>
      <Space className='h-56' direction='vertical' align='center'>
        {url ? (
          <>
            <QRCode value={url} />
            <Input placeholder='-' maxLength={60} value={url} readOnly />
          </>
        ) : null}
      </Space>
    </div>
  );
};

export default MyInfo;
