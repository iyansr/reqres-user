import React from 'react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = React.useMemo(() => new QueryClient(), [])

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
