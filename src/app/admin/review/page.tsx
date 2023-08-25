'use client';

import { useCallback, useEffect, useState } from 'react';
import useFireStore from '@/hooks/admin/useFireStore';
import { Review } from '@/types/review';
import { Card, Space, Typography } from 'antd';
import { orderBy } from 'firebase/firestore';
const Page = () => {
  const firestore = useFireStore();
  const [data, setData] = useState<Required<Review>[]>([]);

  const fetchData = useCallback(async () => {
    const res = await firestore.getDataList<Required<Review>[]>(
      'reviews',
      orderBy('createdAt', 'desc')
    );
    setData(res || []);
  }, [firestore]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className='m-auto flex-col w-full items-center justify-center'>
      {data.map((reivew) => (
        <Card
          key={reivew.id}
          title={reivew.nickname}
          extra={reivew.email}
          className={'w-full  md:w-96 m-auto mb-3'}>
          <Typography.Text strong>{reivew.title}</Typography.Text>
          <p>{reivew.content}</p>
        </Card>
      ))}
    </div>
  );
};

export default Page;
