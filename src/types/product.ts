import type { Category } from "./category";
import type { Fabric } from "./fabric";
import type { Garment } from "./garment";

import type { Color } from "@mui/material";
import type { Region } from "./region";

import type { SleeveLength } from "./sleeveLength";

export interface ProductSize {
  size: string;
  price: number;
  quantity: number;
}

export interface ProductStock {
  _id?: string;
  product: string;
  size: ProductSize[];
  color: Color;
  quantity: number;
  image?: string[];
}

export interface Product {
  _id?: string | null;
  name: string;
  prodCode: string;
  price: number;
  category: Category;
  brand: string;
  region: Region;
  fabric: Fabric;
  garment: Garment;
  sleeveLength: SleeveLength;
  isActive?: boolean;
  isDeleted?: boolean;
}

export type ProductFormData = {
  _id?: string;
  name: string;
  prodCode: string;
  price: number;
  description: string;
  categoryId: string;
  regionId: string;
  fabricId: string;
  garmentId: string;
  sleeveLengthId: string;
  stylesheet?: string;
  brand: string;
};

export interface ProductCommon {
  name: string;
  description: string;
  prodCode: string;
  _id?: string;
  region: Region[];
  brand: string;
  stock?: { _id: string; variant: ProductStock[] };
  gender: string;
  fabricType: string;
  garmentType: string;
  sleeveLength: string;
  category: string;
}
