/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { configureStore } from "@reduxjs/toolkit";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import rootReducer from "redux/reducers";

import "../styles/globals.css";

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <Toaster />

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
