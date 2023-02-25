import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Home" />

      <MainContainer>
        <PageTitle>Welcome to AbsTracker!</PageTitle>
      </MainContainer>
    </React.Fragment>
  );
}
