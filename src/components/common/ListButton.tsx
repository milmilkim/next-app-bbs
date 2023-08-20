'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ({
  color,
  category,
}: {
  color?: string;
  category?: string;
}) {
  const router = useRouter();

  const goCategory = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/category/' + (category || ''));
  }, []);

  useEffect(() => {
    router.prefetch('/category/' + (category || '') );
  }, [category]);

  return (
    <div className='w-full flex'>
      <motion.div
	  	style={{width: '67px'}}
        className='cursor-pointer ml-auto'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={goCategory}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='67.011'
          height='67.075'
          viewBox='0 0 67.011 67.075'>
          <defs>
            <filter
              id='패스_42'
              x='0'
              y='0'
              width='67.011'
              height='67.075'
              filterUnits='userSpaceOnUse'>
              <feOffset dx='4' dy='4' />
              <feGaussianBlur stdDeviation='2' result='blur' />
              <feFlood floodOpacity='0.161' />
              <feComposite operator='in' in2='blur' />
              <feComposite in='SourceGraphic' />
            </filter>
          </defs>
          <g
            id='카테고리_아이콘'
            data-name='카테고리 아이콘'
            transform='translate(-285.532 -34.735)'>
            <g
              transform='matrix(1, 0, 0, 1, 285.53, 34.74)'
              filter='url(#패스_42)'>
              <path
                id='패스_42-2'
                data-name='패스 42'
                d='M633.769,104.043c.166,3.5-.889,6.839-2,10.055q-.291.678-.616,1.334-.437.844-.937,1.648-.406.654-.851,1.279C624.793,126,616,129.342,607.74,129.694s-14.24-6.68-19.514-12.482c-7.56-8.263-4.571-21.272,2.285-29.359,2.813-3.516,6.856-5.45,11.091-6.971q.917-.3,1.861-.537a24.564,24.564,0,0,1,29.173,16.063q.3.914.536,1.855c.059,1.192.763,2.424.566,3.8Q633.8,103.031,633.769,104.043Z'
                transform='translate(-579.27 -75.13)'
                fill={color || '#ffd400'}
                stroke='#000'
                strokeWidth='5'
              />
            </g>
            <g
              id='그룹_56'
              data-name='그룹 56'
              transform='translate(1.373 -1.763)'>
              <path
                id='패스_67'
                data-name='패스 67'
                d='M303.633,57.316c9.387.137,20.083,0,20.083,0'
                transform='translate(0 -1.506)'
                fill='none'
                stroke='#000'
                strokeLinecap='round'
                strokeWidth='5'
              />
              <path
                id='패스_68'
                data-name='패스 68'
                d='M303.633,67.186s6.036,1.287,9.194,0,10.888,0,10.888,0'
                transform='translate(0 -1.803)'
                fill='none'
                stroke='#000'
                strokeLinecap='round'
                strokeWidth='5'
              />
              <path
                id='패스_69'
                data-name='패스 69'
                d='M303.633,75.9s10.559-3.374,12.946-2.2a41.921,41.921,0,0,0,7.136,2.2'
                transform='translate(0 0.357)'
                fill='none'
                stroke='#000'
                strokeLinecap='round'
                strokeWidth='5'
              />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
