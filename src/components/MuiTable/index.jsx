import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import DraggableList from "./DraggableList";
import { reorder } from "./helpers";

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

  const usersCollectionRef = collection(db, "employees");
  const getUsers = async () => {
    const userData = await getDocs(usersCollectionRef);
    setEmployeeData(
      userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  const updateUser = async (val,id) => {
    const userDoc = doc(db, "employees", id);
    // const newFields = {};
    // await updateDoc(userDoc, newFields);
  };

  const onDragEnd = ({ destination, source }) => {
    // dropped outside the list
    if (!destination) return;
    const newItems = reorder(employeeData, source.index, destination.index);
    setEmployeeData(newItems[0]);
    updateUser(newItems, newItems[1].id);
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <DraggableList items={employeeData} onDragEnd={onDragEnd} />
        </Table>
      </TableContainer>
    </div>
  );
};

export default MuiTable;
