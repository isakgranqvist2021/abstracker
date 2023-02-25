import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DefaultHead } from '@components/default-head';
import { PageTitle } from '@components/page-title';
import { MainContainer } from '@containers/main-container';
import { OrgModel } from '@models/org';
import { UserModel } from '@models/user';
import { getOrganizationById } from '@services/org/get';
import { getUserIdByAuth0Id } from '@services/user/get';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import React from 'react';

interface OrgProps {
  org: OrgModel | null;
  userId: string | null;
}

function AddMember() {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="email@gmail.com"
        className="input input-bordered w-full max-w-xs"
      />

      <button className="btn btn-circle btn-outline">
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
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
}

interface MembersGroupProps {
  members: OrgModel['members'];
}

function MembersGroup(props: MembersGroupProps) {
  // const { members } = props;
  const members: {
    _id: string;
    email: string;
    joinedDate: number | null;
    name: string;
  }[] = Array.from(new Array(100)).map((_, i) => ({
    _id: i.toString(),
    email: '',
    joinedDate: null,
    name: `Member ${i}`,
  }));

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

interface SidebarProps {
  isAdmin: boolean;
  _id: string;
}

function Sidebar(props: SidebarProps) {
  const { isAdmin, _id } = props;

  return (
    <div className="bg-base-200 p-5 flex flex-col justify-between gap-5 min-w-fit">
      {isAdmin ? (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Add member</h2>
          <AddMember />
        </div>
      ) : (
        <span></span>
      )}

      <div className="flex gap-5">
        <Link
          href={`/org/${_id}/report-absence`}
          className="btn btn-primary gap-2"
        >
          Report absence
        </Link>

        <Link
          href={`/org/${_id}/my-absence`}
          className="btn btn-secondary gap-2"
        >
          View my absence
        </Link>
      </div>
    </div>
  );
}

export default function Org(props: OrgProps) {
  const { org, userId } = props;

  if (!org) {
    return null;
  }

  return (
    <React.Fragment>
      <DefaultHead title="AbsTracker | Org Name" />

      <MainContainer className="p-0 overflow-hidden">
        <div className="flex grow overflow-hidden">
          <Sidebar isAdmin={org.adminId === userId} _id={org._id} />

          <div className="grow flex flex-col">
            <div className="flex justify-between gap-5 bg-base-200 p-5 bg-secondary-content overflow-x-hidden items-center">
              <PageTitle>{org.name}</PageTitle>

              <MembersGroup members={org.members} />
            </div>

            <div className="grow p-5 bg-neutral-content overflow-x-hidden overflow-y-auto">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                aperiam, voluptate explicabo ea modi dolorum minus dolorem
                maxime ut illo. Obcaecati non veniam aperiam necessitatibus,
                beatae cumque eaque voluptatibus aliquam, impedit quae
                cupiditate numquam dignissimos eveniet eum! Accusantium maiores
                eveniet, distinctio consectetur dolore, nisi quam eius adipisci
                praesentium perferendis earum voluptate? Nesciunt, vel ipsum
                quas tenetur nobis voluptates. Voluptatem ipsum dolores eligendi
                corporis expedita dignissimos esse facere, eaque reiciendis ab
                sequi beatae, consectetur minima suscipit nihil eos at aperiam
                omnis voluptas harum! Sint aliquam commodi nulla, eveniet, minus
                accusantium enim in laudantium explicabo sed beatae deleniti
                consectetur perferendis aut facilis, iste culpa voluptate
                quaerat eligendi! Libero modi cum quisquam officiis, sed error
                voluptas et aut magnam recusandae non fugiat cumque aperiam
                animi accusantium eveniet at. Eligendi dicta in dignissimos
                similique fuga, ad perspiciatis recusandae ipsum repudiandae
                dolorem quisquam laborum voluptatibus eum. Esse impedit iusto
                commodi dignissimos voluptatem accusantium culpa recusandae, ea
                reprehenderit. Sit, illo aliquam. Harum, dolor earum quia magnam
                commodi perspiciatis voluptatem exercitationem hic. Adipisci
                enim, vitae ipsum necessitatibus qui illum esse. Sed quidem
                ullam beatae dolores eaque, sint reprehenderit esse iusto
                inventore rem eius dolor aliquam rerum maiores quod voluptatem
                voluptatibus aperiam ipsum corrupti? Dolorum voluptatum harum
                repudiandae enim accusamus ad officiis a rerum corporis commodi?
                Debitis odit esse libero laudantium, repellat aliquid cupiditate
                voluptates ipsa beatae, maiores facere quia labore rerum ducimus
                explicabo aut? Voluptates iure sit sapiente in amet, aspernatur
                beatae consequatur quas dolore deserunt tenetur assumenda,
                delectus eos repudiandae, suscipit doloremque et ipsa. Corrupti
                labore facere sed voluptatum dolorum dicta, provident explicabo
                ullam, iste amet quibusdam ut incidunt exercitationem quo
                expedita dignissimos repudiandae, optio sunt molestias impedit.
                Delectus, velit illum, nulla enim totam quos ducimus architecto
                iure amet, veritatis tempore veniam laboriosam! Sequi
                dignissimos sunt vitae, quasi, mollitia veniam quae repellat
                iure quas earum illum!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                aperiam, voluptate explicabo ea modi dolorum minus dolorem
                maxime ut illo. Obcaecati non veniam aperiam necessitatibus,
                beatae cumque eaque voluptatibus aliquam, impedit quae
                cupiditate numquam dignissimos eveniet eum! Accusantium maiores
                eveniet, distinctio consectetur dolore, nisi quam eius adipisci
                praesentium perferendis earum voluptate? Nesciunt, vel ipsum
                quas tenetur nobis voluptates. Voluptatem ipsum dolores eligendi
                corporis expedita dignissimos esse facere, eaque reiciendis ab
                sequi beatae, consectetur minima suscipit nihil eos at aperiam
                omnis voluptas harum! Sint aliquam commodi nulla, eveniet, minus
                accusantium enim in laudantium explicabo sed beatae deleniti
                consectetur perferendis aut facilis, iste culpa voluptate
                quaerat eligendi! Libero modi cum quisquam officiis, sed error
                voluptas et aut magnam recusandae non fugiat cumque aperiam
                animi accusantium eveniet at. Eligendi dicta in dignissimos
                similique fuga, ad perspiciatis recusandae ipsum repudiandae
                dolorem quisquam laborum voluptatibus eum. Esse impedit iusto
                commodi dignissimos voluptatem accusantium culpa recusandae, ea
                reprehenderit. Sit, illo aliquam. Harum, dolor earum quia magnam
                commodi perspiciatis voluptatem exercitationem hic. Adipisci
                enim, vitae ipsum necessitatibus qui illum esse. Sed quidem
                ullam beatae dolores eaque, sint reprehenderit esse iusto
                inventore rem eius dolor aliquam rerum maiores quod voluptatem
                voluptatibus aperiam ipsum corrupti? Dolorum voluptatum harum
                repudiandae enim accusamus ad officiis a rerum corporis commodi?
                Debitis odit esse libero laudantium, repellat aliquid cupiditate
                voluptates ipsa beatae, maiores facere quia labore rerum ducimus
                explicabo aut? Voluptates iure sit sapiente in amet, aspernatur
                beatae consequatur quas dolore deserunt tenetur assumenda,
                delectus eos repudiandae, suscipit doloremque et ipsa. Corrupti
                labore facere sed voluptatum dolorum dicta, provident explicabo
                ullam, iste amet quibusdam ut incidunt exercitationem quo
                expedita dignissimos repudiandae, optio sunt molestias impedit.
                Delectus, velit illum, nulla enim totam quos ducimus architecto
                iure amet, veritatis tempore veniam laboriosam! Sequi
                dignissimos sunt vitae, quasi, mollitia veniam quae repellat
                iure quas earum illum!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                aperiam, voluptate explicabo ea modi dolorum minus dolorem
                maxime ut illo. Obcaecati non veniam aperiam necessitatibus,
                beatae cumque eaque voluptatibus aliquam, impedit quae
                cupiditate numquam dignissimos eveniet eum! Accusantium maiores
                eveniet, distinctio consectetur dolore, nisi quam eius adipisci
                praesentium perferendis earum voluptate? Nesciunt, vel ipsum
                quas tenetur nobis voluptates. Voluptatem ipsum dolores eligendi
                corporis expedita dignissimos esse facere, eaque reiciendis ab
                sequi beatae, consectetur minima suscipit nihil eos at aperiam
                omnis voluptas harum! Sint aliquam commodi nulla, eveniet, minus
                accusantium enim in laudantium explicabo sed beatae deleniti
                consectetur perferendis aut facilis, iste culpa voluptate
                quaerat eligendi! Libero modi cum quisquam officiis, sed error
                voluptas et aut magnam recusandae non fugiat cumque aperiam
                animi accusantium eveniet at. Eligendi dicta in dignissimos
                similique fuga, ad perspiciatis recusandae ipsum repudiandae
                dolorem quisquam laborum voluptatibus eum. Esse impedit iusto
                commodi dignissimos voluptatem accusantium culpa recusandae, ea
                reprehenderit. Sit, illo aliquam. Harum, dolor earum quia magnam
                commodi perspiciatis voluptatem exercitationem hic. Adipisci
                enim, vitae ipsum necessitatibus qui illum esse. Sed quidem
                ullam beatae dolores eaque, sint reprehenderit esse iusto
                inventore rem eius dolor aliquam rerum maiores quod voluptatem
                voluptatibus aperiam ipsum corrupti? Dolorum voluptatum harum
                repudiandae enim accusamus ad officiis a rerum corporis commodi?
                Debitis odit esse libero laudantium, repellat aliquid cupiditate
                voluptates ipsa beatae, maiores facere quia labore rerum ducimus
                explicabo aut? Voluptates iure sit sapiente in amet, aspernatur
                beatae consequatur quas dolore deserunt tenetur assumenda,
                delectus eos repudiandae, suscipit doloremque et ipsa. Corrupti
                labore facere sed voluptatum dolorum dicta, provident explicabo
                ullam, iste amet quibusdam ut incidunt exercitationem quo
                expedita dignissimos repudiandae, optio sunt molestias impedit.
                Delectus, velit illum, nulla enim totam quos ducimus architecto
                iure amet, veritatis tempore veniam laboriosam! Sequi
                dignissimos sunt vitae, quasi, mollitia veniam quae repellat
                iure quas earum illum!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                aperiam, voluptate explicabo ea modi dolorum minus dolorem
                maxime ut illo. Obcaecati non veniam aperiam necessitatibus,
                beatae cumque eaque voluptatibus aliquam, impedit quae
                cupiditate numquam dignissimos eveniet eum! Accusantium maiores
                eveniet, distinctio consectetur dolore, nisi quam eius adipisci
                praesentium perferendis earum voluptate? Nesciunt, vel ipsum
                quas tenetur nobis voluptates. Voluptatem ipsum dolores eligendi
                corporis expedita dignissimos esse facere, eaque reiciendis ab
                sequi beatae, consectetur minima suscipit nihil eos at aperiam
                omnis voluptas harum! Sint aliquam commodi nulla, eveniet, minus
                accusantium enim in laudantium explicabo sed beatae deleniti
                consectetur perferendis aut facilis, iste culpa voluptate
                quaerat eligendi! Libero modi cum quisquam officiis, sed error
                voluptas et aut magnam recusandae non fugiat cumque aperiam
                animi accusantium eveniet at. Eligendi dicta in dignissimos
                similique fuga, ad perspiciatis recusandae ipsum repudiandae
                dolorem quisquam laborum voluptatibus eum. Esse impedit iusto
                commodi dignissimos voluptatem accusantium culpa recusandae, ea
                reprehenderit. Sit, illo aliquam. Harum, dolor earum quia magnam
                commodi perspiciatis voluptatem exercitationem hic. Adipisci
                enim, vitae ipsum necessitatibus qui illum esse. Sed quidem
                ullam beatae dolores eaque, sint reprehenderit esse iusto
                inventore rem eius dolor aliquam rerum maiores quod voluptatem
                voluptatibus aperiam ipsum corrupti? Dolorum voluptatum harum
                repudiandae enim accusamus ad officiis a rerum corporis commodi?
                Debitis odit esse libero laudantium, repellat aliquid cupiditate
                voluptates ipsa beatae, maiores facere quia labore rerum ducimus
                explicabo aut? Voluptates iure sit sapiente in amet, aspernatur
                beatae consequatur quas dolore deserunt tenetur assumenda,
                delectus eos repudiandae, suscipit doloremque et ipsa. Corrupti
                labore facere sed voluptatum dolorum dicta, provident explicabo
                ullam, iste amet quibusdam ut incidunt exercitationem quo
                expedita dignissimos repudiandae, optio sunt molestias impedit.
                Delectus, velit illum, nulla enim totam quos ducimus architecto
                iure amet, veritatis tempore veniam laboriosam! Sequi
                dignissimos sunt vitae, quasi, mollitia veniam quae repellat
                iure quas earum illum!
              </p>
            </div>
          </div>
        </div>
      </MainContainer>
    </React.Fragment>
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
