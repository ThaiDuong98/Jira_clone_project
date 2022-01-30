import React from "react";
import { Box, Avatar, TextField, Button } from "@mui/material";

const EditComment = ({
  userInfo,
  editContentComment,
  setEditContentComment,
  setOpenDialogEditComment,
  onHandleEditComment,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Avatar
        alt="member image"
        src={userInfo.avatar}
        sx={{ width: 28, height: 28 }}
      />
      <Box>
        <TextField
          value={editContentComment}
          type="text"
          size="small"
          multiline
          autoFocus
          sx={{ ml: 1, width: 500 }}
          onChange={(e) => setEditContentComment(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", ml: 1, mt: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={onHandleEditComment}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => setOpenDialogEditComment(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditComment;
