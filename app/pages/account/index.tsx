import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { UserModel } from '@models/user';
import { getUserByAuth0Id } from '@services/user/get';
import Link from 'next/link';
import React from 'react';

interface AccountProps {
  user: UserModel | null;
}

export default function Account(props: AccountProps) {
  const { user } = props;

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
            <ul role="list" className="border w-80 rounded-md divide-y">
              {user.orgs.map((org) => (
                <li
                  className="first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-base-200 cursor-pointer"
                  key={org._id}
                >
                  <Link
                    href={`/org/${org._id}`}
                    className="p-3 flex justify-between items-center"
                  >
                    <span className="whitespace-nowrap">{org.name}</span>
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
                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
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
      return { props: { user: null } };
    }

    const user = await getUserByAuth0Id(session.user.sub);

    if (!user) {
      ctx.res.writeHead(302, { Location: '/' });
      return { props: { user: null } };
    }

    return { props: { user } };
  },
});
