import AddIcon from "@mui/icons-material/Add";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import React from "react";
import DialogFrame from "../../../components/Dialog";
import TaskForm from "./TaskForm";
import {
  getAllProject,
  getAllStatus,
  getAllTaskType,
  getPriorities,
} from "../projectSlice";
import ErrorAddTask from "./ErrorAddTask";
import { toast } from "react-toastify";
import projectAPI from "../../../apis/projectApi";
import DialogConfirm from "../../../components/DialogConfirm";
import { processLogout } from "../../auth/userSlice";

export default function NavBarLeft() {
  const [openTaskFrom, setOpenTaskForm] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const curentUser = useSelector((state) => state.user.userInfo);
  const [myProjects, setMyProjects] = useState([]);
  const { projectList, listStatus, priorities, listTaskType } = useSelector(
    (state) => state.projects
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    projectId: 0,
    taskName: "",
    statusId: 0,
    priorityId: 0,
    typeId: 0,
    description: "",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    listUserAsign: [],
  });

  const handleOpenTaskFrom = () => {
    setOpenTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setOpenTaskForm(false);
  };

  useEffect(() => {
    //1.1 get all project
    dispatch(getAllProject);
    //1.2 get All status
    dispatch(getAllStatus());
    //1.3 get All priority
    dispatch(getPriorities());
    //1.4 get all task type
    dispatch(getAllTaskType());
  }, [dispatch]);

  //2.From all prjoject, fillter get my projects
  useEffect(() => {
    setMyProjects(() => {
      return projectList.filter(
        (project) => project.creator.id === curentUser.id
      );
    });
  }, [projectList, curentUser]);

  //initiall default data such as status, priority, task type
  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      priorityId: priorities[0]?.priorityId,
      statusId: listStatus[0]?.statusId,
      typeId: listTaskType[0]?.id,
      projectId: myProjects[0]?.id,
    }));
  }, [listStatus, priorities, listTaskType, myProjects]);

  const onSubmitTaskForm = async (values) => {
    try {
      const respone = await projectAPI.createTask(values);
      toast.success("Create task successfully!");
      setOpenTaskForm(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail to create task");
    }
  };

  const onOpenLogoutDialogConfirm = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogout = () => {
    dispatch(processLogout());
    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        width: "64px",
        height: "100vh",
        backgroundColor: "#0747A6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "& > div": {
          display: "flex",
          flexDirection: "column",
          "& > button": {
            color: "#fff",
          },
        },
      }}
    >
      <Box>
        <Tooltip title="Not implemented" placement="right-end" arrow>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create issue" placement="right-end" arrow>
          <IconButton onClick={handleOpenTaskFrom}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Not implemented" placement="right-end" arrow>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Log out" placement="right-end" arrow>
          <IconButton onClick={onOpenLogoutDialogConfirm}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <Tooltip title="About" placement="right-start" arrow>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <DialogFrame
        open={openTaskFrom}
        setOpen={setOpenTaskForm}
        title="Add task"
        maxWidth="md"
      >
        {myProjects.length > 0 ? (
          <TaskForm
            myProjects={myProjects}
            onCloseDialog={handleCloseTaskForm}
            listStatus={listStatus}
            priorities={priorities}
            listTaskType={listTaskType}
            initialValues={task}
            onSubmitTaskForm={onSubmitTaskForm}
          />
        ) : (
          <ErrorAddTask onCloseDialog={handleCloseTaskForm} />
        )}
      </DialogFrame>

      <DialogConfirm
        title="Confirm"
        setOpen={setOpenLogoutDialog}
        open={openLogoutDialog}
        onConfirm={handleLogout}
      >
        Do you want to logout?
      </DialogConfirm>
    </Box>
  );
}
