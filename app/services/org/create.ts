import { ORG_COLLECTION_NAME } from './org.constants';
import { CreateOrgDocument, CreateOrgOptions } from './org.types';
import { getCollection } from '@lib/mongodb';
import { DatabaseError } from '@models/error';
import { LoggerService } from '@services/logger';
import { joinOrg } from '@services/user/update';

export async function createOrganization(
  options: CreateOrgOptions
): Promise<string | DatabaseError> {
  try {
    const collection = await getCollection<CreateOrgDocument>(
      ORG_COLLECTION_NAME
    );

    if (!collection) {
      return { error: 'Internal server error' };
    }

    const result = await collection.insertOne({
      adminId: options.adminId,
      createdAt: Date.now(),
      name: options.name,
      updatedAt: null,
    });

    await joinOrg(options.adminId, result.insertedId);

    return result.insertedId.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return { error: 'Internal server error' };
  }
}
