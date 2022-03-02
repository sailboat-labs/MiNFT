import * as React from 'react';

import Footer from './footer';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='pt-[3.2rem] min-h-screen'>{children}</div>
      <Footer className='bottom-0 w-full' />
    </div>
  );
}
