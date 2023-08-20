'use client';

import GalleryItem from '@/components/board/gallery/GalleryItem';
import { Post } from '@/types/board';
import styled from 'styled-components';


interface GalleryListProps {
  dataList: Required<Post>[];
  category: string
}

const GalleryList: React.FC<GalleryListProps> = ({
  dataList,
  category
}) => {




  return (
      <ListContainer className='m-auto grid grid-cols-2 gap-4'>
        {dataList.map((item, i) => (
          <GalleryItem
            id={item.id}
            key={item.id}
            imgUrl={item.thumbnailUrl}
            title={item.title}
            isSecret={item.isSecret}
            isEven={((i + 1) % 2 === 0)}
            writer={item.writer}
            link={`/category/${category}/${item.id}`}
          />
        ))}
      </ListContainer>
  );
};

const ListContainer = styled.div`
  margin: 0 25px;
`
export default GalleryList;
