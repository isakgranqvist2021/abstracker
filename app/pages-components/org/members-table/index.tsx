import { OrgModel } from '@models/org';

interface MemberTableProps {
  members: OrgModel['members'];
}

function renderMember(member: OrgModel['members'][number], index: number) {
  return (
    <tr key={member._id}>
      <th>{index + 1}</th>
      <td>{member.name}</td>
      <td>{member.email}</td>
      <td>
        {new Date(member.joinedDate!).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </td>
    </tr>
  );
}

export function MemberTable(props: MemberTableProps) {
  const { members } = props;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>{members.map(renderMember)}</tbody>
      </table>
    </div>
  );
}
