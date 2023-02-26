import { invitationExistsWithSameRecipientAndOrgId } from './get';
import { INVITATIONS_COLLECTION_NAME } from './invitation.constants';
import {
  CreateInvitationDocument,
  CreateInvitationOptions,
} from './invitation.types';
import { getCollection } from '@lib/mongodb';
import { DatabaseError } from '@models/error';
import { LoggerService } from '@services/logger';
import { ObjectId } from 'mongodb';

export async function createInvitation(
  options: CreateInvitationOptions
): Promise<string | DatabaseError> {
  try {
    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    if (!collection) {
      return { error: 'Internal server error' };
    }

    const orgId = new ObjectId(options.orgId);
    const recipientEmail = options.recipientEmail;

    const invitationExists = await invitationExistsWithSameRecipientAndOrgId(
      recipientEmail,
      orgId
    );

    if (invitationExists && invitationExists > 0) {
      return { error: 'Invitation already exists' };
    }

    const result = await collection.insertOne({
      createdAt: Date.now(),
      expirationDate: options.expirationDate,
      orgId,
      recipientEmail,
      sentBy: options.sentBy,
      status: 'pending',
      updatedAt: null,
    });

    // TODO - send an email to the recipientEmail

    return result.insertedId.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return { error: 'Internal server error' };
  }
}
