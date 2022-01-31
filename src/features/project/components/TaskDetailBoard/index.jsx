import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DialogConfirm from "../../../../components/DialogConfirm";
import {
  getAllStatus,
  getAllTaskType,
  getPriorities,
  getProjectDetail,
} from "../../projectSlice";
import projectAPI from "../../../../apis/projectApi";
import { toast } from "react-toastify";
import TaskName from "./TaskName";
import TaskDescription from "./TaskDescription";
import TaskHeader from "./TaskHeader";
import HeaderButton from "./HeaderButton";
import TaskStatus from "./TaskStatus";
import Assignees from "./Assignees";
import TaskPriority from "./TaskPriority";
import OrigianalEstimate from "./OrigianalEstimate";
import TaskTimeManagement from "./TaskTimeManagement";
import Comments from "../Comments";

const TaskDetailBoard = ({
  task = {},
  setOpenDetailDialog,
  handleSetFullScreen,
}) => {
  const dispatch = useDispatch();
  const { listStatus, priorities, listTaskType, projectDetail } = useSelector(
    (state) => state.projects
  );
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);
  const [isEditTaskName, setEditTaskName] = useState(false);
  const [isEditDescription, setEditDescription] = useState(false);

  useEffect(() => {
    dispatch(getAllStatus());
    dispatch(getPriorities());
    dispatch(getAllTaskType());
    return () => dispatch(getProjectDetail(task.projectId));
  }, [dispatch]);

  const handleUpdateStatus = async (e) => {
    // console.log(e.target.value);
    try {
      const statusData = {
        taskId: task.taskId,
        statusId: e.target.value,
      };
      await projectAPI.updateTaskStatus(statusData);
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenDialogDeleteTask = () => {
    setOpenDeleteTaskDialog(true);
  };

  const handleRemoveTask = async () => {
    try {
      await projectAPI.removeTaskFromProject(task.taskId);
      toast.success("Delete task successfully!");
      setOpenDetailDialog(false);
      dispatch(getProjectDetail(task.projectId));
    } catch (error) {
      console.log(error);
      toast.error("You don't have permission to this project!");
    }
  };

  const handleRemoveUserFromtask = async (assignee) => {
    try {
      const assigneeData = {
        taskId: task.taskId,
        userId: assignee.id,
      };
      await projectAPI.removeUserFromTask(assigneeData);
      dispatch(getProjectDetail(task.projectId));
    } catch (error) {
      console.log(error);
      toast.error("You don't have permission to this project!");
    }
  };

  const handleUpdateTask = async (e) => {
    let { name, value } = e.target;
    // console.log({ name, value });
    const listUserAsign = task.assigness?.map((member) => member.id);
    if (name === "listUserAsign") {
      value = [...listUserAsign, value];
    }

    if (name === "originalEstimate") {
      if (value === "") {
        return;
      }
    }

    if (name === "timeTrackingSpent") {
      if (value === "") {
        return;
      }
    }

    if (name === "timeTrackingRemaining") {
      if (value === "") {
        return;
      }
    }

    const updatedTask = {
      listUserAsign,
      description: task.description,
      taskId: task.taskId,
      taskName: task.taskName,
      statusId: task.statusId,
      originalEstimate: task.originalEstimate,
      timeTrackingSpent: task.timeTrackingSpent,
      timeTrackingRemaining: task.timeTrackingRemaining,
      projectId: task.projectId,
      typeId: task.taskTypeDetail.id,
      priorityId: task.priorityTask.priorityId,
      [name]: value,
    };
    try {
      const respone = await projectAPI.updateTask(updatedTask);
      dispatch(getProjectDetail(task.projectId));
      setEditTaskName(false);
    } catch (error) {
      console.log(error);
      setEditTaskName(false);
      toast.error("You don't have permission to this project!");
    }
  };

  const handleEditDescription = async (description) => {
    if (task.description === description) {
      setEditDescription(false);
      return;
    }
    const updatedTask = {
      description,
      listUserAsign: task.assigness?.map((user) => user.id),
      taskId: task.taskId,
      taskName: task.taskName,
      statusId: task.statusId,
      originalEstimate: task.originalEstimate,
      timeTrackingSpent: task.timeTrackingSpent,
      timeTrackingRemaining: task.timeTrackingRemaining,
      projectId: task.projectId,
      typeId: task.taskTypeDetail.id,
      priorityId: task.priorityTask.priorityId,
    };
    try {
      const respone = await projectAPI.updateTask(updatedTask);
      dispatch(getProjectDetail(task.projectId));
      setEditDescription(false);
    } catch (error) {
      console.log(error);
      setEditDescription(false);
      toast.error("You don't have permission to this project!");
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={9}>
          <Grid item sx={12}>
            <TaskHeader task={task} />
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TaskName
                task={task}
                handleUpdateTask={handleUpdateTask}
                isEditTaskName={isEditTaskName}
                setEditTaskName={setEditTaskName}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TaskDescription
                task={task}
                isEditDescription={isEditDescription}
                setEditDescription={setEditDescription}
                handleEditDescription={handleEditDescription}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Comments task={task} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid item xs={12}>
            <HeaderButton
              handleSetFullScreen={handleSetFullScreen}
              onOpenDialogDeleteTask={onOpenDialogDeleteTask}
              setOpenDetailDialog={setOpenDetailDialog}
            />
          </Grid>
          <Grid item xs={12} sx={{ ml: 1, mt: 2 }}>
            <TaskStatus
              task={task}
              handleUpdateStatus={handleUpdateStatus}
              listStatus={listStatus}
            />
          </Grid>
          <Grid xs={12} sx={{ ml: 1, mt: 2 }}>
            <Assignees
              task={task}
              projectDetail={projectDetail}
              handleUpdateTask={handleUpdateTask}
              handleRemoveUserFromtask={handleRemoveUserFromtask}
            />
          </Grid>
          <Grid item xs={12} sx={{ ml: 1, mt: 2 }}>
            <TaskPriority
              task={task}
              handleUpdateTask={handleUpdateTask}
              priorities={priorities}
            />
          </Grid>
          <Grid item xs={12} sx={{ ml: 1, mt: 2 }}>
            <OrigianalEstimate
              task={task}
              handleUpdateTask={handleUpdateTask}
            />
          </Grid>
          <Grid item xs={12} sx={{ ml: 1, mt: 2 }}>
            <TaskTimeManagement
              task={task}
              handleUpdateTask={handleUpdateTask}
            />
          </Grid>
        </Grid>
      </Grid>
      <DialogConfirm
        open={openDeleteTaskDialog}
        setOpen={setOpenDeleteTaskDialog}
        title="Delete Task"
        onConfirm={handleRemoveTask}
        maxWidth="xs"
      >
        Do you want to delete this task?
      </DialogConfirm>
    </Box>
  );
};

export default TaskDetailBoard;
