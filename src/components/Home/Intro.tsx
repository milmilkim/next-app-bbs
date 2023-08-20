'use client';

import { notoSansBlack } from '@/utils/googleFonts';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import Chiikawa from '@/assets/images/character/chiikawa.png';
import Hachiware from '@/assets/images/character/hachiware.png';
import Usagi from '@/assets/images/character/Usagi.png';

const MainLogo = () => {
  const texts = ['Welcome', 'To', 'My'];
  const characters = [Hachiware, Chiikawa, Usagi];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeText = () => {
    setTimeout(() => {
      // loop
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // 500ms 지연 시간 설정 (0.5초)
  };

  // 오늘 기준 연도를 반환
  const getYear = () => {
    return new Date().getFullYear().toString();
  };

  return (
    <>
      <div className='w-screen h-screen -z-10 fixed'>
        <video
          onLoad={() => console.log('loaded...!')}
          className='w-screen h-screen fixed object-cover blur-md'
          autoPlay
          loop
          muted>
          <source src='/back_ani.webm' type='video/webm' />
        </video>
      </div>
      <div
        style={{fontFamily: 'UhBeeSe_hyun'}}
        className={` mt-28 text-center text-4xl leading-normal w-full flex justify-center`}>
        <h1>
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={changeText}>
            {texts[currentIndex]}
          </motion.span>
          <br />
          World <br />
        </h1>
      </div>

      <div className='m-auto  absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 grid grid-cols-3 gap-4 w-52'>
        {characters.map((char, index) => (
          <div className='flex flex-shrink-0' key={index}>
            <img
              src={char.src}
              className=' w-full h-auto'
              alt='캐릭터 이미지'
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MainLogo;
