import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function InputField({ name, control, errors, ...otherProps }) {
  const configTextfield = {
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    helperText: "",
    helperText: errors,
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField {...field} {...configTextfield} />}
    />
  );
}

export default InputField;
