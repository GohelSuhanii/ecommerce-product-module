export interface Category {
  _id?: string | null;
  name: string;
  catCode: string;
  description: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
