import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { BreadCrumb, BreadCrumbs } from '@components/breadcrumbs';
import { DefaultHead } from '@components/default-head';
import { List } from '@components/list';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { InvitationModel } from '@models/invitation';
import { UserModel } from '@models/user';
import {
  OrgListItem,
  InvitationListItem,
} from '@pages-components/account/list-item';
import { getInvitationsByEmail } from '@services/invitation/get';
import { getUserByAuth0Id } from '@services/user/get';
import { GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import React from 'react';

interface AccountProps {
  user: UserModel | null;
  invitations: InvitationModel[] | null;
}

export default function Account(props: AccountProps) {
  const { user, invitations } = props;

  if (!user) {
    return null;
  }

  return (
    <NavbarContainer>
      <DefaultHead title="AbsTracker | Account" />

      <BreadCrumbs>
        <BreadCrumb href="/account">Home</BreadCrumb>
      </BreadCrumbs>

      <MainContainer className="p-5">
        <div className="flex flex-col items-center justify-center grow gap-10 w-fit mx-auto">
          <PageTitle className="text-center">Welcome, {user.name}</PageTitle>

          {user.orgs.length === 0 && (
            <p className="text-center max-w-prose">
              You are not in an organization. Ask your organization
              administrator to add you to an organization. Or create your own
              organization.
            </p>
          )}

          <List>
            {user.orgs.map(OrgListItem)}
            {invitations?.map(InvitationListItem)}
          </List>

          <Link href="/account/create-org" className="btn btn-primary gap-2">
            Create an organization
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>
      </MainContainer>
    </NavbarContainer>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account',
  getServerSideProps: async (
    ctx
  ): Promise<GetServerSidePropsResult<AccountProps>> => {
    const session = await getSession(ctx.req, ctx.res);

    if (!session) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    const user = await getUserByAuth0Id(session.user.sub);

    if (user instanceof Error) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    const invitations = await getInvitationsByEmail(user.email);

    if (invitations instanceof Error) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    return { props: { user, invitations } };
  },
});
