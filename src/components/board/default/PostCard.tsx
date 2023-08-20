'use client';

import { notoSansBlack } from '@/utils/googleFonts';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  id: string;
  category: string;
  link: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  return (
    <Link href={props.link} className='w-full'>
      <motion.div
        className='border border-solid p-5 w-auto flex flex-row line-clamp-1 bg-white hover:bg-black hover:text-white ease-in duration-200'
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        initial={{
          filter: 'blur(5px)',
        }}
        animate={{
          filter: 'blur(0)',
        }}>
        <span
          className={`mr-3 ${notoSansBlack.className} line-clamp-1 text-xs`}>
          {props.category}
        </span>
        <span className='line-clamp-1'>{props.title}</span>
      </motion.div>
    </Link>
  );
};

export default PostCard;
