import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Home" />

      <NavbarContainer>
        <MainContainer>
          <PageTitle>Welcome to AbsTracker!</PageTitle>
        </MainContainer>
      </NavbarContainer>
    </React.Fragment>
  );
}
