import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { InvitationModel } from '@models/invitation';
import { createInvitation } from '@services/invitation/create';
import { getUserIdByAuth0Id } from '@services/user/get';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type CreateInvitationPayload = Pick<
  InvitationModel,
  'recipientEmail' | 'expirationDate'
>;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const body: CreateInvitationPayload = req.body;

  const session = await getSession(req, res);

  if (!session) {
    return res.status(401).end('Unauthorized');
  }

  const orgId = req.query.id;

  if (!orgId || typeof orgId !== 'string') {
    return res.status(400).end('Bad Request');
  }

  const userId = await getUserIdByAuth0Id(session.user.sub);
  if (userId instanceof Error) {
    return res.status(500).end('Internal Server Error');
  }

  const lastInsertedId = await createInvitation({
    expirationDate: new Date(body.expirationDate).getTime(),
    orgId,
    recipientEmail: body.recipientEmail,
    sentBy: new ObjectId(userId),
  });

  if (lastInsertedId instanceof Error) {
    return res.status(400).end(lastInsertedId.message);
  }

  return res.status(200).json({
    invitationId: lastInsertedId,
  });
}

export default withApiAuthRequired(handler);
