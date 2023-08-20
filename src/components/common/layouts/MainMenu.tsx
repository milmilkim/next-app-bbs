'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { notoSansBlack } from '@/utils/googleFonts';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTools, FaUnlockAlt, FaKey } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useAtomValue } from 'jotai';
import { categoryAtom } from '@/atoms/categoryAtom';

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const category = useAtomValue(categoryAtom);

  const logout = () => {
    signOut();
  };

  const toggleMenu = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`${notoSansBlack.className} fixed top-12 z-40 right-5 p-1 cursor-pointer lg:right-24 bg-black text-slate-100 text-xs rounded-full w-6 h-6`}>
        M
      </button>
      <AnimatePresence>
        {isOpen ? (
          <div
            className='fixed w-full h-full top-0 left-0 z-50  bg-black bg-opacity-70'
            onClick={toggleMenu}>
            <motion.div
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              layout
              initial={{ x: '100%' }}
              animate={{ x: isOpen ? 0 : '100%' }}
              exit={{ x: '100%' }}
              className=' bg-white fixed top-0 right-0 w-60 h-full z-50 text-black flex flex-col'>
              <div className='ml-auto mt-1 mr-1'>
                {session?.user ? (
                  <ul className='flex'>
                    <li className='mr-2 cursor-pointer'>
                      <FaUnlockAlt onClick={() => logout()} />
                    </li>
                    {session?.user.role === 'admin' ? (
                      <li>
                        <Link href='/admin'>
                          <FaTools />
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                ) : <Link href="/auth/login"><FaKey /></Link>}
              </div>

              <div className='mx-5 mt-16'>
                <span className={`font-UhBee text-2xl`}>
                  MENU
                </span>
                <ul className='mt-5'>
                  {category.map((menu) => (
                    <motion.li
                      key={menu.id}
                      className=' mt-4'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={`/category/${menu.url}`}>
                        {menu.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default MainMenu;
