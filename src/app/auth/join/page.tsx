'use client';

import { FirebaseError } from 'firebase/app';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FaEnvelope,
  FaKey,
  FaExclamationCircle,
  FaCheck,
  FaGrinStars,
} from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useSetAtom } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WarnIcon: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p className='flex flex-row items-center text-red-800'>
      <FaExclamationCircle className='mx-1' /> {message}
    </p>
  );
};
const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const key = searchParams.get('key');

  useEffect(() => {
    if (!key) {
      router.push('/');
    }
  }, []);

  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  type Inputs = {
    email: string;
    password: string;
    comparePassword: string;
    secret: string;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsShowSpinner(true);

      // 어드민 추가
      const res = await fetch('/api/auth/admin', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          secret: data.secret,
        }),
      });

      if (!res.ok) {
        throw new Error((await res.json()).msg);
      }

      // 로그인
      await signIn('credentials', {
        email: data.email,
        password: data.password,
      });

      console.log('로그인 완료------------');
      // router.push('/admin');
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err.code);
        console.error(err.message);
        alert(err.message);
      } else if (err instanceof Error) {
        console.error(err);
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
      <div className='p-5 bg-white border rounded-md bg-opacity-80 w-full md:w-96'>
        <p className='my-4'>관리자 계정 등록</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <div className='mb-4 flex items-center'>
            <FaEnvelope className='mx-3' />
            <input
              placeholder='이메일'
              type='email'
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
          <div className='mb-4 flex items-center'>
            <FaCheck className='mx-3' />
            <input
              className='rounded-lg p-2 w-full'
              type='password'
              placeholder='비밀번호'
              {...register('comparePassword', {
                required: '비밀번호 확인을 입력하세요',
                validate: (value) =>
                  value === getValues('password') ||
                  '비밀번호 확인이 일치하지 않습니다',
              })}
            />
          </div>
          <div className='mb-4 flex items-center'>
            <FaGrinStars className='mx-3' />
            <input
              className='rounded-lg p-2 w-full'
              type='password'
              defaultValue={key || ''}
              placeholder='시크릿 키'
              {...register('secret', {
                required: '시크릿 키를 입력하세요',
              })}
            />
          </div>
          {errors.email?.message && <WarnIcon message={errors.email.message} />}
          {errors.password?.message && (
            <WarnIcon message={errors.password.message} />
          )}
          {errors.comparePassword?.message && (
            <WarnIcon message={errors.comparePassword.message} />
          )}
          {errors.secret?.message && (
            <WarnIcon message={errors.secret.message} />
          )}
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-800 ease-in duration-100 my-5'>
            계정 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
