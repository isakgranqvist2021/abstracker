import { getUserIdByAuth0Id } from './get';
import { USERS_COLLECTION_NAME } from './user.constants';
import { CreateUserDocument, CreateUserOptions } from './user.types';
import { getCollection } from '@lib/mongodb';
import { DatabaseError } from '@models/error';
import { LoggerService } from '@services/logger';
import { auth0IdToToString } from '@utils';

export async function createUser(
  options: CreateUserOptions
): Promise<string | DatabaseError> {
  try {
    const collection = await getCollection<CreateUserDocument>(
      USERS_COLLECTION_NAME
    );

    if (!collection) {
      return { error: 'Internal server error' };
    }

    const id = auth0IdToToString(options.id);

    const userId = await getUserIdByAuth0Id(id);

    if (typeof userId === 'string') {
      return { error: 'User already exists' };
    }

    const result = await collection.insertOne({
      createdAt: options.createdAt,
      email: options.email,
      id,
      name: options.name,
      orgs: [],
      updatedAt: null,
    });

    await collection.createIndex({ id: 1, email: 1 }, { unique: true });

    return result.insertedId.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return { error: 'Internal server error' };
  }
}
