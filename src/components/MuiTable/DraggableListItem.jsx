import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { db } from "../../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
});
const DraggableListItem = ({ item, index }) => {
  const classes = useStyles();
  const deleteUser = async (id) => {
    const userDoc = doc(db, "employees", id);
    await deleteDoc(userDoc);
    window.location.reload();
  };
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ""}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {item?.name}
          </TableCell>
          <TableCell>{item?.employeeId}</TableCell>
          <TableCell>{item?.name}</TableCell>
          <TableCell>{item?.designation}</TableCell>
          <TableCell>{item?.admin?.userLevel}</TableCell>
          <TableCell>{item?.admin?.managerName}</TableCell>
          <TableCell>{item?.functional?.managerName}</TableCell>
          <TableCell>{item?.squad}</TableCell>
          <TableCell>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => {
                deleteUser(item?.id);
              }}
            >
              Delete
            </Button>{" "}
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
