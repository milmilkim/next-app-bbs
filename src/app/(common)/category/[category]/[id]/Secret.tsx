'use client';

import { useRouter } from 'next/navigation';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useSetAtom } from 'jotai';
import PrevButton from '@/components/common/PrevButton';
import { notoSansBold, notoSansRegular } from '@/utils/googleFonts';
import { useCallback } from 'react';

interface Props {
  url: string;
}
const Form: React.FC<Props> = ({ url }) => {
  const router = useRouter();
  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  const checkPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = e.currentTarget.sPassword;
    try {
      setIsShowSpinner(true);
      const res = await fetch('/api/post/password', {
        method: 'POST',
        body: JSON.stringify({
          password: password.value,
        }),
      });

      if (!res.ok) {
        throw new Error((await res.json()).msg);
      }

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        alert(err.message);
      } else {
        alert('알 수 없는 에러!');
      }
    } finally {
      setIsShowSpinner(false);
    }
  };

  const goUrl = useCallback(() => {
    window.open(url);
  }, [url]);
  return (
    <div
      className={`max-w-sm m-auto ${notoSansBold.className} px-8 text-base min-h-screen`}>
      <div className='mt-24 mb-24 w-full flex flex-col items-center'>
        <div>
          <PrevButton />
        </div>

        <div className='w-60 h-16 mt-16 text-sm  bg-primary flex items-center justify-center text-center rounded-full shadow-lg shadow-gray-300'>
          성인글입니다.
        </div>

        <div className='bg-white text-sm w-full h-56  mt-7 rounded-3xl shadow-lg shadow-gray-300 relative'>
          <p className='mt-14 w-full text-center'>
            다음 링크를 확인하여
            <br /> 비밀번호를 입력해 주세요.
          </p>

          <p className='mt-6 cursor-pointer text-sm w-full text-center' onClick={goUrl}>
            {url}
          </p>

          <div
            className='w-3/4 flex items-center text-sm justify-center absolute left-1/2 -translate-x-1/2 -bottom-8  h-16 rounded-full'
            style={{
              backgroundColor: '#FFF1A9',
            }}>
            <form
              onSubmit={checkPassword}
              className='flex flox-col mx-3 w-full flex-wrap relative'>
              <input
                type='password'
                name='sPassword'
                placeholder='비밀번호'
                className='w-full placeholder:text-sm bg-transparent focus:outline-none focus:border-none  caret-primary focus:ring-primary'
              />
              <button
                className='absolute cursor-pointer text-sm -bottom-10 w-24 h-10 left-1/2 -translate-x-1/2 bg-primary rounded-full shadow-lg showdow-gray-300 '
                type='submit'>
                감상하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
