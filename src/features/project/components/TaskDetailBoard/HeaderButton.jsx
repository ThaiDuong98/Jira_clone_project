import React from "react";
import { Box, Tooltip, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const HeaderButton = ({
  handleSetFullScreen,
  onOpenDialogDeleteTask,
  setOpenDetailDialog,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Tooltip title="Not implemented" followCursor>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": { backgroundColor: "#f4f5f7" },
            p: 1,
          }}
        >
          <SendOutlinedIcon sx={{ fontSize: "1rem" }} />
          <Typography sx={{ mx: 1 }}>Give Feedback</Typography>
        </Box>
      </Tooltip>
      <IconButton onClick={onOpenDialogDeleteTask}>
        <DeleteOutlineIcon />
      </IconButton>
      <IconButton onClick={handleSetFullScreen}>
        <OpenWithOutlinedIcon />
      </IconButton>
      <IconButton onClick={() => setOpenDetailDialog(false)}>
        <CloseOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default HeaderButton;
