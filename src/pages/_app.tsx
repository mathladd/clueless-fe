import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';
import useWebsocket from 'react-use-websocket';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import BaseTheme from 'theme/base';
import '../styles/globals.css';
import { APP_NAME } from 'constants/common';
import { WS } from 'types/common';

function MyApp({ Component, pageProps, session }: AppProps & { session: Session }) {
  const wsObj = useWebsocket('ws://localhost:8765');
  const ws: WS = {
    sendJsonMessage: wsObj.sendJsonMessage,
    lastMessage: wsObj.lastMessage as unknown as { data: any; responseFor: string },
    readyState: wsObj.readyState,
  };

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
          <Component {...{ ...pageProps, ws }} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
