import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { OrgModel } from '@models/org';
import { createOrganization } from '@services/org/create';
import { getUserIdByAuth0Id } from '@services/user/get';
import { BSON } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const body: Pick<OrgModel, 'name'> = req.body;

  const session = await getSession(req, res);

  if (!session) {
    return res.status(401).end('Unauthorized');
  }

  const userId = await getUserIdByAuth0Id(session.user.sub);

  if (typeof userId === 'object') {
    return res.status(500).end('Internal Server Error');
  }

  const lastInsertedId = await createOrganization({
    adminId: new BSON.ObjectId(userId),
    createdAt: Date.now(),
    name: body.name,
    updatedAt: null,
  });

  if (!lastInsertedId) {
    return res.status(500).end('Internal Server Error');
  }

  return res.status(200).json({
    orgId: lastInsertedId,
  });
}

export default withApiAuthRequired(handler);
