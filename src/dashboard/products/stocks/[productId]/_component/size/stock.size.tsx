import { AddRounded, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSingleStockStore } from "../../../../../../store/singleStock.store";
import { ProductSizeForm } from "./size.form";

interface ProductSize {
  size: string;
  price: number;
  quantity: number;
}

interface SizeCardProps {
  size: ProductSize;
  deleteHandler: (size: string) => void;
  editHandler: (size: ProductSize) => void;
}

const SizeCard = ({ size, deleteHandler, editHandler }: SizeCardProps) => {
  return (
    <Box
      sx={{
        height: 120,
        width: 200,
        borderRadius: 5,
        border: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "relative",
        p: 2,
      }}
    >
      <Box position="absolute" top={10} left={15}>
        <Typography fontWeight="bold" fontSize={28}>
          {size.size}
        </Typography>
        <Typography fontWeight="bold" fontSize={14}>
          x{size.quantity}
        </Typography>
      </Box>

      <Box position="absolute" bottom={40} left={15}>
        <Typography fontWeight="bold" fontSize={15}>
          ₹ {size.price?.toFixed(2)}
        </Typography>
      </Box>

      <IconButton
        size="small"
        sx={{ position: "absolute", top: 5, right: 5 }}
        onClick={() => deleteHandler(size.size)}
      >
        <Delete fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        sx={{
          position: "absolute",
          bottom: 5,
          right: 5,
          bgcolor: "black",
          color: "white",
          "&:hover": { bgcolor: "#333" },
        }}
        onClick={() => editHandler(size)}
      >
        <Edit fontSize="small" />
      </IconButton>
    </Box>
  );
};

export interface SelectOption {
  label: string;
  value: string;
}

interface ProductSizeProps {
  showError?: boolean;
  options?: SelectOption[];
  warehouseOptions?: SelectOption[];
}

export const ProductSizes = ({ showError }: ProductSizeProps) => {
  const sizeOptions = [
    { label: "12-14", value: "12-14" },
    { label: "14-16", value: "14-16" },
    { label: "16-18", value: "16-18" },
  ];

  const [openSize, setOpenSize] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editSize, setEditSize] = useState<ProductSize>();

  const { stock, deleteSize, setSize, updateSize } = useSingleStockStore();

  // if size used then will not appear in drop down
  const filteredSizeOptions = sizeOptions.filter(
    (option) => !stock.size.some((s) => s.size === option.value)
  );

  const handleFormOpen = () => {
    setEdit(false);
    setEditSize(undefined);
    setOpenSize(true);
  };

  const submitHandler = (data: ProductSize) => {
    if (edit) {
      updateSize(data);
    } else {
      setSize(data);
    }
    setOpenSize(false);
  };

  return (
    <Box>
      <Typography variant="h6">Add Size</Typography>

      <Stack direction="row" gap={2} flexWrap="wrap">
        <Tooltip title="Add New Size">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="text"
              startIcon={
                <AddRounded
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "45px",
                  }}
                />
              }
              sx={{
                height: 120,
                width: 200,
                p: 5,
                borderRadius: 5,
                border: `2px dashed ${
                  showError && stock.size.length === 0 ? "red" : "#ccc"
                }`,
                borderWidth: "medium",
                color: "text.secondary",
                "& *": { fontWeight: "bold", m: 0 },
              }}
              onClick={handleFormOpen}
            />

            <Typography variant="caption" sx={{ color: "red" }}>
              {showError && stock.size.length === 0 ? "Please Add Size" : ""}
            </Typography>
          </Box>
        </Tooltip>

        {stock.size.map((size, i) => (
          <SizeCard
            key={i}
            size={size}
            deleteHandler={deleteSize}
            editHandler={(size) => {
              setEditSize(size);
              setEdit(true);
              setOpenSize(true);
            }}
            // sizeOptions={sizeOptions}
          />
        ))}
      </Stack>

      <Dialog
        open={openSize}
        onClose={() => setOpenSize(false)}
        title={edit ? "Update Size" : "Add New Size"}
        maxWidth="lg"
        // withDivider={false}
      >
        <ProductSizeForm
          isEdit={edit}
          initialValue={editSize}
          sizeOptions={edit ? sizeOptions : filteredSizeOptions}
          closeHandler={() => setOpenSize(false)}
          submitHandler={submitHandler}
        />
      </Dialog>
    </Box>
  );
};
