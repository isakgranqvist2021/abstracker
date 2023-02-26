import { InvitationModel } from '@models/invitation';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface MyInvitationsListProps {
  invitations: InvitationModel[];
}

function InvitationListItem(props: InvitationModel) {
  const { _id, name, orgId } = props;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const acceptInvitation = async () => {
    setIsLoading(true);

    const res = await fetch('/api/account/invite', {
      method: 'PUT',
      body: JSON.stringify({ _id, status: 'accepted' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    if (res.status === 200) {
      router.push(`/account/org/${orgId}`);
      return;
    }
  };

  const declineInvitation = async () => {
    setIsLoading(true);

    const res = await fetch('/api/account/invite', {
      method: 'PUT',
      body: JSON.stringify({ _id, status: 'declined' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    if (res.status === 200) {
      setIsDeclined(true);
      return;
    }
  };

  if (isDeclined) {
    return null;
  }

  return (
    <li
      className="first-of-type:rounded-t-md last-of-type:rounded-b-md p-4 flex gap-5 items-center justify-between"
      key={`my-invitation-${_id}`}
    >
      <h4>
        You have been invited to join{' '}
        <span className="text-primary">{name}</span>
      </h4>

      <div className="flex gap-2 justify-center">
        <button
          onClick={declineInvitation}
          disabled={isLoading}
          className="btn btn-sm btn-error text-white"
        >
          Decline
        </button>
        <button
          onClick={acceptInvitation}
          disabled={isLoading}
          className="btn btn-sm btn-success text-white"
        >
          Accept
        </button>
      </div>
    </li>
  );
}

function renderInvitationListItem(invitation: InvitationModel, index: number) {
  return <InvitationListItem key={invitation._id} {...invitation} />;
}

export function MyInvitationsList(props: MyInvitationsListProps) {
  const { invitations } = props;

  return (
    <ul role="list" className="border rounded-md divide-y">
      {invitations.map(renderInvitationListItem)}
    </ul>
  );
}
