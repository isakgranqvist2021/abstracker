import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { OrgModel } from '@models/org';
import { useRouter } from 'next/router';
import React, { createRef } from 'react';

type CreateOrgApiPayload = Pick<OrgModel, 'name'>;

function createOrganization(data: CreateOrgApiPayload) {
  return fetch('/api/account/create-org', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function ListItem(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <li className="flex gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-green-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>

      <span className="italic">{children}</span>
    </li>
  );
}

export default function CreateOrg() {
  const router = useRouter();

  const refs: Record<keyof CreateOrgApiPayload, any> = {
    name: createRef<HTMLInputElement>(),
  };

  const { user } = useUser();

  if (!user) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: CreateOrgApiPayload = Object.keys(refs).reduce(
      (acc, key) => ({
        ...acc,
        [key]: refs[key as keyof CreateOrgApiPayload].current.value,
      }),
      { name: '' }
    );

    const res = await createOrganization(formData);

    if (res.status === 200) {
      const data: { orgId: string } = await res.json();

      router.replace(`/org/${data.orgId}`);

      return;
    }
  };

  return (
    <NavbarContainer>
      <DefaultHead title="AbsTracker | Create organization" />

      <MainContainer>
        <div className="flex flex-col items-center justify-center grow gap-10">
          <PageTitle className="text-center">Create new organization</PageTitle>

          <ul>
            <ListItem>0.25 cent per user in your organization</ListItem>
            <ListItem>Only pay for active users in your organization</ListItem>
            <ListItem>Unlimited number of users at the same price</ListItem>
            <ListItem>You can add or remove users at any time</ListItem>
            <ListItem>No hidden fees, no credit card required</ListItem>
          </ul>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 w-full items-center"
          >
            <input
              className="input input-bordered w-full max-w-xs"
              id="name"
              placeholder="My organization"
              ref={refs.name}
              type="text"
            />

            <button className="btn btn-primary" type="submit">
              Create organization
            </button>
          </form>
        </div>
      </MainContainer>
    </NavbarContainer>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account/create-org',
});
