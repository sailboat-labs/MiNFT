import * as React from 'react';

import Footer from './footer';
import Navbar from './Navbar';
import { useMetaMask } from 'metamask-react';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { formatEthAddress } from 'eth-address';



export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();


  useEffect(()=>{
   status == 'connecting' && toast('Connecting metamask')
   status == 'connected' && toast.success(`Connected on ${account && formatEthAddress(account)}`)
   status == 'unavailable' && toast.success('Metamask not available')
  },[status])


  

  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='pt-[3.2rem] min-h-screen'>{children}</div>
      <Footer className='bottom-0 w-full' />
    </div>
  );
}
