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
import DraggableList from "./DraggableList";
import { reorder } from "./helpers";
import { ITEMS } from "../Table/data";

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

const MuiTable = ({ employeeData, setEmployeeData }) => {
  const classes = useStyles();
  const [items, setItems] = React.useState(employeeData);

  const usersCollectionRef = collection(db, "employees");
  const getUsers = async () => {
    const userData = await getDocs(usersCollectionRef);
    setEmployeeData(
      userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setItems(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(
      ">>>>>userData",
      userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
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
          <DraggableList items={items} onDragEnd={onDragEnd} />
        </Table>
      </TableContainer>
    </div>
  );
};

export default MuiTable;
