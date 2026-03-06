import { create } from "zustand";
import type { ProductColorType } from "../types/color";
import type { ProductSize } from "../types/product";

/* ------------------ Types ------------------ */

export interface Stock {
  _id?: string;
  image: string[];
  color: ProductColorType | null;
  size: ProductSize[];
}

interface SingleStockState {
  stock: Stock;

  /* Individual setters */
  setColor: (color: ProductColorType | null) => void;

  setSize: (data: ProductSize) => void;
  updateSize: (data: ProductSize) => void;
  deleteSize: (sizeId: string) => void;

  /* Partial stock update */
  updateStock: (data: Partial<Stock>) => void;

  /* Reset stock */
  resetStock: () => void;
}

/* ------------------ Initial State ------------------ */

const initialStock: Stock = {
  _id: "",
  image: [],
  color: null,
  size: [],
};

/* ------------------ Store ------------------ */

export const useSingleStockStore = create<SingleStockState>((set) => ({
  stock: initialStock,

  /* Set color */
  setColor: (color) =>
    set((state) => ({
      stock: {
        ...state.stock,
        color,
      },
    })),

  /* Add size */
  setSize: (data) =>
    set((state) => ({
      stock: {
        ...state.stock,
        size: [...state.stock.size, data],
      },
    })),

  /* Update size */
  updateSize: (data) =>
    set((state) => ({
      stock: {
        ...state.stock,
        size: state.stock.size.map((item) =>
          item.size === data.size ? data : item
        ),
      },
    })),

  /* Delete size */
  deleteSize: (sizeId) =>
    set((state) => ({
      stock: {
        ...state.stock,
        size: state.stock.size.filter((item) => item.size !== sizeId),
      },
    })),

  /* Partial update */
  updateStock: (data) =>
    set((state) => ({
      stock: {
        ...state.stock,
        ...data,
      },
    })),

  /* Reset */
  resetStock: () =>
    set({
      stock: initialStock,
    }),
}));