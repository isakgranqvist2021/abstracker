import { ObjectId } from 'mongodb';

type InvitationStatus = 'pending' | 'accepted' | 'rejected';

export interface InvitationDocument {
  _id: ObjectId;
  createdAt: number;
  expirationDate: number;
  orgId: ObjectId;
  recipientEmail: string;
  sentBy: ObjectId;
  status: InvitationStatus;
  updatedAt: number | null;
}

export interface CreateInvitationOptions {
  expirationDate: number;
  orgId: string;
  recipientEmail: string;
  sentBy: ObjectId;
}

export interface UpdateInvitationOptions {
  _id: string;
  status: InvitationStatus;
  userId: ObjectId;
}

export interface ResendInvitationOptions {
  expirationDate: number;
  orgId: ObjectId;
  recipientEmail: string;
}

export type CreateInvitationDocument = Omit<InvitationDocument, '_id'>;
