import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import "./styles.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

import "tippy.js/dist/tippy.css"; // optional
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
            <title>MovieMash</title>
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>{" "}
      </Hydrate>
    </QueryClientProvider>
  );
}
