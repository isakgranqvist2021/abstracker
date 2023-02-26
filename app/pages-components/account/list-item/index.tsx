import { useInvitationActions } from './list-item.helpers';
import { ListItem } from '@components/list';
import { InvitationModel } from '@models/invitation';
import { UserModel } from '@models/user';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

function ListItemActions(props: PropsWithChildren) {
  const { children } = props;

  return <div className="flex gap-2 justify-center">{children}</div>;
}

export function OrgListItem(org: UserModel['orgs'][number]) {
  return (
    <ListItem key={`my-org-${org._id}`}>
      <div className="flex flex-col gap-1">
        <span className="whitespace-nowrap text-primary leading-none">
          Organization
        </span>
        <span className="leading-none text-xs">{org.name}</span>
      </div>

      <ListItemActions>
        <Link href={`/account/org/${org._id}`}>
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
      </ListItemActions>
    </ListItem>
  );
}

export function InvitationListItem(props: InvitationModel) {
  const { _id, name, orgId } = props;

  const { acceptInvitation, declineInvitation, isDeclined } =
    useInvitationActions(_id, orgId);

  if (isDeclined) {
    return null;
  }

  return (
    <ListItem key={`my-invitation-${_id}`}>
      <div className="flex flex-col gap-1">
        <span className="whitespace-nowrap text-accent leading-none">
          Invitation
        </span>
        <span className="leading-none text-xs">{name}</span>
      </div>

      <ListItemActions>
        <svg
          className="w-6 h-6 text-red-500 cursor-pointer"
          fill="none"
          onClick={declineInvitation}
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          className="w-6 h-6 text-green-500 cursor-pointer"
          fill="none"
          onClick={acceptInvitation}
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </ListItemActions>
    </ListItem>
  );
}
