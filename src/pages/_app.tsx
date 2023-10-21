import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import BaseTheme from 'theme/base';
import '../styles/globals.css';
import { APP_NAME } from 'constants/common';

function MyApp({ Component, pageProps, session }: AppProps & { session: Session }) {
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
      <SessionProvider session={session}>
        <ChakraProvider theme={BaseTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
