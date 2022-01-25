import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ErrorAddTask = ({ onCloseDialog }) => {
  return (
    <Box>
      <Typography>
        You don't have any project (projects created by you) so you can't
        register the task. Please register your project.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={onCloseDialog}
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorAddTask;
