import { Box } from "@mui/material";
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ columnId, taskList = [], onCardDrop }) {
  return (
    <Box sx={{ border: "none", display: "flex", flexDirection: "column" }}>
      {taskList && taskList.map((task) => <TaskItem task={task} />)}
    </Box>
  );
}
