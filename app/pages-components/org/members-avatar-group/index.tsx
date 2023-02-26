import { OrgModel } from '@models/org';

interface MembersAvatarGroupProps {
  members: OrgModel['members'];
}

export function MembersAvatarGroup(props: MembersAvatarGroupProps) {
  const { members } = props;

  return (
    <div className="avatar-group -space-x-6 grow flex-wrap">
      {members.slice(0, 10).map((member) => (
        <div key={member._id} className="avatar placeholder">
          <div className="w-12 bg-neutral-focus text-neutral-content">
            <span>{member.name[0]}</span>
          </div>
        </div>
      ))}

      {members.length > 10 && (
        <div className="avatar placeholder">
          <div className="w-12 bg-neutral-focus text-neutral-content">
            <span>+{members.length - 10}</span>
          </div>
        </div>
      )}
    </div>
  );
}
