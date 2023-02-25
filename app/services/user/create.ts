import { USERS_COLLECTION_NAME } from './user.constants';
import { CreateUserDocument, CreateUserOptions } from './user.types';
import { getCollection } from '@lib/mongodb';
import { LoggerService } from '@services/logger';
import { auth0IdToToString } from '@utils';

export async function createUser(
  options: CreateUserOptions
): Promise<string | null> {
  try {
    const collection = await getCollection<CreateUserDocument>(
      USERS_COLLECTION_NAME
    );

    if (!collection) {
      return null;
    }

    const result = await collection.insertOne({
      createdAt: options.createdAt,
      email: options.email,
      id: auth0IdToToString(options.id),
      name: options.name,
      updatedAt: null,
      orgs: [],
    });

    await collection.createIndex({ id: 1, email: 1 }, { unique: true });

    return result.insertedId.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return null;
  }
}
