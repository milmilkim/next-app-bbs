'use client';

import { notoSansBold } from '@/utils/googleFonts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Thumbnail from './Thumbnail';
import styled from 'styled-components';
import Bang from '@/assets/images/bang.png';
import Image from 'next/image';
interface GalleryItemProps {
  imgUrl: string;
  title: string;
  id: string;
  link: string;
  writer: string;
  isEven: boolean;
  isSecret: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = (props) => {
  return (
    <Link href={props.link} className='select-none'>
      <motion.div
        initial={{
          filter: 'blur(5px)',
        }}
        animate={{
          filter: 'blur(0)',
        }}>
        <div className='w-full h-full bg-white shadow-xl shadow-gray-700 rounded-ss-xl rounded-ee-xl overflow-hidden relative aspect-square'>
          {props.imgUrl ? (
            <Thumbnail imgUrl={props.imgUrl} title={props.title} />
          ) : (
            <div className='w-full h-full bg-slate-100'></div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default GalleryItem;
