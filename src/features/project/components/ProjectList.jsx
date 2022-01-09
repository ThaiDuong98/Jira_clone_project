import {
  Box,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  FormHelperText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DeleteOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MembersDialog from "../components/MembersDialog";
import DialogFrame from "../../../components/Dialog";
import DialogConfirm from "../../../components/DialogConfirm";
import { deleteProject } from "../projectSlice";
import { typography } from "@mui/system";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";
import {
  updateProject,
  createProject,
  getUpdatedProject,
  clearUpdateProject,
} from "../projectSlice";
import { useNavigate } from "react-router-dom";

function ProjectList({ projectList, onSubmitProjectForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [idProject, setIdProject] = useState(0);
  const [projectName, setProjectName] = useState();
  const [updatedProject, setUpdatedProject] = useState(undefined);

  const handleClickOpenProjectDialog = () => {
    setOpenProjectDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickDeleteProject = (project) => {
    setIdProject(project.id);
    setProjectName(project.projectName);
    setOpenDialogConfirm(true);
  };

  const handleDeleteProject = () => {
    if (idProject) {
      dispatch(deleteProject(idProject));
      setIdProject(null);
      toast.success("Delete project successfully!");
    }
  };

  const handleClickEditProject = (project) => {
    setUpdatedProject(project);
    setOpenProjectDialog(true);
    dispatch(getUpdatedProject(project));
  };

  const onHandleCancel = () => {
    setTimeout(() => {
      setUpdatedProject(undefined);
      dispatch(clearUpdateProject(updateProject));
    }, 0);
  };

  return (
    <Box>
      <Box>
        <CardHeader title="Project List"></CardHeader>
        <Box sx={{ mb: 1 }}>
          <Button
            onClick={handleClickOpenProjectDialog}
            variant="contained"
            color="primary"
          >
            Add project
          </Button>
        </Box>
        <DialogFrame
          title={updatedProject ? "Update project" : "Add Project"}
          setOpen={setOpenProjectDialog}
          open={openProjectDialog}
          onHandleCancel={onHandleCancel}
          maxWidth="md"
        >
          <ProjectForm
            initialValue={updatedProject}
            onSubmitProjectForm={onSubmitProjectForm}
            setOpen={setOpenProjectDialog}
          />
        </DialogFrame>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList &&
                projectList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((project) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={project.id}
                      >
                        <TableCell>{project.id}</TableCell>
                        <TableCell>{project.projectName}</TableCell>
                        <TableCell>{project.categoryName}</TableCell>
                        <TableCell>{project.creator.name}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={2}>
                            {project.members.map((member) => (
                              <Tooltip title={member.name} key={member.userId}>
                                <Avatar
                                  alt="member image"
                                  src={member.avatar}
                                  sx={{ width: 24, height: 24 }}
                                />
                              </Tooltip>
                            ))}
                            <MembersDialog />
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => {
                                handleClickDeleteProject(project);
                              }}
                            >
                              <DeleteOutlined color="error" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleClickEditProject(project)}
                            >
                              <EditIcon color="info" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogConfirm
          open={openDialogConfirm}
          setOpen={setOpenDialogConfirm}
          onConfirm={handleDeleteProject}
          title="Confirm delete project"
        >
          Do you want to detele "{projectName}" project?
        </DialogConfirm>

        <TablePagination
          rowsPerPageOptions={[6, 20, 30]}
          component="div"
          count={projectList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ProjectList;
