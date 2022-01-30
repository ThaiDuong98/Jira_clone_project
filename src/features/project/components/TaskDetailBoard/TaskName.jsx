import React from "react";
import { TextField, Typography } from "@mui/material";

const TaskName = ({
  task = {},
  isEditTaskName,
  setEditTaskName,
  handleUpdateTask,
}) => {
  return (
    <>
      {isEditTaskName ? (
        <TextField
          fullWidth
          autoFocus
          name="taskName"
          defaultValue={task.taskName}
          type="text"
          variant="outlined"
          size="small"
          onBlur={handleUpdateTask}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.target.blur();
            }
          }}
        />
      ) : (
        <Typography
          variant="h5"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "500",
            "&:hover": { backgroundColor: "#f4f5f7" },
          }}
          onClick={() => setEditTaskName(true)}
        >
          {task.taskName}
        </Typography>
      )}
    </>
  );
};

export default TaskName;
