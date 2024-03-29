import React from 'react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import '../styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  )

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <Toaster />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
