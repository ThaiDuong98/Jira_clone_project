import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const AddComment = ({ userInfo, hadleAddComment }) => {
  const [isAddComment, setAddComment] = useState(false);
  const [contentComment, setContentComment] = useState("");

  const onAddComment = () => {
    if (hadleAddComment) {
      hadleAddComment(contentComment);
      setAddComment(false);
      setContentComment("");
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
      <Avatar
        alt="member image"
        src={userInfo.avatar}
        sx={{ width: 28, height: 28 }}
      />
      {isAddComment ? (
        <Box>
          <TextField
            value={contentComment}
            type="text"
            size="small"
            autoFocus
            multiline
            sx={{ ml: 1, width: 500 }}
            onChange={(e) => setContentComment(e.target.value)}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-start", ml: 1, mt: 1 }}
          >
            <Button variant="contained" size="small" onClick={onAddComment}>
              Add
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => setAddComment(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <TextField
          type="text"
          placeholder="Add comment.."
          size="small"
          sx={{ ml: 1, width: 500 }}
          onClick={() => setAddComment(true)}
        />
      )}
    </Box>
  );
};

export default AddComment;
