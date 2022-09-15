import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const ColorToggleButton = ({ alignment, handleChange }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Administrative">Administrative</ToggleButton>
      <ToggleButton value="Functional">Functional</ToggleButton>
    </ToggleButtonGroup>
  );
};
