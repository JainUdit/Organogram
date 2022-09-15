import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ColorToggleButton } from "./ToggleButton";

export const Header = () => {
  const [alignment, setAlignment] = React.useState("web");

  const handleToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleEditClick = () => {};

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      className="Header"
    >
      <ColorToggleButton alignment={alignment} handleChange={handleToggle} />
      <p>CET Organogram</p>
      <Button variant="contained" onClick={handleEditClick}>
        Edit
      </Button>
    </Grid>
  );
};
