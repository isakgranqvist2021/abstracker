import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@styles/globals.css';
import type { AppProps } from 'next/app';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
