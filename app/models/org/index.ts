export interface OrgModel {
  _id: string;
  adminId: string;
  createdAt: number;
  name: string;
  updatedAt: number | null;
  members: {
    _id: string;
    email: string;
    joinedDate: number | null;
    name: string;
  }[];
}
