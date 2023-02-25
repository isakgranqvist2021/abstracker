import React from 'react';

export function AddMemberModal() {
  return (
    <React.Fragment>
      <input type="checkbox" id="add-member-modal" className="modal-toggle" />

      <label htmlFor="add-member-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-secondary">
              Add member
            </h2>
            <input
              type="text"
              placeholder="email@gmail.com"
              className="input input-bordered"
            />
            <button className="btn ml-auto">Send invitation</button>
          </div>
        </label>
      </label>
    </React.Fragment>
  );
}
