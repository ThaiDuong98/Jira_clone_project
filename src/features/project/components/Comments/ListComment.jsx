import {
  Avatar,
  Box,
  Button,
  Typography,
  Link,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DialogFrame from "../../../../components/Dialog";
import EditComment from "./EditComment";

const ListComment = ({
  listComment,
  handleDeleteComment,
  userInfo,
  handleUpdateComment,
}) => {
  const [openDialogEditComment, setOpenDialogEditComment] = useState(false);
  const [editContentComment, setEditContentComment] = useState({});
  const [commentId, setCommentId] = useState("");
  const onDeleteComment = (commentId) => {
    if (handleDeleteComment) {
      handleDeleteComment(commentId);
    }
  };

  const onEditComment = (comment) => {
    setOpenDialogEditComment(true);
    setEditContentComment(comment.contentComment);
    setCommentId(comment.id);
  };

  const onHandleEditComment = () => {
    if (handleUpdateComment) {
      handleUpdateComment(commentId, editContentComment);
      setOpenDialogEditComment(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {listComment?.map((comment) => (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
            <Avatar
              sx={{ height: 22, width: 22 }}
              src={comment.user.avatar}
              alt={comment.user.name}
            />
            <Typography sx={{ ml: 1, fontSize: "1rem", fontWeight: 500 }}>
              {comment.user.name}
            </Typography>
          </Box>

          <Box sx={{ ml: 3 }}>
            <Typography sx={{ ml: 1, fontSize: "1rem" }}>
              {comment.contentComment}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-start", ml: 2 }}>
              <Link
                variant="caption"
                sx={{ color: "#808080", textDecoration: "none" }}
                href="#"
                onClick={() => onEditComment(comment)}
              >
                Edit
              </Link>
              <Link
                variant="caption"
                sx={{ ml: 2, color: "#808080", textDecoration: "none" }}
                href="#"
                onClick={() => onDeleteComment(comment.id)}
              >
                Delete
              </Link>
            </Box>
          </Box>
        </Box>
      ))}
      <DialogFrame
        open={openDialogEditComment}
        setOpen={setOpenDialogEditComment}
        title="Edit comment"
      >
        <EditComment
          userInfo={userInfo}
          editContentComment={editContentComment}
          setEditContentComment={setEditContentComment}
          setOpenDialogEditComment={setOpenDialogEditComment}
          onHandleEditComment={onHandleEditComment}
        />
      </DialogFrame>
    </Box>
  );
};

export default ListComment;
