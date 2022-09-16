import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { TableBody } from "@mui/material";
import VIewTableRow from "./VIewTableRow";

const useStyles = makeStyles({
  flexPaper: {
    flex: 1,
    margin: 16,
    minWidth: 350,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const ViewTable = ({ employeeData, setEmployeeData }) => {
  const classes = useStyles();
  const [collapsedUserIds, setCollapsedUserIds] = React.useState([]);
  const [flag, setFlag] = React.useState(true);

  const usersCollectionRef = collection(db, "employees");
  const getUsers = async () => {
    const userData = await getDocs(usersCollectionRef);
    const eData = userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setEmployeeData(eData);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleHierarchyClick = (item) => {
    const collIds = collapsedUserIds;

    if (collIds.includes(item.employeeId)) {
      const index = collIds.indexOf(item.employeeId);
      collIds.splice(index, 1);
    } else {
      collIds.push(item.employeeId);
    }
    setCollapsedUserIds(collIds);
    console.log(flag);
    setFlag(!flag);
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hierarchy</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Administrative Manager</TableCell>
              <TableCell>Functional Manager</TableCell>
              <TableCell>Squads</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((item, index) => (
              <VIewTableRow
                item={item}
                index={index}
                key={item.id}
                collapsedUserIds={collapsedUserIds}
                handleHierarchyClick={handleHierarchyClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewTable;
