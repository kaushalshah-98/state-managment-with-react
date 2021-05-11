import { AllProviders } from '@providers';
import '@styles';
import { AppProps } from 'next/app';
import React from 'react';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AllProviders>
      <Component {...pageProps} />
    </AllProviders>
  );
}
