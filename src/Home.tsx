import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={3}
    >
      <Typography variant="h4" fontWeight="bold">
        Welcome to Dashboard
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/dashboard/products/stocks/1")}
      >
        Go to Product Stocks
      </Button>
    </Box>
  );
};

export default Home;