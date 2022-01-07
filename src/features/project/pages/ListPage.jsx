import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAllProject } from "../projectSlice";
import ProjectList from "../components/ProjectList";

function ListPage() {
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  return (
    <Box>
      <ProjectList projectList={projectList} />
    </Box>
  );
}

export default ListPage;
