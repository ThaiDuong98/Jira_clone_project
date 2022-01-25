import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Box>
        <Typography variant="h1" textAlign="center">
          404
        </Typography>
        <Typography variant="h5" textAlign="center">
          Sory! Page not found
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ margin: "0 auto", display: "block" }}
          onClick={() => navigate("/project")}
        >
          Go back home page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
