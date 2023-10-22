import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { SIGNAL_EVENTS } from 'constants/graceful';
import { terminator } from 'services/gracefulShutdown';
import i18nextConfig from '../../next-i18next.config';

if (process.env.NODE_ENV === 'production') {
  SIGNAL_EVENTS.forEach((sig) => {
    process.on(sig, () => {
      terminator(sig);
    });
  });
}

export default function Document(props: DocumentProps) {
  const { __NEXT_DATA__: nextData } = props;

  const currentLocale = nextData.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body className="bg-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
