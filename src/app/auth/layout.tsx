'use client';

import { styled } from 'styled-components';
import { orbit } from '@/utils/googleFonts';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import config from '@/app/config';

const StyledBg = styled.div`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
  * {
    box-sizing: border-box;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const layout = ({ children }: { children: React.ReactNode }) => {
  const isShowSpinner = useAtomValue(isShowSpinnerAtom);

  return (
    <StyledBg>
      <div className={`h-screen ${orbit.className} flex  flex-col w-screen`}>
        <h1 className={`text-5xl text-right pr-10 pt-10`}>
          {config.APP_ENG_NAME}
        </h1>

        {children}

        <footer className='w-full mt-auto flex justify-center items-center p-5'>
          <p className='text-sm'>
            made with <span className='text-red-600'>❤️</span> by milmil
            <br /> @milmil_company
          </p>
        </footer>
        {isShowSpinner ? <LoadingSpinner /> : null}
      </div>
    </StyledBg>
  );
};

export default layout;
