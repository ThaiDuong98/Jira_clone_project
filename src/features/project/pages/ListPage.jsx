import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { getAllProject, updateProject, createProject } from "../projectSlice";
import ProjectList from "../components/ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectList, updatedProject } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  const onSubmitProjectForm = async (values) => {
    try {
      if (updatedProject) {
        const project = {
          ...values,
          id: updatedProject.id,
          creator: updatedProject.creator.id,
        };
        const respone = await dispatch(updateProject(project)).unwrap();
        toast.success("Update project successfull!");
        navigate("/project");
      } else {
        const respone = await dispatch(createProject(values)).unwrap();
        toast.success("Create project successfull!");
        navigate("/project");
      }
    } catch (error) {
      toast.error("fail!");
    }
  };

  return (
    <Box>
      <ProjectList
        projectList={projectList}
        onSubmitProjectForm={onSubmitProjectForm}
      />
    </Box>
  );
}

export default ListPage;
