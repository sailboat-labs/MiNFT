/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { configureStore } from "@reduxjs/toolkit";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import rootReducer from "redux/reducers";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "@/styles/colors.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  const store = configureStore({
    reducer: rootReducer,
  });

  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVERURL!}
    >
      <Toaster />
      <ToastContainer />

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MoralisProvider>
  );
}

export default MyApp;
