import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { BenefitsSection } from '@pages-components/home/benefits-section';
import { CallToActionFooterSection } from '@pages-components/home/call-to-action-section';
import { HeroSection } from '@pages-components/home/hero-section';
import { HowItWorksSection } from '@pages-components/home/how-it-works-section';
import { WhoIsItForSection } from '@pages-components/home/who-is-it-for-section';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Home" />

      <NavbarContainer>
        <MainContainer>
          <HeroSection />

          <WhoIsItForSection />

          <BenefitsSection />

          <HowItWorksSection />

          <CallToActionFooterSection />
        </MainContainer>
      </NavbarContainer>
    </React.Fragment>
  );
}
