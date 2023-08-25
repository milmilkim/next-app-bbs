'use client';

import ListButton from '@/components/common/ListButton';
import PrevButton from '@/components/common/PrevButton';
import { notoSansBold, notoSansRegular } from '@/utils/googleFonts';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import Finished from './Finished';
import { writeData } from '@/utils/firestore';
import { Timestamp } from 'firebase/firestore';
import { Review } from '@/types/review';
import { useSetAtom } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';

interface LabelProps {
  name: string;
  id: string;
  label: string;
}

const formList = [
  {
    label: '나의 닉네임',
    name: 'nickname',
    id: 'nickname',
  },
  {
    label: '이메일',
    name: 'email',
    id: 'email',
  },
];

const Label: React.FC<LabelProps> = ({ name, id, label }) => {
  return (
    <div
      className='w-full mb-3 bg-white flex flex-row items-center justify-start text-center rounded-full shadow-lg shadow-gray-300'
      style={{ height: '51px' }}>
      <label
        htmlFor={id}
        style={{ width: '40%' }}
        className='font-bold h-full bg-primary text-center rounded-full shadow-lg text-xs items-center flex justify-center focus:outline-none'>
        {label}
      </label>
      <input
        type='text'
        style={{ width: '60%' }}
        name={name}
        id={id}
        required
        className='text-center text-xs focus:outline-none focus:border-primary caret-primary   '
      />
    </div>
  );
};

const ReviewPage = () => {
  const [isShowForm, setIsShowForm] = useState(true);
  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const {
        formTitle,
        email,
        nickname,
        reviewPassword: password,
        content,
      } = e.currentTarget;

      try {
        setIsShowSpinner(true);
        await writeData('reviews', {
          content: content.value as string,
          email: email.value as string,
          title: formTitle.value as string,
          nickname: nickname.value as string,
          password: password.value as string,
          createdAt: Timestamp.fromDate(new Date()),
        });
        setIsShowForm(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsShowSpinner(false);
      }
    },
    [setIsShowSpinner]
  );

  return (
    <div className={`w-full ${notoSansRegular.className} `}>
      <div className='relative w-full max-w-sm m-auto '>
        {/* inner */}
        <motion.div
          className='relative'
          initial={{ filter: 'blur(5px)', opacity: 0 }}
          animate={{ filter: 'blur(0)', opacity: 1 }}
          transition={{ duration: 0.3 }}>
          {isShowForm ? (
            <form
              style={{ marginTop: '90px' }}
              onSubmit={handleSubmit}
              className={`max-w-sm m-auto ${notoSansBold.className} px-10  text-base min-h-screen`}>
              <div className='mt-24 mb-24 w-full flex flex-col items-center'>
                <div className='w-full flex-row flex justify-between items-center'>
                  <PrevButton />
                  <ListButton color='#fff' />
                </div>

                {formList.map((item) => (
                  <Label
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    name={item.id}
                  />
                ))}

                <div className='w-full h-52 mt-5 bg-white flex items-center justify-start text-center rounded-2xl shadow-lg shadow-gray-300'>
                  <textarea
                    name='content'
                    required
                    className={` ${notoSansRegular.className} w-full caret-primary h-3/4 outline-none resize-none border-none px-2`}></textarea>
                </div>

                <div
                  className='mt-5 h-10 flex justify-between flex-row gap-2'
                  style={{ width: '100%' }}>
                  <button
                    className='bg-white cursor-pointer w-auto rounded-2xl text-xs shadow-lg shadow-gray-300 text-center whitespace-nowrap'
                    style={{ flexGrow: 1 }}>
                    메세지 보내기
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <Finished setIsShowForm={setIsShowForm} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewPage;
