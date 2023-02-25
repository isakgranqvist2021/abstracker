import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DefaultHead } from '@components/default-head';
import Link from 'next/link';
import React from 'react';

export default function Account() {
  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Account" />

      <main>
        <h1>Account</h1>

        <Link href="/api/auth/logout">Logout</Link>
      </main>
    </React.Fragment>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account',
});
