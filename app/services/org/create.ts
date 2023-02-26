import { ORG_COLLECTION_NAME } from './org.constants';
import { CreateOrgDocument, CreateOrgOptions } from './org.types';
import { getCollection } from '@lib/mongodb';
import { LoggerService } from '@services/logger';
import { joinOrg } from '@services/user/update';

export async function createOrganization(
  options: CreateOrgOptions
): Promise<string | Error> {
  try {
    const collection = await getCollection<CreateOrgDocument>(
      ORG_COLLECTION_NAME
    );

    const result = await collection.insertOne({
      adminId: options.adminId,
      createdAt: Date.now(),
      name: options.name,
      updatedAt: null,
    });

    const joinOrgResult = await joinOrg(options.adminId, result.insertedId);

    if (joinOrgResult instanceof Error) {
      throw joinOrgResult;
    }

    return result.insertedId.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}
