import { Box, Typography } from "@mui/material";

const CommonComponent = ({ title }: { title: string }) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default CommonComponent;