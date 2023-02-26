import { invitationExistsWithSameRecipientAndOrgId } from './get';
import { INVITATIONS_COLLECTION_NAME } from './invitation.constants';
import {
  CreateInvitationDocument,
  CreateInvitationOptions,
} from './invitation.types';
import { resendInvitation } from './update';
import { getCollection } from '@lib/mongodb';
import { DatabaseError } from '@models/error';
import { LoggerService } from '@services/logger';
import { userIsMemberOfOrg } from '@services/user/get';
import { ObjectId } from 'mongodb';

async function sendInvitationEmail(recipientEmail: string, orgId: ObjectId) {
  // TODO: Send email
}

export async function createInvitation(
  options: CreateInvitationOptions
): Promise<string | DatabaseError> {
  try {
    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    if (!collection) {
      throw collection;
    }

    const orgId = new ObjectId(options.orgId);
    const recipientEmail = options.recipientEmail;

    const invitationExists = await invitationExistsWithSameRecipientAndOrgId(
      recipientEmail,
      orgId
    );

    if ('error' in invitationExists) {
      throw invitationExists;
    }

    const isAlreadyMemberOfOrg = await userIsMemberOfOrg(recipientEmail, orgId);

    if (typeof isAlreadyMemberOfOrg !== 'boolean') {
      throw isAlreadyMemberOfOrg;
    }

    if (isAlreadyMemberOfOrg) {
      throw new Error('User is already a member of this org');
    }

    if (invitationExists.pendingInvitations > 0) {
      throw new Error(
        `pendingInvitations: ${invitationExists.pendingInvitations}`
      );
    }

    if (invitationExists.declinedInvitations > 0) {
      const result = await resendInvitation({
        orgId,
        recipientEmail,
        expirationDate: options.expirationDate,
      });

      if (typeof result !== 'string') {
        throw result;
      }

      await sendInvitationEmail(recipientEmail, orgId);

      return result;
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

    await sendInvitationEmail(recipientEmail, orgId);

    return result.insertedId.toHexString();
  } catch (err) {
    LoggerService.log('error', err);
    return { error: 'Internal server error' };
  }
}
