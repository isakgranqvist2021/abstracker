import { OrgModel } from '@models/org';

export interface UserModel {
  _id: string;
  createdAt: number;
  email: string;
  id: string;
  name: string;
  orgs: OrgModel[];
  updatedAt: number | null;
}
