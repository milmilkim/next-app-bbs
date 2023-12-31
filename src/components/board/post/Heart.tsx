'use client';

import { updateData } from '@/utils/firestore';
import { increment } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { SetStateAction } from 'jotai';

interface Props {
  count: number;
  isAdded: boolean;
  setCount: React.Dispatch<SetStateAction<number>>;
  id: string;
}
const Heart = ({ count, isAdded, setCount, id }: Props) => {
  const clickHeart = () => {
    if (!isAdded) {
      setCount((count) => count + 1);

      const string = window.localStorage.getItem('heart') || '';
      let ids = [];
      if (string) {
        ids = JSON.parse(string)?.ids;
      }

      ids.push(id);

      const obj = {
        ids,
      };

      window.localStorage.setItem('heart', JSON.stringify(obj));

      updateData('posts', id, {
        heart: increment(1),
      });
    }
  };
  return (
    <motion.div
      onClick={clickHeart}
      className='cursor-pointer select-none'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='177.721'
        height='156.875'
        viewBox='0 0 177.721 156.875'>
        <defs>
          <filter
            id='패스_70'
            x='55.342'
            y='89.8'
            width='67.011'
            height='67.075'
            filterUnits='userSpaceOnUse'>
            <feOffset dx='4' dy='4' />
            <feGaussianBlur stdDeviation='2' result='blur' />
            <feFlood floodOpacity='0.161' />
            <feComposite operator='in' in2='blur' />
            <feComposite in='SourceGraphic' />
          </filter>
          <filter
            id='패스_73'
            x='0'
            y='0'
            width='177.721'
            height='76.33'
            filterUnits='userSpaceOnUse'>
            <feOffset dx='4' dy='4' />
            <feGaussianBlur stdDeviation='2' result='blur-2' />
            <feFlood floodOpacity='0.161' />
            <feComposite operator='in' in2='blur-2' />
            <feComposite in='SourceGraphic' />
          </filter>
        </defs>
        <g
          id='구성_요소_4_2'
          data-name='구성 요소 4 – 2'
          transform='translate(4.497 4.5)'>
          <g transform='matrix(1, 0, 0, 1, -4.5, -4.5)' filter='url(#패스_70)'>
            <path
              id='패스_70-2'
              data-name='패스 70'
              d='M130.77,104.043c.166,3.5-.889,6.839-2,10.055q-.291.678-.616,1.334-.437.844-.937,1.648-.406.654-.851,1.279C121.793,126,113,129.342,104.741,129.694s-14.24-6.68-19.514-12.482c-7.56-8.263-4.571-21.272,2.285-29.359,2.813-3.516,6.856-5.45,11.091-6.971q.917-.3,1.861-.537a24.564,24.564,0,0,1,29.173,16.063q.3.914.536,1.855c.059,1.192.762,2.424.566,3.8Q130.8,103.031,130.77,104.043Z'
              transform='translate(-20.93 14.67)'
              fill='#fff'
              stroke='#000'
              strokeLinecap='round'
              strokeWidth='5'
            />
          </g>
          <path
            id='패스_71'
            data-name='패스 71'
            d='M187.5,1504.16c2.838-.857,17.451-10.842,9.138-20.57s-9.138,3.428-9.138,3.428-8-5.442-12.889-3.428-3.085,11.442,2.314,15.427A31.346,31.346,0,0,0,187.5,1504.16Z'
            transform='translate(-105.102 -1377.245)'
            fill={isAdded ? 'red' : '#f87777'}
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='5'
          />
          <g
            id='그룹_58'
            data-name='그룹 58'
            transform='translate(-107.139 -1484)'>
            <g
              transform='matrix(1, 0, 0, 1, 102.64, 1479.5)'
              filter='url(#패스_73)'>
              <path
                id='패스_73-2'
                data-name='패스 73'
                d='M163.2,19.46a15.217,15.217,0,0,1-5.569,12.7c-5.611,4.753-14.759,6.8-23.569,7.381-6.865.455-13.766.167-20.648.276-2.052.033-4.7-.311-6.452.539a10.221,10.221,0,0,0-3.7,3.646A75.224,75.224,0,0,1,85.309,61.327a2.317,2.317,0,0,1-1.03.474A1.837,1.837,0,0,1,82.4,60.237q-1.062-4.044-1.717-8.132c-.343-2.144-.677-4.429-2.611-6.118-2.037-1.779-5.42-2.5-8.646-2.889-8.162-.973-16.515-.369-24.8-.267S27.719,42.463,20.537,39.6A32.689,32.689,0,0,1,5.481,27.233C3.689,24.572,2.25,21.69,2.537,18.759c.582-5.931,8.126-10.984,15.548-13.292,8.509-2.647,18.2-2.99,27.385-2.967,3.861.01,7.72.107,11.579.179l1.848.034c11.465.2,22.935.162,34.4.122,8.443-.029,16.909-.178,25.349-.07,8.652.11,17.4-.56,26.008.247A28.476,28.476,0,0,1,154.8,5.483a14.973,14.973,0,0,1,7,7.918A18.4,18.4,0,0,1,163.2,19.46Z'
                transform='translate(2 2)'
                fill='#f87777'
                stroke='#000'
                strokeWidth='5'
              />
            </g>
          </g>
          <text
            id='_376_'
            data-name='376!'
            transform='translate(65.658 24.657)'
            fill='#231815'
            fontSize='15'
            fontFamily='roc-grotesk-wide, Roc Grotesk'
            fontWeight='800'
            letterSpacing='-0.005em'>
            <tspan x='0' y='0'>
              {count || 0}!
            </tspan>
          </text>
        </g>
      </svg>
    </motion.div>
  );
};

export default Heart;
