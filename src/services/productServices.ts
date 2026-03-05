import type { Category } from "../types/category";
import type { Fabric } from "../types/fabric";
import type { Garment } from "../types/garment";
import type { Product } from "../types/product";
import type { Stock } from "../types/ProductStock";
import type { Region } from "../types/region";
import type { SleeveLength } from "../types/sleeveLength";

export const getProducts = async (): Promise<Product[]> => {
  const category: Category = {
    _id: "c1",
    name: "Men Wear",
    catCode: "MW001",
    description: "Men clothing category",
    isActive: true,
    isDeleted: false,
  };

  const fabric: Fabric = {
    _id: "f1",
    slug: "cotton",
    name: "Cotton",
    isActive: true,
    isDeleted: false,
  };

  const garment: Garment = {
    _id: "g1",
    slug: "shirt",
    name: "Shirt",
    isActive: true,
    isDeleted: false,
  };

  const region: Region = {
    _id: "r1",
    name: "India",
    slug: "india",
    isActive: true,
    isDeleted: false,
  };

  const sleeveLength: SleeveLength = {
    _id: "s1",
    slug: "full-sleeve",
    name: "Full Sleeve",
    isActive: true,
    isDeleted: false,
  };

  const stock: Stock = {
    _id: "st1",
    size: 42,
  };

  return [
    {
      _id: "p1",
      name: "Cotton Casual Shirt",
      prodCode: "CS101",
      price: 1499,
      category,
      fabric,
      garment,
      region,
      sleeveLength,
      stock,
      isActive: true,
      isDeleted: false,
    },
  ];
};
