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
import DialogFrame from "../../../components/Dialog";

function MembersDialog() {
  const [openMemberDialog, setOpenMemberDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenMemberDialog(true);
  };

  const handleCloseOpen = () => {
    setOpenMemberDialog(false);
  };

  return (
    <div>
      <Tooltip title="Add members">
        <ManageAccountsIcon color="primary" onClick={handleClickOpen} />
      </Tooltip>
      <DialogFrame
        title="Add members"
        setOpen={setOpenMemberDialog}
        open={openMemberDialog}
      >
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

        <DialogActions>
          <Button onClick={handleCloseOpen}>Cancel</Button>
          <Button>OK</Button>
        </DialogActions>
      </DialogFrame>
    </div>
  );
}

export default MembersDialog;
