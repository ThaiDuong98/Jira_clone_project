import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ name, control, label, names }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref } }) => (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            multiple
            value={value}
            inputRef={ref}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map(
                  (
                    value //value is a id of user (*)
                  ) => (
                    <Chip
                      key={value}
                      //base on names find value (id because it has been set id) === value (*)
                      label={names.find((name) => name.value === value)?.label}
                    />
                  )
                )}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name.id} value={name.value}>
                {name.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
