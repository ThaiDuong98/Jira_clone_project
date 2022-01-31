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
  TableSortLabel,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { DeleteOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HeightIcon from "@mui/icons-material/Height";
import DialogFrame from "../../../components/Dialog";
import DialogConfirm from "../../../components/DialogConfirm";
import { deleteProject, filerProject, searchProject } from "../projectSlice";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";
import {
  updateProject,
  getUpdatedProject,
  clearUpdateProject,
} from "../projectSlice";
import { useNavigate, Link } from "react-router-dom";
import MembersList from "./MemberList";
import { useStyle } from "../../../assets/styles/useStyle";
import FilterProject from "./FilterProject";
import SearchProject from "./SearchProject";

function ProjectList({ projectListProp, onSubmitProjectForm, categories }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();
  const [projectList, setProjectList] = useState(projectListProp);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [openMemberList, setOpentMemberList] = useState(false);
  const [idProject, setIdProject] = useState(0);
  const [projectName, setProjectName] = useState();
  const [projectMember, setProjectMember] = useState(undefined);
  const [updatedProject, setUpdatedProject] = useState(undefined);
  const [orderSort, setOrderSort] = useState("Asc");
  const [searchProjectByText, setSearchProjectByText] = useState("");

  useEffect(() => {
    setProjectList(projectListProp);
  }, [projectListProp]);

  const handleClickOpenProjectDialog = () => {
    setOpenProjectDialog(true);
  };

  const handleCliclOpenMemberList = (project) => {
    setOpentMemberList(true);
    setProjectMember(project);
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
      setSearchProjectByText("");
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

  const handleSearch = (e) => {
    setSearchProjectByText(e.target.value);
    dispatch(searchProject(searchProjectByText));
  };

  const handleFilterProject = (e) => {
    dispatch(filerProject(e.target.value));
  };

  const handleSortProjectById = (col) => {
    if (orderSort === "Asc") {
      const sorted = [...projectList].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setProjectList(sorted);
      setOrderSort("Desc");
    }
    if (orderSort === "Desc") {
      const sorted = [...projectList].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setProjectList(sorted);
      setOrderSort("Asc");
    }
  };

  return (
    <Box>
      <Box>
        <CardHeader title="Project List"></CardHeader>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 600,
              height: 45,
              justifyContent: "space-between",
            }}
          >
            <SearchProject
              handleSearch={handleSearch}
              searchProjectByText={searchProjectByText}
            />
            <FilterProject
              categories={categories}
              handleFilterProject={handleFilterProject}
            />
          </Paper>

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
                <TableCell>
                  Id
                  <IconButton onClick={() => handleSortProjectById("id")}>
                    <HeightIcon />
                  </IconButton>
                </TableCell>
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
                        <TableCell>
                          <Link
                            to={`/project/${project.id}`}
                            className={classes.link}
                          >
                            {project.projectName}
                          </Link>
                        </TableCell>
                        <TableCell>{project.categoryName}</TableCell>
                        <TableCell>
                          <Chip label={project.creator.name} />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row">
                            {project.members.slice(0, 3).map((member) => (
                              <Tooltip title={member.name} key={member.userId}>
                                <Avatar
                                  alt="member image"
                                  src={member.avatar}
                                  sx={{ width: 32, height: 32, ml: 0.5 }}
                                />
                              </Tooltip>
                            ))}
                            {project.members.length > 3 && (
                              <Box
                                component="div"
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  backgroundColor: "#dfdfdf",
                                  ml: 0.5,
                                  lineHeight: "35px",
                                  fontSize: 10,
                                }}
                              >
                                +{project.members.length - 3}
                              </Box>
                            )}
                            <Tooltip title="Add members">
                              <ManageAccountsIcon
                                sx={{ width: 30, height: 30, ml: 0.5 }}
                                color="primary"
                                onClick={() =>
                                  handleCliclOpenMemberList(project)
                                }
                              />
                            </Tooltip>
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

        <DialogFrame
          setOpen={setOpentMemberList}
          open={openMemberList}
          title="Add member"
        >
          <MembersList projectMember={projectMember} />
        </DialogFrame>

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
