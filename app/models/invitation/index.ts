export interface InvitationModel {
  _id: string;
  createdAt: number;
  expirationDate: number;
  name: string;
  orgId: string;
  recipientEmail: string;
  sentBy: string;
  status: 'pending' | 'accepted' | 'rejected';
  updatedAt: number | null;
}
