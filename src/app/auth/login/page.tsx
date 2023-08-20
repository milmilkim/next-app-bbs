'use client';

import firebaseConfig from '../../../../firebase.config';
import { firebaseConfigKey } from '@/types/firebase';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEnvelope, FaKey, FaExclamationCircle, FaHome } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useSetAtom } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const WarnIcon: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p className='flex flex-row items-center text-red-800'>
      <FaExclamationCircle className='mx-1' /> {message}
    </p>
  );
};
const NoAdmin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  const checkNull = () => {
    const keys: firebaseConfigKey[] = [
      'apiKey',
      'appId',
      'authDomain',
      'databaseURL',
      'messagingSenderId',
      'projectId',
      'storageBucket',
    ];
    return keys.filter(
      (key) => !firebaseConfig[key as keyof typeof firebaseConfig]
    );
  };

  type Inputs = {
    email: string;
    password: string;
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsShowSpinner(true);
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/admin',
      });

      if (res?.error) throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');


      setIsShowSpinner(false);

    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('알 수 없는 에러!');
      }
    } finally {
      setIsShowSpinner(false);
    }
  };

  return (
    <div className='grid place-content-center'>
      <Link className='text-right fixed left-0 top-0 m-3 ' href='/'>
        <FaHome className='mr-1' />
        메인으로
      </Link>

      <div className='p-5 bg-white border rounded-md bg-opacity-80'>
        {checkNull().length ? (
          <>
            <div>
              firebase.config.js 파일을 확인하세요. 아래의 값들이 존재하지
              않습니다.
            </div>
            <ul className='list-disc ml-10'>
              {checkNull().map((key) => (
                <li>{key} ❌</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className='my-4'>로그인</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
              <div className='mb-4 flex items-center'>
                <FaEnvelope className='mx-3' />
                <input
                  placeholder='이메일'
                  type='이메일'
                  {...register('email', {
                    required: '이메일을 입력하세요',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: '이메일 형식에 맞지 않습니다.',
                    },
                  })}
                  className='rounded-lg p-2 w-full'
                />
              </div>
              <div className='mb-4 flex items-center'>
                <FaKey className='mx-3' />
                <input
                  className='rounded-lg p-2 w-full'
                  type='password'
                  placeholder='비밀번호'
                  {...register('password', {
                    required: '비밀번호를 입력하세요',
                  })}
                />
              </div>
              {errors.email?.message && (
                <WarnIcon message={errors.email.message} />
              )}
              {errors.password?.message && (
                <WarnIcon message={errors.password.message} />
              )}
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-800 ease-in duration-100 my-5'>
                로그인
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NoAdmin;
