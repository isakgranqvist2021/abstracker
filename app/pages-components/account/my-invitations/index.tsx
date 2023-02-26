import { InvitationModel } from '@models/invitation';

interface MyInvitationsListProps {
  invitations: InvitationModel[];
}

function renderInvitationListItem(invitation: InvitationModel) {
  return (
    <li
      className="first-of-type:rounded-t-md last-of-type:rounded-b-md"
      key={invitation._id}
    >
      <div className="p-3 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="whitespace-nowrap font-bold">{invitation.name}</span>
          <span className="whitespace-nowrap text-xs text-yellow">
            {invitation.status}
          </span>
        </div>

        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </li>
  );
}

export function MyInvitationsList(props: MyInvitationsListProps) {
  const { invitations } = props;

  return (
    <ul role="list" className="border w-80 rounded-md divide-y">
      {invitations.map(renderInvitationListItem)}
    </ul>
  );
}
