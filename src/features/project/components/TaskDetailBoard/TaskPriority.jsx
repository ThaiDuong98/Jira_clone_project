import React from "react";
import { Typography, Select, MenuItem } from "@mui/material";

const TaskPriority = ({ task, handleUpdateTask, priorities }) => {
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        PRIORITY
      </Typography>
      <Select
        name="priorityId"
        fullWidth
        defaultValue={task.priorityTask.priorityId}
        size="small"
        sx={{ mt: 1 }}
        onChange={handleUpdateTask}
      >
        {priorities.map((priority) => (
          <MenuItem key={priority.priorityId} value={priority.priorityId}>
            {priority.priority}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default TaskPriority;
