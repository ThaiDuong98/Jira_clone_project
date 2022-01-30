import AlbumIcon from "@mui/icons-material/Album";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import DialogFrame from "../../../components/Dialog";
import TaskDetailBoard from "./TaskDetailBoard";
export default function TaskItem({ task = {} }) {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  const handleOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };

  const handleSetFullScreen = () => {
    setFullScreen(!isFullScreen);
  };

  return (
    <>
      <Box onClick={handleOpenDetailDialog}>
        <Paper sx={{ cursor: "pointer", margin: "5px", p: 1 }}>
          <Typography sx={{ my: 1 }}>{task.taskName}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              {task.priorityTask?.priorityId === 1 && (
                <Tooltip title="High" placement="right-start" arrow>
                  <ArrowUpwardIcon sx={{ color: "red" }} />
                </Tooltip>
              )}
              {task.priorityTask?.priorityId === 2 && (
                <Tooltip title="Medium" placement="right-start" arrow>
                  <DensityMediumIcon sx={{ color: "orange" }} />
                </Tooltip>
              )}
              {task.priorityTask?.priorityId === 3 && (
                <Tooltip title="Low" placement="right-start" arrow>
                  <ArrowDownwardIcon color="primary" />
                </Tooltip>
              )}
              {task.priorityTask?.priorityId === 4 && (
                <Tooltip title="Lowest" placement="right-start" arrow>
                  <ArrowDownwardIcon sx={{ color: "#39b139" }} />
                </Tooltip>
              )}
              {task.taskTypeDetail?.id === 1 && (
                <Tooltip title="Bug" placement="right-start" arrow>
                  <AlbumIcon sx={{ color: "#e30f0f" }} />
                </Tooltip>
              )}
              {task.taskTypeDetail?.id === 2 && (
                <Tooltip title="Task" placement="right-start" arrow>
                  <CheckBoxIcon sx={{ color: "#58a7f9" }} />
                </Tooltip>
              )}
            </Box>
            <Box>
              <Box classes="avatar-group" sx={{ display: "flex" }}>
                {task.assigness?.slice(0, 3).map((assignee) => (
                  <Tooltip key={assignee.id} title={assignee.name}>
                    <Box
                      component="img"
                      src={assignee.avatar}
                      alt={assignee.name}
                      height="25px"
                      sx={{ borderRadius: "50%", margin: "0 3px" }}
                    />
                  </Tooltip>
                ))}
                {task.assigness?.length > 3 ? (
                  <Box
                    component="div"
                    sx={{
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#dfdfdf",
                      lineHeight: "20px",
                      fontSize: 10,
                    }}
                  >
                    +{task.assigness?.length - 3}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <DialogFrame
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        showTitle={false}
        maxWidth="lg"
        isFullScreen={isFullScreen}
      >
        <TaskDetailBoard
          task={task}
          setOpenDetailDialog={setOpenDetailDialog}
          handleSetFullScreen={handleSetFullScreen}
        />
      </DialogFrame>
    </>
  );
}
