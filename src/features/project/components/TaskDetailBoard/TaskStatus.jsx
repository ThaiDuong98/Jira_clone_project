import React from "react";
import { Typography, Select, MenuItem } from "@mui/material";

const TaskStatus = ({ task, handleUpdateStatus, listStatus }) => {
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        STATUS
      </Typography>
      <Select
        name="statusId"
        fullWidth
        defaultValue={task.statusId}
        size="small"
        onChange={handleUpdateStatus}
        sx={{ mt: 1 }}
      >
        {listStatus.map((status) => (
          <MenuItem key={status.statusId} value={status.statusId}>
            {status.statusName}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default TaskStatus;
