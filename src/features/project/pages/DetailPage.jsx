import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getProjectDetail } from "../projectSlice";
import ProjectDetailHeader from "../components/ProjectDetailHeader";
import ProjectDetailDesc from "../components/ProjectDetailDesc";
import ProjectDetailBoard from "../components/ProjectDetailBoard";

export default function DetailPage() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { projectDetail } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, [dispatch]);

  return (
    <Box sx={{ paddingLeft: "2%" }}>
      <ProjectDetailHeader project={projectDetail} />
      <ProjectDetailDesc project={projectDetail} />
      <ProjectDetailBoard
        members={projectDetail?.members}
        taskList={projectDetail?.lstTask}
      />
      {/* <BackdropProgress isOpen={!projectDetail} /> */}
    </Box>
  );
}
