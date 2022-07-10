import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistStore } from "redux-persist";
import { ReactQueryDevtools } from "react-query/devtools";

import { store } from "@/redux/store";

const DynamicPersistGate: any = dynamic((): any =>
  import(
    /* webpackChunkName: 'PersistGate' */ "redux-persist/integration/react"
  ).then((mod) => mod.PersistGate)
);

const DynamicProvider: any = dynamic((): any =>
  import(/* webpackChunkName: 'PersistGate' */ "react-redux").then(
    (mod) => mod.Provider
  )
);

const DynamicToastContainer: any = dynamic((): any =>
  import(/* webpackChunkName: 'ToastContainer' */ "react-toastify").then(
    (mod) => mod.ToastContainer
  )
);

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <DynamicProvider store={store}>
        <DynamicPersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <DynamicToastContainer />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </DynamicPersistGate>
      </DynamicProvider>
    </>
  );
}

export default MyApp;
