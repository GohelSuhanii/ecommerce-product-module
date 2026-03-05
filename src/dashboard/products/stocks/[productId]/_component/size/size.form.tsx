import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export interface ProductSize {
  size: string;
  price: number;
  quantity: number;
}

// interface ProductSizeFormProps {
//   isEdit?: boolean;
//   initialValue?: ProductSize;
//   submitHandler: (data: ProductSize) => void;
//   closeHandler: () => void;
// }

import type { SelectOption } from "./stock.size";

interface ProductSizeFormProps {
  isEdit: boolean;
  initialValue?: ProductSize;
  sizeOptions: SelectOption[];
  // warehouseOptions?: SelectOption[];
  existingSize?: string[];
  closeHandler: () => void;
  submitHandler: (data: ProductSize) => void;
}

export const ProductSizeForm = ({
  isEdit,
  initialValue,
  submitHandler,
  closeHandler,
  sizeOptions,
  existingSize = [],
}: ProductSizeFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSize>({
    defaultValues: {
      size: "",
      price: 0,
      quantity: 0,
    },
  });

  /* Load edit data */
  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    }
  }, [initialValue, reset]);

  const onSubmit = (data: ProductSize) => {
    submitHandler(data);
    reset();
  };

  return (
    <Box p={3}>
      {/* title of the form  */}
      <Typography variant="h6" mb={2}>
        {isEdit ? "Update Size" : "Add new Size "}
      </Typography>

      <Grid container spacing={2}>
        {/* Size */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="size"
            control={control}
            rules={{ required: "Size is required" }}
            render={({ field }) => (
              <Autocomplete
                options={
                  isEdit
                    ? sizeOptions
                    : sizeOptions.filter(
                        (option) => !existingSize.includes(option.value)
                      )
                }
                getOptionLabel={(option) => option.label}
                value={
                  sizeOptions.find((opt) => opt.value === field.value) || null
                }
                onChange={(_, value) => field.onChange(value?.value || "")}
                disabled={isEdit}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Size"
                    error={!!errors.size}
                    helperText={errors.size?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        {/* Price */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="price"
            control={control}
            rules={{ required: "Price is required", min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            )}
          />
        </Grid>

        {/* Quantity */}
        <Grid>
          <Controller
            name="quantity"
            control={control}
            rules={{ required: "Quantity is required", min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                fullWidth
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button variant="outlined" onClick={closeHandler}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </Stack>
    </Box>
  );
};
