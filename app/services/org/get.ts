import { ORG_COLLECTION_NAME } from './org.constants';
import { OrgDocument } from './org.types';
import { getCollection } from '@lib/mongodb';
import { OrgModel } from '@models/org';
import { LoggerService } from '@services/logger';
import { USERS_COLLECTION_NAME } from '@services/user/user.constants';
import { UserDocument } from '@services/user/user.types';
import { ObjectId } from 'mongodb';

export async function getOrganizationById(
  _id: ObjectId
): Promise<OrgModel | Error> {
  try {
    const collection = await getCollection<OrgDocument>(ORG_COLLECTION_NAME);

    const result = await collection.findOne({ _id });

    if (!result) {
      throw new Error('Org not found');
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
    return err instanceof Error ? err : new Error('Internal server error');
  }
}

export async function getOrganizations(
  orgIds: ObjectId[],
  userId: ObjectId
): Promise<OrgModel[] | Error> {
  try {
    const orgs = await Promise.all(orgIds.map(getOrganizationById));

    return orgs.filter((org): org is OrgModel => org !== null);
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}

export async function getOrgNameById(orgId: ObjectId): Promise<string | Error> {
  try {
    const org = await getOrganizationById(orgId);

    if (org instanceof Error) {
      throw org;
    }

    return org.name;
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}

export async function getOrgAdminIdByOrgId(
  orgId: ObjectId
): Promise<string | Error> {
  try {
    const org = await getOrganizationById(orgId);

    if (org instanceof Error) {
      throw org;
    }

    return org.adminId;
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}
