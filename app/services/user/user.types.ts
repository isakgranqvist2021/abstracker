import { ObjectId } from 'mongodb';

interface UserOrgModel {
  _id: ObjectId;
  createdAt: number;
}

export interface UserDocument {
  _id: ObjectId;
  createdAt: number;
  email: string;
  id: string;
  name: string;
  orgs: UserOrgModel[];
  updatedAt: number | null;
}

export interface CreateUserOptions {
  createdAt: number;
  email: string;
  id: string;
  name: string;
}

export type CreateUserDocument = Omit<UserDocument, '_id'>;
