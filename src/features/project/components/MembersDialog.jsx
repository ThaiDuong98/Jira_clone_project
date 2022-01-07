import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InputField from "../../../components/CustomTextfield";

function MembersDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Add members">
        <ManageAccountsIcon color="primary" onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add members</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Search member"
            type="text"
            fullWidth
            variant="standard"
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id </TableCell>
                  <TableCell>name </TableCell>
                  <TableCell>phone </TableCell>
                  <TableCell>mail </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1 </TableCell>
                  <TableCell>Dương </TableCell>
                  <TableCell>123344 </TableCell>
                  <TableCell>duong@gmail.com </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MembersDialog;
