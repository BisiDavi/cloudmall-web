import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

import { store } from "@/redux/store";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ToastContainer />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
