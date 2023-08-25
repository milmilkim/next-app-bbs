'use client';

import { notoSansBlack } from '@/utils/googleFonts';
import { motion, AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import Anoko from '@/assets/images/character/anoko.png';

const Logo = memo(() => {
  const texts = ['Welcome', 'To', 'My'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeText = () => {
    setTimeout(() => {
      // loop
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // 500ms 지연 시간 설정 (0.5초)
  };

  return (
    <div
      style={{ fontFamily: 'UhBeeSe_hyun' }}
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
  );
});

const Intro = () => {
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

      <Logo />

      <div className='m-auto  absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 h-64'>
        <Image
          src={Anoko}
          alt='아노코와 친구들'
          fill={true}
          className='object-cover'
          placeholder='empty'
        />
      </div>
    </>
  );
};

export default Intro;
