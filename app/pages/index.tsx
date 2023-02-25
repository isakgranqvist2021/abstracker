import { useUser } from '@auth0/nextjs-auth0/client';
import { DefaultHead } from '@components/default-head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Home" />

      <main>
        <h1>Welcome to AbsTracker!</h1>

        {!user ? (
          <Link href="/api/auth/login">Login</Link>
        ) : (
          <Link href="/account">Account</Link>
        )}
      </main>
    </React.Fragment>
  );
}
