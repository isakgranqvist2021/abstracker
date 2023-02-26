import { INVITATIONS_COLLECTION_NAME } from './invitation.constants';
import {
  CreateInvitationDocument,
  InvitationDocument,
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
    const { _id, status, userId } = options;

    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    if (!collection) {
      throw new Error(
        'Could not get collection from database in updateInvitationStatus'
      );
    }

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { status, updatedAt: Date.now() } }
    );

    const invitation = await collection.findOne({ _id: new ObjectId(_id) });

    if (!invitation) {
      throw new Error('Could not find invitation in updateInvitationStatus');
    }

    if (status === 'accepted') {
      const result = await joinOrg(userId, invitation.orgId);

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

    if (!collection) {
      throw new Error(
        'Could not get collection from database in resendInvitation'
      );
    }

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
