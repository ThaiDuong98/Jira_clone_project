import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

function SelectField({ name, label, control, options, ...otherProps }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select fullWidth label={label} {...field} {...otherProps}>
            {options &&
              options.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default SelectField;
