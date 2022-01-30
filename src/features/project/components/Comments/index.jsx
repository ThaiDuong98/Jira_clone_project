import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddComment from "./AddComment";
import ListComment from "./ListComment";
import { toast } from "react-toastify";
import projectAPI from "../../../../apis/projectApi";
import { getProjectDetail } from "../../projectSlice";

const Comments = ({ task }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [listComment, setListComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const respone = await projectAPI.getListComment(task.taskId);
      setListComment(respone.data.content);
    })();
  }, [task]);

  const hadleAddComment = async (contentComment) => {
    const comment = {
      taskId: task.taskId,
      contentComment: contentComment,
    };
    try {
      const respone = await projectAPI.addComment(comment);
      dispatch(getProjectDetail(task.projectId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const respone = await projectAPI.deleteComment(commentId);
      dispatch(getProjectDetail(task.projectId));
    } catch (error) {
      console.log(error);
      toast.error("You do not have permission to this comment!");
    }
  };

  const handleUpdateComment = async (commentId, editContentComment) => {
    try {
      const respone = await projectAPI.editComment(
        commentId,
        editContentComment
      );
      dispatch(getProjectDetail(task.projectId));
    } catch (error) {
      console.log(error);
      toast.error("You do not have permission to this comment!");
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        Comments
      </Typography>
      <AddComment
        userInfo={userInfo}
        listComment={listComment}
        hadleAddComment={hadleAddComment}
      />
      <ListComment
        listComment={listComment}
        handleDeleteComment={handleDeleteComment}
        userInfo={userInfo}
        handleUpdateComment={handleUpdateComment}
      />
    </Box>
  );
};

export default Comments;
