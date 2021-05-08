import '@globalsSetting';
import { AllProviders } from '@providers';
import '@styles';
import { AppProps } from 'next/app';
import React from 'react';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {/* <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head> */}
      <AllProviders>
        <Component {...pageProps} />
      </AllProviders>
    </>
  );
}
