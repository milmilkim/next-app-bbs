'use client';

import { Post } from '@/types/board';
import {
  notoSansBlack,
  notoSansBold,
  notoSansRegular,
  notoSerifRegular,
} from '@/utils/googleFonts';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Heart from './Heart';
import ReviewButton from '@/components/common/ReviewButton';
import TopScroll from '@/components/common/TopScroll';
import { useEffect, useState } from 'react';
import config from '@/app/config';
import { getData } from '@/utils/firestore';
interface PostProps {
  post: Post;
  id: string;
  base64?: string;
}

const PostItem: React.FC<PostProps> = ({ post, id, base64 }) => {
  const params = useParams();
  const [count, setcount] = useState(post.heart || 0);
  const [isAdded, setIsAdded] = useState(false);

  const checkHeart = () => {
    const string = window.localStorage.getItem('heart') || '';
    if (!string) return;

    const ids = JSON.parse(string).ids as string[];

    if (ids.includes(id)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  };

  useEffect(() => {
    checkHeart();
  }, [id, count]);

  return (
    <motion.article
      className='max-w-3xl m-auto min-h-screen'
      initial={{
        opacity: 0,
        filter: 'blur(5px)',
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0)',
      }}>
      <div className='w-full max-w-sm  m-auto '>
        <div className='w-full border-b-4 border-solid border-black relative placeholder:h-full aspect-square relative'>
          {post.thumbnailUrl ? (
            <Image
              priority
              fill={true}
              className='object-cover'
              src={post.thumbnailUrl}
              alt={post.title + '관련 이미지'}
              placeholder='blur'
              blurDataURL={base64}
            />
          ) : (
            <div className='w-full h-full bg-primary'></div>
          )}
        </div>

        <article
          className={`w-full flex flex-col ${notoSansRegular.className}`}>
          <div className=' px-10 mt-20 h-auto text-right'>
            <h1 className=' text-sm font-bold'>{post.title}</h1>
            <h2 className=' text-sm mt-8'>{post.writer}</h2>
          </div>

          <StyledContent
            className='mt-24 px-10'
            dangerouslySetInnerHTML={{ __html: post.content }}></StyledContent>
        </article>
      </div>
    </motion.article>
  );
};

const StyledContent = styled.div`
  img {
    max-width: 100%;
  }

  strong {
    ${notoSansBold.style}
    font-weight: 700;
  }

  p {
    line-height: 1.75;
    margin-bottom: 16px;
    font-size: 14px;
    ${notoSansRegular.style}
  }

  em {
    font-style: italic;
  }

  .ql-font-sans {
    ${notoSansRegular.style}
    line-height: 1.75;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .ql-font-serif {
    ${notoSerifRegular.style}
    line-height: 1.75;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .ql-video {
    width: 100%;
    /* height: 56.25vw; */
    max-height: calc(800px / 16 * 9);
  }

  .ql-size-huge {
    font-size: xx-large;
  }

  .ql-size-large {
    font-size: x-large;
  }

  .ql-size-normal {
    font-size: inherit;
  }

  .ql-size-small {
    font-size: small;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }

  a {
    text-decoration: underline;
    transition: all 300ms ease;

    &:hover {
      filter: blur(0.5px);
    }
  }

  .ql-syntax {
    margin: 1rem;
    padding: 1.4rem;
    background-color: white;
    color: #000;
    border: 1px solid #fff;
    line-height: 1.3;
  }

  ol,
  ul {
    margin-left: 2rem;
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
  }

  ::selection {
    background-color: ${config.META_THEME_COLOR};
  }
`;

export default PostItem;
