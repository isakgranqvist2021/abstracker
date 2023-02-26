import { UserModel } from '@models/user';
import Link from 'next/link';

interface MyOrgsListProps {
  orgs: UserModel['orgs'];
}

function renderOrgListItem(org: UserModel['orgs'][number]) {
  return (
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
  );
}

export function MyOrgsList(props: MyOrgsListProps) {
  const { orgs } = props;

  return (
    <ul role="list" className="border w-80 rounded-md divide-y">
      {orgs.map(renderOrgListItem)}
    </ul>
  );
}
