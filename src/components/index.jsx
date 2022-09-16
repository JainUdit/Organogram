import * as React from "react";
import { Header } from "./Header";
import MuiTable from "./MuiTable";
import ViewTable from "./ViewTable";
// import { Table } from "./Table";

export const Main = () => {
  const [employeeData, setEmployeeData] = React.useState([]);
  const [alignment, setAlignment] = React.useState("Administrative");
  const [viewEditableTable, setViewEditableTable] = React.useState(false);

  return (
    <>
      <Header
        employeeData={employeeData}
        setEmployeeData={setEmployeeData}
        alignment={alignment}
        setAlignment={setAlignment}
        viewEditableTable={viewEditableTable}
        setViewEditableTable={setViewEditableTable}
      />
      {/* <Table /> */}
      {/* { alignment === "Administrative" } */}
      {viewEditableTable ? (
        <MuiTable
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
        />
      ) : (
        <ViewTable
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
        />
      )}
    </>
  );
};
