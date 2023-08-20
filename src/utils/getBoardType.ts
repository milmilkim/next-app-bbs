import { BoardType } from '@/types/board';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const getComponent: (
  type: BoardType
) => ComponentType<{ id: string; title: string; url: string }> = (type) => {
  switch (type) {
    case 'GALLERY':
      return dynamic(() => import('@/components/board/GalleryBoard'));

    case 'DEFAULT': 
    default:
      return dynamic(() => import('@/components/board/DefaultBoard'));
  }
};

export default getComponent;
