import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

import ProductImageUploader from "./Image";
import ProductColorPicker from "./size/color.form";
import { ProductSizes } from "./size/stock.size";

import { useSingleStockStore } from "../../../../../store/singleStock.store";
import { useProductStore } from "./product.store";

import type { ProductStock } from "../../../../../types/product";

type Props = {
  productId: string;
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
};

const StockManagement = ({ productId, open, onClose, isEdit }: Props) => {
  const { addProductStock, updateProductStock } = useProductStore();

  const { stock, resetStock } = useSingleStockStore();

  /* ---------------- Submit New Stock ---------------- */

  const handleSubmitStock = () => {
    if (!stock.color) {
      console.error("Color is required");
      return;
    }

    const newStock: ProductStock = {
      _id: stock._id ?? crypto.randomUUID(),
      product: productId,
      color: stock.color!,
      size: stock.size,
      quantity: stock.size.reduce((acc, item) => acc + item.quantity, 0),
      image: stock.image,
    };

    if (isEdit) {
      updateProductStock(newStock);
    } else {
      addProductStock(newStock);
    }

    console.log("DATA:", newStock);

    resetStock();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* TITLE */}
      <DialogTitle>
        <Box
          component="span"
          sx={{
            backgroundColor: "black",
            color: "white",
            fontWeight: 600,
            display: "flex",
          }}
        >
          {isEdit ? "Update Stock" : "Add New Stock"}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ backgroundColor: "background.default", py: 2 }}>
          {/* Image Upload */}
          <ProductImageUploader />

          <Divider sx={{ my: 4 }} />

          {/* Color Picker */}
          <ProductColorPicker />

          <Divider sx={{ my: 4 }} />

          {/* Size Section */}
          <ProductSizes />
        </Box>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmitStock}>
          {isEdit ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockManagement;
