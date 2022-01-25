import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function FilterProject({ categories, handleFilterProject }) {
  return (
    <FormControl sx={{ m: 1, width: 150 }} size="small">
      <InputLabel>Category</InputLabel>
      <Select label="Category" onChange={handleFilterProject}>
        {categories &&
          categories.map((category) => (
            <MenuItem value={category.id} key={category.id}>
              {category.projectCategoryName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default FilterProject;
