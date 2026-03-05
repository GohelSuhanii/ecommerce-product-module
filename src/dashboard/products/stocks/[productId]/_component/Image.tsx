import { Delete, FileUploadRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSingleStockStore } from "../../../../../store/singleStock.store";

const Image = () => {
  const { stock, updateStock } = useSingleStockStore();

  const [isUploading, setIsUploading] = useState(false);
  const [showError, setShowError] = useState(false);

  const uploadImages = (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);

    const fileArray = Array.from(files);
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file));

    setTimeout(() => {
      updateStock({
        image: [...stock.image, ...imageUrls],
      });

      setIsUploading(false);
      setShowError(false);
    }, 500);
  };

  const deleteHandler = (index: number) => {
    const updatedImages = stock.image.filter((_, i) => i !== index);

    updateStock({
      image: updatedImages,
    });
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Add Images
      </Typography>

      <Stack direction="row" gap={2} flexWrap="wrap">
        <Tooltip title="Add New Image">
          <Box display="flex" flexDirection="column">
            {!isUploading ? (
              <Button
                component="label"
                sx={{
                  height: 100,
                  width: 100,
                  borderRadius: 2,
                  border: `2px dashed ${
                    showError && stock.image.length === 0 ? "red" : "#ccc"
                  }`,
                  color: "text.secondary",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <FileUploadRounded />
                Upload
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => uploadImages(e.target.files)}
                />
              </Button>
            ) : (
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            )}

            {showError && stock.image.length === 0 && (
              <Typography variant="caption" color="error" mt={0.5}>
                Please upload at least one image
              </Typography>
            )}
          </Box>
        </Tooltip>

        {stock.image.map((image, index) => (
          <Box
            key={index}
            sx={{
              height: 100,
              width: 100,
              borderRadius: 2,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              onClick={() => deleteHandler(index)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "white",
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Image;
