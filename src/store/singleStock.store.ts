import { create } from "zustand";
import type { ProductSize } from "../types/product";
import type { ProductColorType } from "../types/color";

export interface Stock {
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
  deleteSize: (size: string) => void;

  /* NEW - Partial update (like updateSingleStock concept) */
  updateStock: (data: Partial<Stock>) => void;

  resetStock: () => void;
}

/* ------------------ Store ------------------ */

export const useSingleStockStore = create<SingleStockState>((set) => ({
  stock: {
    image: [],
    color: null,
    size: [],
  },

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
  deleteSize: (sizeValue) =>
    set((state) => ({
      stock: {
        ...state.stock,
        size: state.stock.size.filter((item) => item.size !== sizeValue),
      },
    })),

  /* NEW - Partial update */
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
      stock: {
        image: [],
        color: null,
        size: [],
      },
    }),
}));
