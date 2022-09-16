import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ColorToggleButton } from "./ToggleButton";
import AddNewEmployee from "./AddNewEmployee/AddNewEmployee";

export const Header = ({
  employeeData,
  setEmployeeData,
  alignment,
  setAlignment,
  viewEditableTable,
  setViewEditableTable,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleEditClick = () => {
    setViewEditableTable(!viewEditableTable);
  };
  const handleAddNewEmployee = () => {
    setOpen(true);
  };

  return (
    <>
      <AddNewEmployee
        open={open}
        close={() => setOpen()}
        employeeData={employeeData}
        setEmployeeData={setEmployeeData}
      />
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        className="Header"
      >
        <ColorToggleButton alignment={alignment} handleChange={handleToggle} />
        <p>CET ORGANOGRAM</p>
        <Button variant="contained" onClick={handleEditClick}>
          {viewEditableTable ? "View Table" : "Edit Table"}
        </Button>
        <Button variant="contained" onClick={handleAddNewEmployee}>
          Add New Employee
        </Button>
      </Grid>
    </>
  );
};
