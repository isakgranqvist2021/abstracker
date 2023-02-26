import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { InvitationModel } from '@models/invitation';
import { updateInvitationStatus } from '@services/invitation/update';
import { getUserIdByAuth0Id } from '@services/user/get';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const body: Pick<InvitationModel, '_id' | 'status'> = req.body;

  const session = await getSession(req, res);

  if (!session) {
    return res.status(401).end('Unauthorized');
  }

  const userId = await getUserIdByAuth0Id(session.user.sub);

  if (typeof userId !== 'string') {
    return res.status(500).end('Internal Server Error');
  }

  const updateInvitationResult = await updateInvitationStatus({
    ...body,
    userId: new ObjectId(userId),
  });

  if (typeof updateInvitationResult === 'object') {
    return res.status(400).end(updateInvitationResult.error);
  }

  return res.status(200).end('OK');
}

export default withApiAuthRequired(handler);
