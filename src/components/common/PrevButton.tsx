'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ({ color }: { color?: string }) {
  const router = useRouter();

  const goBack = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  }, []);


  return (
    <motion.div
      className='cursor-pointer'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={goBack}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='67.011'
        height='67.075'
        viewBox='0 0 67.011 67.075'>
        <defs>
          <filter
            id='패스_40'
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
          id='이전_화면_아이콘'
          data-name='이전 화면 아이콘'
          transform='translate(-35.486 -34.735)'>
          <g
            transform='matrix(1, 0, 0, 1, 35.49, 34.74)'
            filter='url(#패스_40)'>
            <path
              id='패스_40-2'
              data-name='패스 40'
              d='M130.77,104.043c.166,3.5-.889,6.839-2,10.055q-.291.678-.616,1.334-.437.844-.937,1.648-.406.654-.851,1.279C121.793,126,113,129.342,104.741,129.694s-14.24-6.68-19.514-12.482c-7.56-8.263-4.571-21.272,2.285-29.359,2.813-3.516,6.856-5.45,11.091-6.971q.917-.3,1.861-.537a24.564,24.564,0,0,1,29.173,16.063q.3.914.536,1.855c.059,1.192.762,2.424.566,3.8Q130.8,103.031,130.77,104.043Z'
              transform='translate(-76.27 -75.13)'
              fill='#ffd400'
              stroke='#000'
              strokeWidth='5'
            />
          </g>
          <path
            id='패스_44'
            data-name='패스 44'
            d='M130.919,116.293c-8.763-.408-18.283,1.083-27.243.089,3.92-4.971,10.08-8.451,15.211-12.434'
            transform='translate(-52.297 -51.542)'
            fill='none'
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='5'
          />
          <path
            id='패스_46'
            data-name='패스 46'
            d='M115.367,139.885c-4-2.447-5.489-6.424-8.256-9.883'
            transform='translate(-52.989 -63.66)'
            fill='none'
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='5'
          />
        </g>
      </svg>
    </motion.div>
  );
}
