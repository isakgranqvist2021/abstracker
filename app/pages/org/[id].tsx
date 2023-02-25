import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import Link from 'next/link';
import React from 'react';

export function Org() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Org Name" />

      <MainContainer>
        <div className="flex flex-col items-center justify-center grow gap-10">
          <PageTitle className="text-center">Welcome, {user.name}</PageTitle>

          <div className="flex gap-5">
            <Link
              href="/account/report-absence"
              className="btn btn-primary gap-2"
            >
              Report absence
            </Link>

            <Link
              href="/account/my-absence"
              className="btn btn-secondary gap-2"
            >
              View my absence
            </Link>
          </div>
        </div>
      </MainContainer>
    </React.Fragment>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account',
});
