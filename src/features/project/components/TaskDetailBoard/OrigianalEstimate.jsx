import React from "react";
import { Typography, TextField } from "@mui/material";

const OrigianalEstimate = ({ handleUpdateTask, task }) => {
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        ORIGINAL ESTIMATE (HOURS)
      </Typography>
      <TextField
        fullWidth
        name="originalEstimate"
        defaultValue={task.originalEstimate}
        type="number"
        variant="outlined"
        size="small"
        onChange={handleUpdateTask}
      />
    </>
  );
};

export default OrigianalEstimate;
