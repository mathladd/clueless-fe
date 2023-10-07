import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import BaseTheme from 'theme/base';
import '../styles/globals.css';
import { APP_NAME } from 'constants/common';

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title key="title">{APP_NAME}</title>
        <meta name="title" content={APP_NAME} />
        <meta
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
          name="viewport"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={BaseTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
