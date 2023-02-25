import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NavbarContainer } from '@containers/navbar-container';
import '@styles/globals.css';
import type { AppProps } from 'next/app';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <UserProvider>
      <NavbarContainer>
        <Component {...pageProps} />
      </NavbarContainer>
    </UserProvider>
  );
}
