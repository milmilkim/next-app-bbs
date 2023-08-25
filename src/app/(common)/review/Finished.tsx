'use client';

import { notoSansBold, notoSansRegular } from '@/utils/googleFonts';
import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { SetStateAction } from 'jotai';

const Finished = ({
  setIsShowForm,
}: {
  setIsShowForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/category');
  }, [router]);

  const goCategory = useCallback(() => {
    router.push('/category');
  }, [router]);

  return (
    <StyledBackground
      className={`w-full flex flex-col relative min-h-screen ${notoSansRegular.className}`}>
      <div
        className={`flex text-xs flex-col  justify-center items-center mt-44 ${notoSansBold.className}`}>
        <button
          onClick={() => setIsShowForm(true)}
          className=' bg-primary pointer-cursor w-56 h-16 rounded-full shadow-2xl shadow-gray-400 '>
          다른 작품 리뷰 더 보내기!
        </button>
        <button
          onClick={goCategory}
          className=' pointer-cursor mt-5 mb-64 bg-primary w-56 h-16 rounded-full shadow-gray-400 shadow-2xl'>
          작품 목록으로 가기!
        </button>
      </div>

      <div
        className='w-full absolute bottom-0 flex justify-center'
        style={{ borderTop: '5px solid #000', backgroundColor: '#ff0' }}></div>
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  position: relative;
  min-height: 100vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: top;
    background-size: 100%;
    filter: blur(15px);
    opacity: 0.9;
    z-index: -1;
  }
`;

export default Finished;
