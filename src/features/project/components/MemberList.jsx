import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import userApi from "../../../apis/userApi";
import { toast } from "react-toastify";
import DialogConfirm from "../../../components/DialogConfirm";
import { getAllProject } from "../projectSlice";

function MembersList(props) {
  const { projectMember } = props;
  const dispatch = useDispatch();
  const [members, setMembers] = useState(projectMember.members);
  const [userList, setUserList] = useState(undefined);
  const [deleteId, setDeleteId] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const respone = await userApi.getUsers();
        setUserList(respone.data?.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteUserFromProject = async () => {
    try {
      if (deleteId) {
        const respone = await userApi.deleteUserFromProject({
          projectId: projectMember.id,
          userId: deleteId,
        });
        dispatch(getAllProject());
        setMembers((prev) => {
          const newMembers = [...prev];
          const removeMember = newMembers.filter(
            (member) => member.userId !== deleteId
          );
          return removeMember;
        });
        toast.success(respone.data.content);
      }
    } catch (error) {
      console.log(error);
      toast.error("You do not have permission to delete users in this project");
    }
  };

  const handleAssignUserToProject = async (e, value) => {
    try {
      const respone = await userApi.assignUserToProject({
        projectId: projectMember.id,
        userId: value.userId,
      });
      setMembers((prevUserList) => {
        const newUser = userList.find((user) => user.userId === value.userId);
        return [...prevUserList, newUser];
      });
      dispatch(getAllProject());
      toast.success(respone.data.content);
    } catch (error) {
      toast.error("Fail to assign user!");
    }
  };

  return (
    <div>
      {userList && (
        <Autocomplete
          size="small"
          freeSolo
          options={userList}
          getOptionLabel={(user) => (user.userId ? user.name : user)}
          onChange={handleAssignUserToProject}
          // options={userList.map((user) => ({
          //   label: user.name,
          //   userId: user.userId,
          // }))}
          renderInput={(params) => (
            <TextField {...params} label="Search member" />
          )}
        />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id </TableCell>
              <TableCell>Name </TableCell>
              <TableCell>Avatar </TableCell>
              <TableCell>Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((members) => (
              <TableRow key={members.userId}>
                <TableCell>{members.userId}</TableCell>
                <TableCell>{members.name} </TableCell>
                <TableCell>
                  <Tooltip title={members.name}>
                    <Avatar
                      src={members.avatar}
                      alt="member image"
                      sx={{ width: 30, height: 30 }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickDelete(members.userId)}>
                    <DeleteOutlined color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogConfirm
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title="Confirm remove user from project"
        onConfirm={handleDeleteUserFromProject}
        maxWidth="xs"
      >
        Do you want to remove this user?
      </DialogConfirm>
    </div>
  );
}

export default MembersList;
