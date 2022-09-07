import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from 'next-auth/react'
 
import Head from 'next/head'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { QueryClientProvider } from 'react-query'
import { FC } from 'react'
import dynamic from 'next/dynamic'

import queryClient from '@config/queryClient'
import { WithPageLayout } from '@components/Layout'
import theme from 'theme'
import NextAuth from 'next-auth'

type NextPageWithLayout = NextPage & WithPageLayout
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = ({ Component, pageProps: {session,  ...pageProps} }) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <SessionProvider session={session}>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>{process.env.appName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ChakraProvider>
    </SessionProvider>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
