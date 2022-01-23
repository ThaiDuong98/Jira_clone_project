import React from "react";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  return (
    <Box sx={{ paddingLeft: "2%" }}>
      <ProjectDetailHeader project={projectDetail} />
      <ProjectDetailDesc project={projectDetail} />
      <ProjectDetailBoard
        members={projectDetail?.members}
        taskList={projectDetail?.lstTask}
      />
      <BackdropProgress isOpen={!projectDetail} />
    </Box>
  );
}
