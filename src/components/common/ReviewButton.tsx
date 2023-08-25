'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Button = ({ color }: { color?: string }) => {
  const router = useRouter();

  const goReview = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/review');
  }, [router]);

  useEffect(() => {
    router.prefetch('/review');
  }, [router]);

  return (
    <motion.div
      className='cursor-pointer'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={goReview}>
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
          id='리뷰_아이콘'
          data-name='리뷰 아이콘'
          transform='translate(-35.985 -176.518)'>
          <g
            transform='matrix(1, 0, 0, 1, 35.98, 176.52)'
            filter='url(#패스_40)'>
            <path
              id='패스_40-2'
              data-name='패스 40'
              d='M130.77,104.043c.166,3.5-.889,6.839-2,10.055q-.291.678-.616,1.334-.437.844-.937,1.648-.406.654-.851,1.279C121.793,126,113,129.342,104.741,129.694s-14.24-6.68-19.514-12.482c-7.56-8.263-4.571-21.272,2.285-29.359,2.813-3.516,6.856-5.45,11.091-6.971q.917-.3,1.861-.537a24.564,24.564,0,0,1,29.173,16.063q.3.914.536,1.855c.059,1.192.762,2.424.566,3.8Q130.8,103.031,130.77,104.043Z'
              transform='translate(-76.27 -75.13)'
              fill={color || '#ffd400'}
              stroke='#000'
              strokeLinecap='round'
              strokeWidth='5'
            />
          </g>
          <g
            id='그룹_47'
            data-name='그룹 47'
            transform='translate(-1038.054 248.951)'>
            <path
              id='패스_62'
              data-name='패스 62'
              d='M984.309-54.932s20.308-9.041,23.467-4.41,0,22.53,0,22.53-22.552,4.41-23.467,0S984.309-54.932,984.309-54.932Z'
              transform='translate(106.151 4.229)'
              fill='#fff'
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='5'
            />
            <path
              id='패스_63'
              data-name='패스 63'
              d='M1112.839-54.557c-11.189,20.055-14.2,17.788-14.2,17.788l-8.072-12.646'
              fill='#fff'
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='5'
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}


export default Button;