import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function DialogFrame({
  children,
  title,
  setOpen,
  open,
  maxWidth = "sm",
  showTitle = true,
  ...otherPropst
}) {
  const { onHandleCancel, isFullScreen = false } = otherPropst;
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        if (onHandleCancel) {
          onHandleCancel();
        }
      }}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={isFullScreen}
    >
      {showTitle && (
        <Box>
          <DialogTitle>{title}</DialogTitle>
          <Box position="absolute" top={0} right={0}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default DialogFrame;
