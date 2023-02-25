import { ORG_COLLECTION_NAME } from './org.constants';
import { OrgDocument } from './org.types';
import { getCollection } from '@lib/mongodb';
import { OrgModel } from '@models/org';
import { LoggerService } from '@services/logger';
import { USERS_COLLECTION_NAME } from '@services/user/user.constants';
import { UserDocument } from '@services/user/user.types';
import { BSON } from 'mongodb';

export async function getOrganizationById(
  _id: BSON.ObjectId
): Promise<OrgModel | null> {
  try {
    const collection = await getCollection<OrgDocument>(ORG_COLLECTION_NAME);

    // TODO - check if user is allowed to access this org

    if (!collection) {
      return null;
    }

    const result = await collection.findOne({ _id });

    if (!result) {
      return null;
    }

    const members: OrgModel['members'] = [];

    const userCollection = await getCollection<UserDocument>(
      USERS_COLLECTION_NAME
    );

    if (userCollection) {
      const userResults = await userCollection
        .find({
          ['orgs._id']: { $in: [_id] },
        })
        .toArray();

      for (const userResult of userResults) {
        members.push({
          _id: userResult._id.toHexString(),
          joinedDate:
            userResult.orgs.find(
              (org) => org._id.toHexString() === _id.toHexString()
            )?.createdAt ?? null,
          email: userResult.email,
          name: userResult.name,
        });
      }
    }

    return {
      _id: result._id.toHexString(),
      adminId: result.adminId.toHexString(),
      createdAt: result.createdAt,
      name: result.name,
      updatedAt: result.updatedAt,
      members,
    };
  } catch (err) {
    LoggerService.log('error', err);
    return null;
  }
}

export async function getOrganizations(
  orgIds: BSON.ObjectId[]
): Promise<OrgModel[]> {
  const orgs = await Promise.all(orgIds.map(getOrganizationById));

  return orgs.filter((org): org is OrgModel => org !== null);
}
