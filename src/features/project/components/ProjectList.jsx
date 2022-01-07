import {
  Box,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DeleteOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import MembersDialog from "../components/MembersDialog";

function ProjectList({ projectList }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <CardHeader title="Project List"></CardHeader>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList &&
                projectList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((project) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={project.id}
                      >
                        <TableCell>{project.id}</TableCell>
                        <TableCell>{project.projectName}</TableCell>
                        <TableCell>{project.categoryName}</TableCell>
                        <TableCell>{project.creator.name}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={2}>
                            {project.members.map((member) => (
                              <Tooltip title={member.name} key={member.userId}>
                                <Avatar
                                  alt="member image"
                                  src={member.avatar}
                                  sx={{ width: 24, height: 24 }}
                                />
                              </Tooltip>
                            ))}
                            <MembersDialog />
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton>
                              <DeleteOutlined color="error" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon color="info" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6, 20, 30]}
          component="div"
          count={projectList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ProjectList;
