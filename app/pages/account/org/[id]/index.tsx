import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { BreadCrumb, BreadCrumbs } from '@components/breadcrumbs';
import { DefaultHead } from '@components/default-head';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { OrgModel } from '@models/org';
import { AddMemberModal } from '@pages-components/org/add-member-modal';
import { HoursAwayChart } from '@pages-components/org/hours-away-chart';
import { MembersAvatarGroup } from '@pages-components/org/members-avatar-group';
import { MemberTable } from '@pages-components/org/members-table';
import { getOrganizationById } from '@services/org/get';
import { getUserByAuth0Id } from '@services/user/get';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { ObjectId } from 'mongodb';
import { GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import React from 'react';

interface OrgProps {
  org: OrgModel | null;
  userId: string | null;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Org(props: OrgProps) {
  const { org, userId } = props;

  if (!org) {
    return null;
  }

  const members = org.members;

  return (
    <NavbarContainer
      pageOptions={{ title: org.name, href: `/account/org/${org._id}` }}
    >
      <DefaultHead title="AbsTracker | Org Name" />

      <BreadCrumbs>
        <BreadCrumb href="/">Home</BreadCrumb>
        <BreadCrumb href="/account">Account</BreadCrumb>
        <BreadCrumb href={`/account/org/${org._id}`}>{org.name}</BreadCrumb>
      </BreadCrumbs>

      <MainContainer>
        <div className="flex grow overflow-hidden">
          <AddMemberModal orgId={org._id} />

          <div className="grow flex flex-col">
            <div className="flex justify-between gap-5 bg-neutral-content p-5 min-h-fit overflow-hidden items-center">
              {org.adminId === userId && (
                <label
                  htmlFor="add-member-modal"
                  className="btn btn-secondary gap-2 items-center"
                >
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
                  Add member
                </label>
              )}

              <button className="btn btn-primary gap-2">Report absence</button>
              <MembersAvatarGroup members={members} />
            </div>

            <div className="grow flex flex-col grow gap-5 p-5 bg-neutral-content overflow-x-hidden overflow-y-auto">
              <div className="flex gap-3" style={{ height: 400 }}>
                <HoursAwayChart />
              </div>

              <MemberTable members={members} />
            </div>
          </div>
        </div>
      </MainContainer>
    </NavbarContainer>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/account',
  getServerSideProps: async (
    ctx
  ): Promise<GetServerSidePropsResult<OrgProps>> => {
    if (!ctx.params?.id || Array.isArray(ctx.params.id)) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    const session = await getSession(ctx.req, ctx.res);

    if (!session) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    const user = await getUserByAuth0Id(session.user.sub);

    if (user instanceof Error) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    const org = await getOrganizationById(new ObjectId(ctx.params.id));

    if (org instanceof Error) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    const userOrgIds = new Set(user.orgs.map((org) => org._id.toString()));

    if (!userOrgIds.has(org._id.toString())) {
      return { redirect: { destination: '/account', permanent: false } };
    }

    return { props: { org, userId: user._id } };
  },
});
