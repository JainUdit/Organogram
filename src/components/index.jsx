import * as React from "react";
import { Header } from "./Header";
import MuiTable from "./MuiTable";
// import { Table } from "./Table";

export const Main = () => {
  const [employeeData, setEmployeeData] = React.useState([]);

  return (
    <>
      <Header employeeData={employeeData} setEmployeeData={setEmployeeData} />
      {/* <Table /> */}
      <MuiTable employeeData={employeeData} setEmployeeData={setEmployeeData} />
    </>
  );
};
