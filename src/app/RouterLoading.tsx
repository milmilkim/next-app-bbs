'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';



export default function () {
  return (
    <ProgressBar
      height='5px'
      color='#000'
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
}
