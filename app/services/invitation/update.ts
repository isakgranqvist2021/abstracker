import { INVITATIONS_COLLECTION_NAME } from './invitation.constants';
import {
  CreateInvitationDocument,
  ResendInvitationOptions,
  UpdateInvitationOptions,
} from './invitation.types';
import { getCollection } from '@lib/mongodb';
import { LoggerService } from '@services/logger';
import { joinOrg } from '@services/user/update';
import { ObjectId } from 'mongodb';

export async function updateInvitationStatus(
  options: UpdateInvitationOptions
): Promise<void | Error> {
  try {
    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(options._id) },
      { $set: { status: options.status, updatedAt: Date.now() } }
    );

    const invitation = await collection.findOne({
      _id: new ObjectId(options._id),
    });

    if (!invitation) {
      throw new Error('Could not find invitation in updateInvitationStatus');
    }

    if (status === 'accepted') {
      const result = await joinOrg(options.userId, invitation.orgId);

      if (typeof result === 'string') {
        return;
      }

      throw new Error(
        'Could not join user to organization in updateInvitationStatus'
      );
    }

    if (updateResult.modifiedCount !== 1) {
      throw new Error(
        'Could not update invitation status in updateInvitationStatus'
      );
    }

    return;
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}

export async function resendInvitation(
  options: ResendInvitationOptions
): Promise<string | Error> {
  try {
    const { orgId, recipientEmail, expirationDate } = options;

    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    const updateResult = await collection.findOneAndUpdate(
      { orgId: new ObjectId(orgId), recipientEmail },
      { $set: { expirationDate, updatedAt: Date.now(), status: 'pending' } }
    );

    if (!updateResult.ok || !updateResult.value) {
      throw new Error('Could not update invitation in resendInvitation');
    }

    return updateResult.value._id.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}
