import { INVITATIONS_COLLECTION_NAME } from './invitation.constants';
import { CreateInvitationDocument } from './invitation.types';
import { getCollection } from '@lib/mongodb';
import { InvitationModel } from '@models/invitation';
import { LoggerService } from '@services/logger';
import { getOrgNameById } from '@services/org/get';
import { ObjectId } from 'mongodb';

export async function invitationExistsWithSameRecipientAndOrgId(
  recipientEmail: string,
  orgId: ObjectId
): Promise<
  { pendingInvitations: number; declinedInvitations: number } | Error
> {
  try {
    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    if (!collection) {
      throw new Error('Invitations collection not found');
    }

    const pendingInvitations = await collection.countDocuments({
      recipientEmail,
      orgId,
      status: 'pending',
    });

    const declinedInvitations = await collection.countDocuments({
      recipientEmail,
      orgId,
      status: 'declined',
    });

    return { pendingInvitations, declinedInvitations };
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}

export async function getInvitationsByEmail(
  recipientEmail: string
): Promise<InvitationModel[] | Error> {
  try {
    const collection = await getCollection<CreateInvitationDocument>(
      INVITATIONS_COLLECTION_NAME
    );

    if (!collection) {
      throw new Error('Invitations collection not found');
    }

    const invitations = await collection
      .find({
        recipientEmail,
        status: 'pending',
      })
      .toArray();

    const invitationModels = await Promise.all(
      invitations.map(async (invitation): Promise<InvitationModel | null> => {
        const orgName = await getOrgNameById(invitation.orgId);

        if (typeof orgName !== 'string') {
          LoggerService.log('error', 'orgName is null');
          return null;
        }

        return {
          _id: invitation._id.toHexString(),
          createdAt: invitation.createdAt,
          expirationDate: invitation.expirationDate,
          name: orgName,
          orgId: invitation.orgId.toHexString(),
          recipientEmail: invitation.recipientEmail,
          sentBy: invitation.sentBy.toHexString(),
          status: 'pending',
          updatedAt: invitation.updatedAt,
        };
      })
    );

    return invitationModels.filter(
      (invitation) => invitation !== null
    ) as InvitationModel[];
  } catch (err) {
    LoggerService.log('error', err);
    return err instanceof Error ? err : new Error('Internal server error');
  }
}
