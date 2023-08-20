'use client'

import { ThreeDots } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div>
      <div style={{zIndex: '1001'}} className='fixed left-0 top-0 z-50 bg-black bg-opacity-25 w-full h-full'>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <ThreeDots color='#FFD400' height={100} width={100} />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
