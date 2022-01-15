import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllProject,
  updateProject,
  createProject,
  getAllCategory,
} from "../projectSlice";
import ProjectList from "../components/ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    projectList,
    updatedProject,
    searchProject,
    categories,
    filerProject,
  } = useSelector((state) => state.projects);
  const [customCategories, setCustomCategories] = useState([]);
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    setCustomCategories(() => {
      const newCategories = [
        ...categories,
        { id: 0, projectCategoryName: "All" },
      ];
      return newCategories;
    });
  }, [categories]);

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

  const searchProjectResult = projectList.filter((project) => {
    if (filerProject) {
      return (
        project.projectName
          .toLowerCase()
          .includes(searchProject.toLowerCase()) &&
        project.categoryId.toString().includes(filerProject)
      );
    }
    return project.projectName
      .toLowerCase()
      .includes(searchProject.toLowerCase());
  });

  return (
    <Box>
      <ProjectList
        projectListProp={searchProjectResult}
        onSubmitProjectForm={onSubmitProjectForm}
        categories={customCategories}
      />
    </Box>
  );
}

export default ListPage;
