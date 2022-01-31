import React from "react";
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
  Button,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function SearchProject({ handleSearch, searchProjectByText }) {
  return (
    <Box>
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search project"
        value={searchProjectByText}
        inputProps={{ "aria-label": "search project" }}
        onChange={handleSearch}
      />
    </Box>
  );
}

export default SearchProject;
