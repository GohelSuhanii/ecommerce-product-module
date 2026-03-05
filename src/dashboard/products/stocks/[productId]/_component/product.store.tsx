import { create } from "zustand";
import type { ProductCommon, ProductStock } from "../../../../../types/product";

interface ProductState {
  product: ProductCommon;
  productStock: ProductStock[];
  isEdit: boolean;

  setIsEdit: (edit: boolean) => void;
  setProduct: (payload: ProductCommon) => void;
  addProductStock: (payload: ProductStock) => void;
  updateProductStock: (payload: ProductStock) => void;
  removeProductStock: (id: string) => void;
  reset: () => void;
}

const initialProduct: ProductCommon = {
  name: "",
  description: "",
  prodCode: "",
  brand: "",
  category: "",
  fabricType: "",
  garmentType: "",
  gender: "",
  sleeveLength: "",
  region: [],
};

export const useProductStore = create<ProductState>((set) => ({
  isEdit: false,
  product: initialProduct,
  productStock: [],

  setIsEdit: (edit) => set({ isEdit: edit }),

  setProduct: (payload) => set({ product: payload }),

  addProductStock: (payload) =>
    set((state) => ({
      productStock: [...state.productStock, payload],
    })),

  updateProductStock: (payload) =>
    set((state) => ({
      productStock: state.productStock.map((item) =>
        item._id === payload._id ? payload : item
      ),
    })),

  removeProductStock: (id) =>
    set((state) => ({
      productStock: state.productStock.filter((item) => item._id !== id),
    })),

  reset: () =>
    set({
      isEdit: false,
      product: initialProduct,
      productStock: [],
    }),
}));
