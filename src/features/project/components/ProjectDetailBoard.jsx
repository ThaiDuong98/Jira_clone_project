import { Box, Button, Typography, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { processSearchTask } from "../projectSlice";
import AvatarGroup from "./AvatarGroup";
import SearchTask from "./SearchTask";
import TaskList from "./TaskList";

export default function ProjectDetailBoard({ members, taskList = [] }) {
  const dispatch = useDispatch();
  const handleSearchTaskChange = (e) => {
    dispatch(processSearchTask(e.target.value));
  };

  return (
    <Box>
      <Typography sx={{ marginBottom: "20px" }} variant="h5">
        Board
      </Typography>
      <Box sx={{ display: "flex" }}>
        <SearchTask handleSearchTaskChange={handleSearchTaskChange} />
        <AvatarGroup members={members} />
        <Tooltip title="Not implemented" followCursor>
          <Button
            sx={{ marginLeft: "20px", textAlign: "center", lineHeight: "35px" }}
          >
            Only My Issues
          </Button>
        </Tooltip>
        <Tooltip title="Not implemented" followCursor>
          <Button
            sx={{ marginLeft: "20px", textAlign: "center", lineHeight: "35px" }}
          >
            Recently Updated
          </Button>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", marginTop: "20px" }}>
        {taskList &&
          taskList.map((taskListDetail, index) => (
            <Box
              key={index}
              sx={{
                width: "20rem",
                minHeight: "25rem",
                marginRight: "10px",
                backgroundColor: "#f4f5f7",
                borderRadius: "0.2rem",
              }}
            >
              <Typography sx={{ color: "#5e6c84", p: 1 }}>
                {taskListDetail.statusName}
              </Typography>
              <TaskList
                columnId={taskListDetail.statusId}
                // onCardDrop={onCardDrop}
                taskList={taskListDetail?.lstTaskDeTail}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
