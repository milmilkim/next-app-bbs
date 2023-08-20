'use client';

import 'src/app/globals.css';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import MainMenu from './MainMenu';
import { categoryAtom } from '@/atoms/categoryAtom';
import { where } from 'firebase/firestore';
import * as firestore from '@/utils/firestore';
import { Board } from '@/types/board';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const isShowSpinner = useAtomValue(isShowSpinnerAtom);


  const setCategory = useSetAtom(categoryAtom);

  const getCategoryList = async () => {
    const res = await firestore.getDataList('boards', where('isPublic', '==', true));
    const menus = firestore.getArray<Board>(res);
    setCategory(menus.sort((a,b) => a.order - b.order));
  }

  useEffect(() => {
    getCategoryList();
  }, [])
  
  return (
    <div>
      {isShowSpinner ? <LoadingSpinner /> : null}
      <MainMenu />

      <div className={`overflow-y-auto`}>{children}</div>
    </div>
  );
};

export default CommonLayout;
