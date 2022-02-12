import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import "./styles.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

import "tippy.js/dist/tippy.css"; // optional
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>{" "}
      </Hydrate>
    </QueryClientProvider>
  );
}
