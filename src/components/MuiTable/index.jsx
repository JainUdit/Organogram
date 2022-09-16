import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

const MuiTable = () => {
  const classes = useStyles();
  const [items, setItems] = React.useState(ITEMS);

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
              <TableCell>Employee Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Designation</TableCell>
              <TableCell align="right">Level</TableCell>
            </TableRow>
          </TableHead>
          <DraggableList items={items} onDragEnd={onDragEnd} />
        </Table>
      </TableContainer>

      {/* <Paper className={classes.flexPaper}>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </Paper> */}
    </div>
  );
};

export default MuiTable;
