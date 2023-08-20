'use client';

import { Post } from '@/types/board';
import { getArray, getDataList } from '@/utils/firestore';
import { limit, orderBy, startAfter, where } from 'firebase/firestore';

import { useEffect, useRef, useState } from 'react';
import PostCard from './PostCard';

interface GalleryListProps {
  categoryName: string;
  categoryId: string;
  categoryUrl: string;
}
const GalleryList: React.FC<GalleryListProps> = ({
  categoryName,
  categoryId,
  categoryUrl,
}) => {
  // 카테고리 해당하는 게시글 가져오기
  const [dataList, setDataList] = useState<Required<Post>[]>([]);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [lastDocument, setLastDocument] = useState<Required<Post>>();

  const fetchNextList = async () => {
    const res = await getDataList(
      'posts',
      where('category', '==', categoryId),
      orderBy('createdAt', 'desc'),
      startAfter(lastDocument?.createdAt || ''),
      limit(10)
    );
    return res;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];

        if (first.isIntersecting && !isLoading && !isAllDataLoaded) {
          setIsLoading(true);

          const res = await fetchNextList();
          const newData = getArray<Required<Post>>(res);

          if (newData.length < 1) setIsAllDataLoaded(true);
          setDataList((dataList) => [...dataList, ...newData]);

          const lastDocument = newData[newData.length - 1];
          setLastDocument(lastDocument);

          setIsLoading(false);
        }
      },
      { threshold: 1 }
    );

    const currentLoadingRef = loadingRef.current;

    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef) observer.unobserve(currentLoadingRef);
    };
  }, [isLoading, isAllDataLoaded, dataList, lastDocument]);

  return (
    <>
      <div className='w-full md:max-w-2xl m-auto flex flex-col flex-wrap gap-7 mt-10 justify-center md:justify-start mb-5'>
        {dataList.map((item: Required<Post>) => (
          <PostCard
            category={categoryName}
            key={item.id}
            title={item.title}
            id={item.id}
            link={`/category/${categoryUrl}/${item.id}`}
          />
        ))}
        {!isAllDataLoaded ? (
          <div className='w-full flex justify-center' ref={loadingRef}>
            loading...
          </div>
        ) : dataList.length < 1 ? (
          <div className='w-full flex justify-center'>
            게시글이 존재하지 않습니다.
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GalleryList;
