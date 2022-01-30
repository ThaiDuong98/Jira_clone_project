import React from "react";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const Assignees = ({
  task,
  projectDetail,
  handleUpdateTask,
  handleRemoveUserFromtask,
}) => {
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "405" }}>
        ASSIGNEES
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {task.assigness.map((assignee) => (
          <Box
            key={assignee.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#E9EAF0",
              mr: 1,
              my: 1,
              padding: "0.1rem",
              height: "2.3em",
              borderRadius: 1,
            }}
          >
            <Avatar
              key={assignee?.id}
              src={assignee.avatar}
              alt={assignee.name}
              sx={{ width: 25, height: 25, ml: 1 }}
            />
            <Typography sx={{ ml: 1, fontSize: 15 }}>
              {assignee.name}
            </Typography>
            <IconButton onClick={() => handleRemoveUserFromtask(assignee)}>
              <ClearOutlinedIcon sx={{ width: 15, height: 15 }} />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box sx={{ my: 1, minWidth: 120 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Add assignees</InputLabel>
          <Select
            name="listUserAsign"
            value={""}
            label="Add assignees"
            onChange={handleUpdateTask}
          >
            {projectDetail.members
              .filter(
                (item) => !task.assigness.some((x) => x.id === item.userId)
              )
              .map((item) => (
                <MenuItem key={item.userId} value={item.userId}>
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{
                      width: 20,
                      height: 20,
                      mr: 1,
                      bgcolor: "blueviolet",
                    }}
                  />
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Assignees;
