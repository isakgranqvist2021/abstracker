import { ObjectId } from 'mongodb';

export interface InvitationDocument {
  _id: ObjectId;
  createdAt: number;
  expirationDate: number;
  orgId: ObjectId;
  recipientEmail: string;
  sentBy: ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  updatedAt: number | null;
}

export interface CreateInvitationOptions {
  expirationDate: number;
  orgId: string;
  recipientEmail: string;
  sentBy: ObjectId;
}

export type CreateInvitationDocument = Omit<InvitationDocument, '_id'>;
