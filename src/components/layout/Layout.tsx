import * as React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div>
      {' '}
      <Navbar />
      <div className='pt-20'>{children}</div>
    </div>
  );
}
