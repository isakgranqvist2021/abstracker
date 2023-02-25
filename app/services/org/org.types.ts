import { ObjectId } from 'mongodb';

export interface OrgDocument {
  _id: ObjectId;
  adminId: ObjectId;
  createdAt: number;
  name: string;
  updatedAt: number | null;
}

export interface CreateOrgOptions {
  adminId: ObjectId;
  createdAt: number;
  name: string;
  updatedAt: number | null;
}

export type CreateOrgDocument = Omit<OrgDocument, '_id'>;
