"use client";
import {
  Add,
  Edit,
  EditDocument,
  EditOutlined,
  FileUploadRounded,
  PictureAsPdf,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import type { ColDef, GroupCellRendererParams } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ProductFormData } from "../../types/product";

type ProductFormValues = {
  styleSheet: File | null;
};

type Brand = {
  name: string;
};

type Category = {
  name: string;
};

type Product = {
  _id: string;
  name: string;
  prodCode: string;
  brand: Brand;
  category: Category;
  isActive: boolean;
};
export interface Props {
  open: boolean;
  onClose: () => void;
  defaultValues: ProductFormData;
  isEditModal?: boolean;
}

// component
const ProductPage = () => {
  const initialValues: ProductFormData = {
    _id: "",
    name: "",
    prodCode: "",
    price: 0,
    description: "",
    stylesheet: "",
    categoryId: "",
    regionId: "",
    garmentId: "",
    fabricId: "",
    sleeveLengthId: "",
    brand: "",
  };

  const { register, setValue, getValues, watch } = useForm<ProductFormValues>({
    defaultValues: {
      styleSheet: null,
    },
  });

  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialValues);
  // const uploadFileButton = useRef<HTMLButtonElement | null>(null); // --
  const styleSheet = watch("styleSheet");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleEdit = (data: Product) => {
    const index = rowData.findIndex((item) => item.prodCode === data.prodCode);

    setFormData({
      ...initialValues,
      name: data.name,
      prodCode: data.prodCode,
      brand: data.brand.name,
      categoryId: data.category.name,
    });

    setEditingIndex(index);
    setIsEditMode(true);
    setOpen(true);
  };

  const handleEditStock = (data: any) => {
    navigate(`/dashboard/products/stocks/${data?._id}`);
  };

  const viewPdf = () => {
    const file = getValues("styleSheet");

    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  const fileUploadElement = (
    <input
      type="file"
      accept="application/pdf"
      hidden
      {...register("styleSheet")}
      onChange={(e) => {
        const file = e.target.files?.[0] || null;
        setValue("styleSheet", file);
      }}
    />
  );

  // Row Data
  const [rowData, setRowData] = useState<Product[]>([
    {
      _id: "1",
      name: "T-shirt",
      prodCode: "T12",
      brand: { name: "Zara" },
      category: { name: "Women Wear" },
      isActive: true,
    },
    {
      _id: "2",
      name: "Jeans",
      prodCode: "J45",
      brand: { name: "H&M" },
      category: { name: "Men Wear" },
      isActive: true,
    },
  ]);

  // Column Definitions
  const [colDefs] = useState<ColDef<Product>[]>([
    { field: "name", headerName: "Product Name" },
    { field: "prodCode", headerName: "Product Code" },
    {
      headerName: "Brand",
      valueGetter: (params) => params.data?.brand.name,
    },
    {
      headerName: "Category",
      valueGetter: (params) => params.data?.category.name,
    },
    {
      field: "isActive",
      headerName: "Status",
      cellRenderer: (params: GroupCellRendererParams) =>
        params.value ? "Active" : "Inactive",
    },
    {
      headerName: "Action",
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params: GroupCellRendererParams) => (
        <Box display="flex" height="100%" gap={1}>
          <Tooltip title="Edit Product">
            <IconButton color="primary" onClick={() => handleEdit(params.data)}>
              <EditOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit Stocks">
            <IconButton
              color="secondary"
              onClick={() => handleEditStock(params.data)}
            >
              <EditDocument />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]);

  // Default column
  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" color="primary" fontWeight={600}>
          Product Section
        </Typography>

        <Box display="flex" gap={2}>
          <TextField
            size="small"
            label="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setFormData(initialValues); // reset form
              setOpen(true);
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* AG Grid */}
      <AgGridProvider modules={[AllCommunityModule]}>
        <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
          <AgGridReact<Product>
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowHeight={40}
            pagination
            paginationPageSize={5}
          />
        </div>
      </AgGridProvider>

      <Grid container p={2} spacing={2}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            {isEditMode ? "Edit Product" : "Add Product "}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Product Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Product Code"
                  value={formData.prodCode}
                  onChange={(e) =>
                    setFormData({ ...formData, prodCode: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              {/* Row 2 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Category"
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Region"
                  value={formData.regionId}
                  onChange={(e) =>
                    setFormData({ ...formData, regionId: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Brand"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              {/* Divider Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
                  ---------------- More Details ----------------
                </Typography>
              </Grid>

              {/* More Details Row */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Fabric Type"
                  value={formData.fabricId}
                  onChange={(e) =>
                    setFormData({ ...formData, fabricId: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Garment Type"
                  value={formData.garmentId}
                  onChange={(e) =>
                    setFormData({ ...formData, garmentId: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Sleeve Length"
                  value={formData.sleeveLengthId}
                  onChange={(e) =>
                    setFormData({ ...formData, sleeveLengthId: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              {/* Description Full Width */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Grid container spacing={2} my={1}>
            <Grid size={{ xs: 12 }}>
              {styleSheet ? (
                <Box position="relative">
                  <IconButton sx={{ position: "absolute", right: 5, top: 5 }}>
                    {fileUploadElement}
                    <Edit />
                  </IconButton>

                  <Box
                    onClick={viewPdf}
                    sx={{
                      height: 100,
                      width: "100%",
                      borderRadius: 2,
                      border: "1px dashed",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={2}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <PictureAsPdf sx={{ fontSize: 40 }} />
                      <Typography fontWeight={500}>
                        {styleSheet?.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ) : (
                <Button
                  component="label"
                  fullWidth
                  sx={{
                    height: 100,
                    borderRadius: 2,
                    border: "2px dashed",
                    borderColor: "divider",
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "grey.50",
                    },
                  }}
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <FileUploadRounded />
                    <Typography fontWeight={500}>
                      Upload by clicking here
                    </Typography>
                  </Stack>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setValue("styleSheet", file);
                    }}
                  />
                </Button>
              )}
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>

            <Button
              variant="contained"
              onClick={() => {
                const updatedProduct: Product = {
                  name: formData.name,
                  prodCode: formData.prodCode,
                  brand: { name: formData.brand },
                  category: { name: formData.categoryId },
                  isActive: true,
                };

                if (isEditMode && editingIndex !== null) {
                  //UPDATE EXISTING ROW
                  const updatedRows = [...rowData];
                  updatedRows[editingIndex] = updatedProduct;
                  setRowData(updatedRows);
                } else {
                  //ADD NEW ROW
                  setRowData((prev) => [...prev, updatedProduct]);
                }

                // Reset everything
                setIsEditMode(false);
                setEditingIndex(null);
                setFormData(initialValues);
                setOpen(false);
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
};

export default ProductPage;
