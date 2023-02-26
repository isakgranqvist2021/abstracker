import { USERS_COLLECTION_NAME } from './user.constants';
import { UserDocument } from './user.types';
import { getCollection } from '@lib/mongodb';
import { DatabaseError } from '@models/error';
import { OrgModel } from '@models/org';
import { UserModel } from '@models/user';
import { LoggerService } from '@services/logger';
import { getOrganizationById } from '@services/org/get';
import { auth0IdToToString } from '@utils';

export async function getUserByAuth0Id(
  auth0Id: string
): Promise<UserModel | DatabaseError> {
  try {
    const collection = await getCollection<UserDocument>(USERS_COLLECTION_NAME);

    if (!collection) {
      return { error: 'Internal server error' };
    }

    const result = await collection.findOne({
      id: auth0IdToToString(auth0Id),
    });

    if (!result) {
      return { error: 'User not found' };
    }

    const userOrgs = await Promise.all(
      result.orgs.map((userOrg) => getOrganizationById(userOrg._id))
    );

    return {
      _id: result._id.toHexString(),
      createdAt: result.createdAt,
      email: result.email,
      id: result.id,
      name: result.name,
      orgs: userOrgs.filter((userOrg): userOrg is OrgModel => userOrg !== null),
      updatedAt: result.updatedAt,
    };
  } catch (err) {
    LoggerService.log('error', err);
    return { error: 'Internal server error' };
  }
}

export async function getUserIdByAuth0Id(
  auth0Id: string
): Promise<string | DatabaseError> {
  try {
    const collection = await getCollection<UserDocument>(USERS_COLLECTION_NAME);

    if (!collection) {
      return { error: 'Internal server error' };
    }

    const result = await collection.findOne({
      id: auth0IdToToString(auth0Id),
    });

    if (!result) {
      return { error: 'User not found' };
    }

    return result._id.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return { error: 'Internal server error' };
  }
}
