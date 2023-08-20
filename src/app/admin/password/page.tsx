'use client';

import { Button, Divider, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import useFireStore from '@/hooks/admin/useFireStore';

const Page = () => {
  const firestore = useFireStore();
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const changeUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value)
  }, [])

  const changePassowrd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }, [])

  const save = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    firestore.updateData('settings', 'common', {
      password,
      passwordUrl: url
    })
  }, [password, url])

  useEffect(() => {
    (async () => {
      const res = await firestore.getData<{
        password: string;
        passwordUrl: string;
        allowJoin: boolean;
      }>('settings', 'common');
      if (res) {
        setPassword(res.password);
        setUrl(res.passwordUrl);
      }
    })();
  }, []);

  return (
    <div>
      <Divider orientation='left'>비밀번호 페이지</Divider>

      <div className='w-full h-10 flex flex-col'>
        <Input placeholder='https://google.com' value={url} onChange={changeUrl} />
      </div>
      <Divider orientation='left'>비밀번호</Divider>

      <div className='w-full h-10 flex flex-col'>
        <Input placeholder='your-password' value={password} onChange={changePassowrd} />
      </div>

      <Divider />

      <Button onClick={save}>저장</Button>
    </div>
  );
};

export default Page;
