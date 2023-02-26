import { getSession } from '@auth0/nextjs-auth0';
import { DefaultHead } from '@components/default-head';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { BenefitsSection } from '@pages-components/home/benefits-section';
import { CallToActionFooterSection } from '@pages-components/home/call-to-action-section';
import { HeroSection } from '@pages-components/home/hero-section';
import { HowItWorksSection } from '@pages-components/home/how-it-works-section';
import { WhoIsItForSection } from '@pages-components/home/who-is-it-for-section';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
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

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> {
  const session = await getSession(ctx.req, ctx.res);

  if (session) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
