'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Thumbnail from './Thumbnail';
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
        whileTap={{
          scale: 0.8
        }}
        whileHover={{
          scale: 1.05
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
