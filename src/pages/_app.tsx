import { MetaMaskProvider } from "metamask-react";
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
      appId="DSTBtQhn4m4DPtvN6vgMiuWHKtCjgrGNTTn0gmBU"
      serverUrl="https://wl7nngidaae7.usemoralis.com:2053/server"
    >
        <Toaster />
        <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
