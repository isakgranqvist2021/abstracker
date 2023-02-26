import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { InvitationModel } from '@models/invitation';
import { UserModel } from '@models/user';
import { MyInvitationsList } from '@pages-components/account/my-invitations';
import { MyOrgsList } from '@pages-components/account/my-orgs-list';
import { getInvitationsByEmail } from '@services/invitation/get';
import { getUserByAuth0Id } from '@services/user/get';
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

      <MainContainer>
        <div className="flex flex-col items-center justify-center grow gap-10">
          <PageTitle className="text-center">Welcome, {user.name}</PageTitle>

          {user.orgs.length === 0 ? (
            <p className="text-center max-w-prose">
              You are not in an organization. Ask your organization
              administrator to add you to an organization. Or create your own
              organization.
            </p>
          ) : (
            <MyOrgsList orgs={user.orgs} />
          )}

          {invitations && invitations.length > 0 && (
            <MyInvitationsList invitations={invitations} />
          )}

          <Link href="/account/create-org" className="btn btn-primary">
            Create an organization
          </Link>
        </div>
      </MainContainer>
    </NavbarContainer>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account',
  getServerSideProps: async (ctx): Promise<{ props: AccountProps }> => {
    const session = await getSession(ctx.req, ctx.res);

    if (!session) {
      ctx.res.writeHead(302, { Location: '/' });
      return { props: { user: null, invitations: null } };
    }

    const user = await getUserByAuth0Id(session.user.sub);

    if ('error' in user) {
      ctx.res.writeHead(302, { Location: '/' });
      return { props: { user: null, invitations: null } };
    }

    const invitations = await getInvitationsByEmail(user.email);

    if ('error' in invitations) {
      ctx.res.writeHead(302, { Location: '/' });
      return { props: { user: null, invitations: null } };
    }

    return { props: { user, invitations } };
  },
});
