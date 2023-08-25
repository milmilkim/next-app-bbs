'use client';

import { motion } from 'framer-motion';
import { useCallback } from 'react';



const Button = () => {
  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className='cursor-pointer' onClick={scrollToTop}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        Top
      </motion.div>
    </div>
  );
}

export default Button;