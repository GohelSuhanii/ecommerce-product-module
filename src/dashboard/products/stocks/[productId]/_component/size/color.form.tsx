import { Add, AddRounded, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useSingleStockStore } from "../../../../../../store/singleStock.store";
import { useProductStore } from "../product.store";

/* -------------------- Types -------------------- */

interface ColorData {
  _id?: string;
  name: string;
  hex: string[];
}

/* -------------------- Validation -------------------- */

const validateColorName = (name: string): string | null => {
  if (!name.trim()) return "Color name is required";
  if (name.trim().length < 2) return "Must be at least 2 characters long";
  if (name.trim().length > 50) return "Must be less than 50 characters";
  if (!/^[a-zA-Z0-9\s-_]+$/.test(name.trim()))
    return "Only letters, numbers, spaces, hyphens, and underscores allowed";
  return null;
};

const validateHex = (hex: string): string | null => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex))
    return "Enter a valid hex color (e.g., #FF5733)";
  return null;
};

/* -------------------- Component -------------------- */

const ProductColorPicker = () => {
  const [showColorForm, setShowColorForm] = useState(false);

  const [colorList, setColorList] = useState<
    { _id: string; name: string; hexValue: string[] }[]
  >([
    { _id: "1", name: "Red", hexValue: ["#FF0000"] },
    { _id: "2", name: "Blue", hexValue: ["#0000FF"] },
  ]);

  /* New Color Form State */
  const [formData, setFormData] = useState<ColorData>({
    name: "",
    hex: ["#000000"],
  });

  const [errors, setErrors] = useState<any>({});

  /* Zustand */
  const stock = useSingleStockStore((state) => state.stock);
  const updateStock = useSingleStockStore((state) => state.updateStock);
  const productStock = useProductStore((state) => state.productStock);

  /* Selected colors */
  const selectedColor = useMemo(() => {
    return productStock
      .map((item) => item.color?._id)
      .filter(Boolean) as string[];
  }, [productStock]);

  const filteredColorList = useMemo(() => {
    return colorList.filter(
      (item) =>
        stock.color?._id === item._id || !selectedColor.includes(item._id)
    );
  }, [colorList, selectedColor, stock.color?._id]);

  const colorListById = useMemo(() => {
    const temp: Record<string, { hexValue: string[]; name: string }> = {};
    colorList.forEach((item) => {
      temp[item._id] = {
        hexValue: item.hexValue,
        name: item.name,
      };
    });
    return temp;
  }, [colorList]);

  /* -------------------- Add Color Submit -------------------- */

  const handleSubmitColor = () => {
    const nameError = validateColorName(formData.name);
    const hexErrors: any = {};

    formData.hex.forEach((hex, i) => {
      const error = validateHex(hex);
      if (error) hexErrors[i] = error;
    });

    if (nameError || Object.keys(hexErrors).length > 0) {
      setErrors({ name: nameError, hex: hexErrors });
      return;
    }

    const newColor = {
      _id: Date.now().toString(),
      name: formData.name.trim(),
      hexValue: formData.hex.map((h) => h.toUpperCase()),
    };

    setColorList((prev) => [...prev, newColor]);

    setFormData({ name: "", hex: ["#000000"] });
    setErrors({});
    setShowColorForm(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Choose Color</Typography>

        {!stock.color?._id && (
          <Chip
            variant="outlined"
            color="error"
            label="Please select the color"
          />
        )}
      </Box>

      <Box mt={3}>
        <RadioGroup
          value={stock.color?._id || ""}
          onChange={(e) =>
            updateStock({
              color: {
                _id: e.target.value,
                ...colorListById[e.target.value],
              },
            })
          }
        >
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {/* Add Button */}
            <Tooltip title="Add New Color">
              <IconButton
                sx={{
                  border: "2px dashed",
                  height: 40,
                  width: 40,
                }}
                onClick={() => setShowColorForm(true)}
              >
                <AddRounded />
              </IconButton>
            </Tooltip>

            {/* Colors */}
            {filteredColorList.map((data) => {
              const background =
                data.hexValue.length > 1
                  ? `linear-gradient(45deg, ${data.hexValue.join(",")})`
                  : data.hexValue[0];

              return (
                <Tooltip title={data.name} key={data._id}>
                  <FormControlLabel
                    value={data._id}
                    sx={{ margin: 0 }}
                    control={
                      <Radio
                        icon={
                          <Box
                            sx={{
                              height: 35,
                              width: 35,
                              borderRadius: "50%",
                              background,
                              border: "1px solid #ccc",
                            }}
                          />
                        }
                        checkedIcon={
                          <Box
                            sx={{
                              height: 35,
                              width: 35,
                              borderRadius: "50%",
                              background,
                              border: "2px solid black",
                            }}
                          />
                        }
                      />
                    }
                    label=""
                  />
                </Tooltip>
              );
            })}
          </Stack>
        </RadioGroup>
      </Box>

      {/* ---------------- Dialog with FULL Form ---------------- */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={showColorForm}
        onClose={() => setShowColorForm(false)}
      >
        <Box p={3} display="flex" flexDirection="column" gap={3}>
          <Typography variant="h6">Add New Color</Typography>

          <TextField
            label="Color Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          {formData.hex.map((hex, index) => (
            <TextField
              key={index}
              label="Hex Color"
              value={hex}
              onChange={(e) => {
                const updated = [...formData.hex];
                updated[index] = e.target.value;
                setFormData({ ...formData, hex: updated });
              }}
              error={Boolean(errors.hex?.[index])}
              helperText={errors.hex?.[index]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <input
                      type="color"
                      value={hex}
                      onChange={(e) => {
                        const updated = [...formData.hex];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, hex: updated });
                      }}
                      style={{
                        border: "none",
                        background: "none",
                        width: 30,
                        height: 30,
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment:
                  index !== 0 ? (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => {
                          const updated = formData.hex.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, hex: updated });
                        }}
                      >
                        <Remove />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              }}
              fullWidth
            />
          ))}
          {formData.hex.length < 3 && (
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() =>
                setFormData({
                  ...formData,
                  hex: [...formData.hex, "#000000"],
                })
              }
            >
              Add New Shade
            </Button>
          )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Button fullWidth variant="contained" onClick={handleSubmitColor}>
                Submit
              </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowColorForm(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProductColorPicker;
