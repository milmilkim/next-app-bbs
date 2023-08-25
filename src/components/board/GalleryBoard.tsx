'use client';

import GalleryList from './gallery/GalleryList';
import { motion } from 'framer-motion';
import TopScroll from '@/components/common/TopScroll';
import { useCallback, useEffect, useState } from 'react';
import { QueryConstraint, where } from 'firebase/firestore';
import { getArray, getDataList } from '@/utils/firestore';
import { Post } from '@/types/board';
import { SetStateAction } from 'jotai';
import { notoSansRegular } from '@/utils/googleFonts';

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const GalleryBoard = ({
  id,
  url,
  title,
}: {
  id: string;
  url: string;
  title: string;
}) => {
  const [initialedDataList, setInitialedDataList] = useState<Required<Post>[]>(
    []
  );
  const [dataList, setDataList] = useState<Required<Post>[]>([]);

  /** 조회 */

  const fetchList = useCallback(async (
    setter: React.Dispatch<SetStateAction<Required<Post>[]>>
  ) => {
    let query: QueryConstraint[];
    if (id) {
      query = [where('category', '==', id)];
    } else {
      query = [];
    }

    const res = await getDataList('posts', ...query);

    const list = getArray<Required<Post>>(res);
    setter(shuffleArray(list));
  }, [id])

  useEffect(() => {
    fetchList(setInitialedDataList);
  }, [fetchList]);

  useEffect(() => {
    setDataList(initialedDataList);
  }, [initialedDataList]);

  const search = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const input = e.currentTarget.keyword;
      const keyword = input.value;
      const result = initialedDataList.filter((item) =>
        item.title.includes(keyword)
      );

      setDataList(result);

      input.value = '';
    },
    [initialedDataList]
  );

  return (
    <div className={`w-full ${notoSansRegular.className}`}>
      <div className='m-auto left-1/2 -translate-x-1/2 w-full h-screen  fixed top-0 bg-primary overflow-hidden border-solid'></div>

      <div className='relative w-full max-w-sm m-auto'>
        {/* inner */}
        <motion.div
          className='relative min-h-screen'
          initial={{ filter: 'blur(5px)', opacity: 0 }}
          animate={{ filter: 'blur(0)', opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: '99px' }}>
          <div
            className='font-UhBee text-2xl'
            style={{
              top: '-9px',
              right: '40px',
              position: 'absolute',

            }}>
              {title}
            </div>
          <div style={{ margin: '0 50px' }}>
            <form onSubmit={search}>
              <input
                name='keyword'
                type='text'
                placeholder='search'
                className='mt-12 w-full opacity-70 shadow-md shadow-gray-200 rounded-2xl px-2 focus:outline-none focus:border-primary focus:ring-2 caret-primary focus:ring-primary  '
                style={{ height: 50 }}
              />
            </form>

            <div className='mb-14' />
          </div>

          <div className='mb-11'></div>
          <GalleryList category={url} dataList={dataList} />
          <div className='mb-32'></div>

          <div className='flex justify-center mb-32'>
            <TopScroll />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryBoard;
