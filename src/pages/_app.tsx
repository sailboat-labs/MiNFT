import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { MoralisProvider } from "react-moralis";

import "@/styles/globals.css";

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVERURL!}
    >
      <Toaster />

      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
