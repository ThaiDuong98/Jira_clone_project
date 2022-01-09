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

function DialogConfirm({ children, title, setOpen, open, onConfirm }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          No
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirm;
