import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const TaskHeader = ({ task }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {task.taskTypeDetail.id === 1 && (
          <Tooltip title="Bug" placement="right-start" arrow>
            <AlbumIcon sx={{ color: "#e30f0f" }} />
          </Tooltip>
        )}

        {task.taskTypeDetail.id === 2 && (
          <Tooltip title="Task" placement="right-start" arrow>
            <CheckBoxIcon sx={{ color: "#58a7f9" }} />
          </Tooltip>
        )}

        <Typography sx={{ ml: 2 }}>
          {task.taskTypeDetail.id === 1 ? "BUG" : "TASK"} - {task.taskId}
        </Typography>
      </Box>
    </>
  );
};

export default TaskHeader;
