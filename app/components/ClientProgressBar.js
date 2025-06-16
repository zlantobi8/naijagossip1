// app/components/ProgressBar.jsx
'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
export default function ProgressBar1() {
  return (
    <ProgressBar
      height="4px"
      color="#fffd00"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
