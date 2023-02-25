import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import React from 'react';

export default function CreateOrg() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Create organisation" />

      <MainContainer>
        <div className="flex flex-col items-center justify-center grow gap-10">
          <PageTitle className="text-center">Create new organisation</PageTitle>
        </div>
      </MainContainer>
    </React.Fragment>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account/create-org',
});
