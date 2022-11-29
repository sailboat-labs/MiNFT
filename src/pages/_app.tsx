/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { configureStore } from "@reduxjs/toolkit";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import NextProgress from "next-progress";
import { ReactElement, ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import rootReducer from "redux/reducers";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "@/styles/colors.css";

import * as ga from "../lib/ga";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  const store = configureStore({
    reducer: rootReducer,
  });

  // useEffect(() => {
  //   const unloadCallback = (event: any) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  const router = useRouter();

  useEffect;

  useEffect(() => {
    const handleRouteChange = (path: any) => {
      ga.pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script async id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          page_path: window.location.pathname`}
      </Script>

      {/* <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          page_path: window.location.pathname
          `,
        }}
      /> */}
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVERURL!}
      >
        <Toaster />
        <ToastContainer />
        <NextProgress delay={0} options={{ showSpinner: true }} />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
