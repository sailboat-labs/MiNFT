import * as React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='flex flex-col'>
      
      <Navbar />
      <div className='pt-[3.2rem]'>{children}</div>
    </div>
  );
}
