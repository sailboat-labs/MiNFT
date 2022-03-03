import { MetaMaskProvider } from 'metamask-react';
import { AppProps } from 'next/app';
import  { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import { useEffect } from 'react';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {

  
  
  return (
    <MetaMaskProvider>
    <Toaster/>
      <Component {...pageProps} />
    </MetaMaskProvider>
  );
}

export default MyApp;
