'use client';

import { notoSansBlack, notoSansBold } from '@/utils/googleFonts';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import config from '@/app/config';
import AntReg from '@/lib/AntReg';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { signOut } from 'next-auth/react';

const menus = [
  { key: 'admin', url: '/admin', label: '기본 설정' },
  { key: 'post', url: '/admin/board/post', label: '게시글 관리' },
  { key: 'category', url: '/admin/board/category', label: '카테고리 관리' },
  { key: 'secret', url: '/admin/password', label: '비밀번호 설정' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isShowSpinner = useAtomValue(isShowSpinnerAtom);

  const logout = useCallback((e : React.MouseEvent) => {
    e.preventDefault();
    signOut();
  }, [])

  return (
    <AntReg>
      {isShowSpinner ? <LoadingSpinner /> : null}

      <div className='m-5'>
        <h1 className={`${notoSansBlack.className}`}>
          <Link href='/'>
            <FaHome className='mr-2' />
            {config.APP_KOR_NAME}
          </Link>
        </h1>
        <nav
          className={`whitespace-nowrap overflow-scroll my-7 ${notoSansBold.className}`}>
          {menus.map((menu) => (
            <Link
              prefetch
              key={menu.key}
              href={menu.url}
              className={`inline-block mr-2 p-1 ${
                pathname === menu.url ? 'underline' : null
              }`}>
              {menu.label}
            </Link>
          ))}
          <a onClick={logout} href='#'>로그아웃</a>
        </nav>
        {children}
      </div>
    </AntReg>
  );
}
