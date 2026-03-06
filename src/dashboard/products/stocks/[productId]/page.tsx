import {
  AddRounded,
  Delete,
  Edit,
  KeyboardArrowLeft,
} from "@mui/icons-material";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleStockStore } from "../../../../store/singleStock.store";
import type { ProductStock } from "../../../../types/product";
import { useProductStore } from "./_component/product.store";
import StockManagement from "./_component/stock.step";

const Page = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const productStock = useProductStore((state) => state.productStock);
  // const { updateStock } = useSingleStockStore();
  const { updateStock, resetStock } = useSingleStockStore();
  // const { setIsEdit } = useProductStore();

  const handleEdit = (item: ProductStock) => {
    updateStock({
      _id: item._id,
      image: item.image ?? [],
      color: item.color,
      size: item.size,
    });

    setIsEdit(true);
    setOpen(true);
  };

  const removeProductStock = useProductStore(
    (state) => state.removeProductStock
  );

  const handleGoBack = () => navigate(-1);

  return (
    <Grid container spacing={2} p={2}>
      {/* ================= HEADER ================= */}
      <Grid size={{ xs: 12 }}>
        <Box display="flex" flexDirection="column" gap={2} mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Go Back" arrow>
              <IconButton onClick={handleGoBack} color="primary">
                <KeyboardArrowLeft />
              </IconButton>
            </Tooltip>

            <Breadcrumbs separator=">">
              <Link
                underline="hover"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                underline="hover"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard/products")}
              >
                Products
              </Link>

              <Typography fontWeight="bold" color="primary">
                Stocks
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>
      </Grid>

      {/* stock card */}
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" gap={2} flexWrap="wrap">
          {/* ADD BUTTON */}
          <Button
            sx={{
              height: 200,
              width: 200,
              borderRadius: 3,
              border: "2px dashed",
              borderColor: "text.secondary",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              "&:hover .MuiSvgIcon-root": {
                transform: "scale(1.5)",
              },
            }}
            onClick={() => {
              resetStock(); // clear previous form data
              setIsEdit(false);
              setOpen(true);
            }}
          >
            <AddRounded sx={{ fontSize: 40 }} />
            <Typography>Add Stock</Typography>
          </Button>

          {/* STOCK LIST */}
          {productStock.map((item: ProductStock) => (
            <Card
              key={item._id}
              sx={{
                width: 200,
                height: 200,
                position: "relative",
              }}
            >
              {item.image?.[0] && (
                <CardMedia
                  component="img"
                  image={item.image[0]}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover", //shows full image
                  }}
                />
              )}

              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "white",
                  p: 1,
                }}
              >
                {/* Color + Sizes Row */}
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  {/* Multi Color Box */}
                  <Box
                    sx={{
                      height: 20,
                      width: 20,
                      borderRadius: "50%",
                      backgroundColor: item.color.hexValue,
                      border: "1px solid white",
                    }}
                  />

                  {/* Sizes */}
                  <Typography
                    variant="caption"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {item.size.map((s) => s.size).join(", ")}
                  </Typography>
                </Box>

                {/* Price */}
                <Typography variant="subtitle2" fontWeight="bold">
                  ₹ {item.size[0]?.price}
                </Typography>
              </CardContent>
              <Box position="absolute" top={5} right={5} display="flex" gap={1}>
                {/* -- */}
                <IconButton size="small" onClick={() => handleEdit(item)}>
                  <Edit fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => removeProductStock(item._id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Stack>
      </Grid>

      <StockManagement
        productId={productId ?? ""}
        open={open}
        onClose={() => setOpen(false)}
        isEdit={isEdit}
      />
    </Grid>
  );
};

export default Page;
