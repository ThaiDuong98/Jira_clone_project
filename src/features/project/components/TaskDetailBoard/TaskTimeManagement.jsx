import React from "react";
import { Box, Typography, Slider, TextField } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

const TaskTimeManagement = ({ task, handleUpdateTask }) => {
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        TIME TRACKING
      </Typography>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <AccessAlarmsIcon />
          <Slider
            value={task.timeTrackingSpent}
            max={task.timeTrackingSpent + task.timeTrackingRemaining}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption">
            {task.timeTrackingSpent}h logged
          </Typography>
          <Typography variant="caption">
            {task.timeTrackingRemaining}h remaining
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mr: 2 }}>
            <Typography variant="caption">Time Spent</Typography>
            <TextField
              name="timeTrackingSpent"
              defaultValue={task.timeTrackingSpent}
              type="number"
              variant="outlined"
              size="small"
              onChange={handleUpdateTask}
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="caption">Time Reamining</Typography>
            <TextField
              name="timeTrackingRemaining"
              defaultValue={task.timeTrackingRemaining}
              type="number"
              variant="outlined"
              size="small"
              onChange={handleUpdateTask}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TaskTimeManagement;
