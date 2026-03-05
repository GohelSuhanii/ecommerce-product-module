export interface Region {
  _id?: string | null;
  name: string;
  slug: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
