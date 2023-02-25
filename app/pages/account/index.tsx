import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import Link from 'next/link';
import React from 'react';

export default function Account() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Account" />

      <MainContainer>
        <div className="flex flex-col items-center justify-center grow gap-10">
          <PageTitle className="text-center">Welcome, {user.name}</PageTitle>

          <p className="text-center max-w-prose">
            You are not in an organisation. Ask your organisation administrator
            to add you to an organisation. Or create your own organisation.
          </p>

          <Link href="/account/create-org" className="btn btn-primary">
            Create an organisation
          </Link>
        </div>
      </MainContainer>
    </React.Fragment>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account',
});
