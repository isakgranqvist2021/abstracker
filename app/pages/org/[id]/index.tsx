import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DefaultHead } from '@components/default-head';
import { MainContainer } from '@containers/main-container';
import { NavbarContainer } from '@containers/navbar-container';
import { OrgModel } from '@models/org';
import { AddMemberModal } from '@pages-components/org/add-member-modal';
import { HoursAwayChart } from '@pages-components/org/hours-away-chart';
import { MembersAvatarGroup } from '@pages-components/org/members-avatar-group';
import { MemberTable } from '@pages-components/org/members-table';
import { getOrganizationById } from '@services/org/get';
import { getUserIdByAuth0Id } from '@services/user/get';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ObjectId } from 'mongodb';
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
  Title,
  Tooltip,
  Legend
);

export default function Org(props: OrgProps) {
  const { org, userId } = props;

  if (!org) {
    return null;
  }

  const members: {
    _id: string;
    email: string;
    joinedDate: number | null;
    name: string;
  }[] = Array.from(new Array(100)).map((_, i) => ({
    _id: i.toString(),
    email: 'example@gmail.com',
    joinedDate: Date.now(),
    name: `Member ${i}`,
  }));

  return (
    <NavbarContainer pageOptions={{ title: org.name, href: `/org/${org._id}` }}>
      <DefaultHead title="AbsTracker | Org Name" />

      <MainContainer className="p-0">
        <div className="flex grow overflow-hidden">
          <AddMemberModal />

          <div className="grow flex flex-col">
            <div className="flex justify-between gap-5 bg-base-200 p-5 min-h-fit overflow-hidden items-center">
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

              <MembersAvatarGroup members={members} />
            </div>

            <div className="grow flex flex-col grow gap-5 p-5 bg-neutral-content overflow-x-hidden overflow-y-auto">
              <div className="flex gap-3" style={{ height: 400 }}>
                <HoursAwayChart />
              </div>

              <div className="flex gap-5">
                <Link
                  href={`/org/${org._id}/report-absence`}
                  className="btn btn-primary gap-2"
                >
                  Report absence
                </Link>

                <Link
                  href={`/org/${org._id}/my-absence`}
                  className="btn btn-secondary gap-2"
                >
                  View my absence
                </Link>
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
  getServerSideProps: async (context): Promise<{ props: OrgProps }> => {
    if (!context.params?.id || Array.isArray(context.params.id)) {
      context.res.writeHead(302, { Location: '/account' });
      return { props: { org: null, userId: null } };
    }

    const session = await getSession(context.req, context.res);

    if (!session) {
      context.res.writeHead(302, { Location: '/account' });
      return { props: { org: null, userId: null } };
    }

    const org = await getOrganizationById(new ObjectId(context.params.id));

    if (!org) {
      context.res.writeHead(302, { Location: '/account' });
      return { props: { org: null, userId: null } };
    }

    const userId = await getUserIdByAuth0Id(session.user.sub);

    if (!userId) {
      context.res.writeHead(302, { Location: '/account' });
      return { props: { org: null, userId: null } };
    }

    return { props: { org, userId } };
  },
});
