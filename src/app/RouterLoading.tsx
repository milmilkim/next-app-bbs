'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const RouterLoading = () => {
  return (
    <ProgressBar
      height='5px'
      color='#000'
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
};

RouterLoading.displayName = 'RouterLoading';

export default RouterLoading;
