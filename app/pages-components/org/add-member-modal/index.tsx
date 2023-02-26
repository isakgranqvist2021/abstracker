import { InvitationModel } from '@models/invitation';
import React, { createRef } from 'react';

type CreateInvitationPayload = Pick<
  InvitationModel,
  'recipientEmail' | 'expirationDate'
>;

interface AddMemberModalProps {
  orgId: string;
}

export function AddMemberModal(props: AddMemberModalProps) {
  const { orgId } = props;

  const refs: Record<keyof CreateInvitationPayload, any> = {
    expirationDate: createRef<HTMLInputElement>(),
    recipientEmail: createRef<HTMLInputElement>(),
  };

  const createInvitation = (data: CreateInvitationPayload) => {
    return fetch(`/api/org/${orgId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: CreateInvitationPayload = Object.keys(refs).reduce(
      (acc, key) => ({
        ...acc,
        [key]: refs[key as keyof CreateInvitationPayload].current.value,
      }),
      { expirationDate: 0, recipientEmail: '' }
    );

    const res = await createInvitation(formData);

    if (res.status === 200) {
      console.log('Invitation sent!');
    }
  };

  return (
    <React.Fragment>
      <input type="checkbox" id="add-member-modal" className="modal-toggle" />

      <label htmlFor="add-member-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-secondary">
              Add member
            </h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <span className="label-text">Recipient email</span>
                <input
                  className="input input-bordered"
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                  ref={refs.recipientEmail}
                  type="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <span>Expiration date</span>
                <input
                  className="input input-bordered"
                  id="expiration-date"
                  name="expiration-date"
                  ref={refs.expirationDate}
                  required
                  type="datetime-local"
                />
              </div>

              <button type="submit" className="btn ml-auto">
                Send invitation
              </button>
            </form>
          </div>
        </label>
      </label>
    </React.Fragment>
  );
}
