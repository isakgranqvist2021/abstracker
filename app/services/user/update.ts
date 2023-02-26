import { USERS_COLLECTION_NAME } from './user.constants';
import { UserDocument } from './user.types';
import { getCollection } from '@lib/mongodb';
import { LoggerService } from '@services/logger';
import { BSON } from 'mongodb';

export async function joinOrg(
  _id: BSON.ObjectId,
  orgId: BSON.ObjectId
): Promise<string | Error> {
  try {
    const collection = await getCollection<UserDocument>(USERS_COLLECTION_NAME);

    const result = await collection.findOneAndUpdate(
      { _id },
      { $push: { orgs: { _id: orgId, createdAt: Date.now() } } }
    );

    if (!result.value) {
      throw new Error('User not found');
    }

    return result.value._id.toHexString();
  } catch (err) {
    LoggerService.log('error', err);

    return err instanceof Error ? err : new Error('Internal server error');
  }
}
