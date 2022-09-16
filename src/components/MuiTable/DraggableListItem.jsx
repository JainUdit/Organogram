import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import InboxIcon from "@mui/icons-material/Inbox";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
});

const DraggableListItem = ({ item, index }) => {
  const classes = useStyles();
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
            {item.name}
          </TableCell>
          <TableCell>{item.employeeId}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.designation}</TableCell>
          <TableCell>{item?.admin?.userLevel}</TableCell>
          <TableCell>{item?.admin?.managerName}</TableCell>
          <TableCell>{item?.functional?.managerName}</TableCell>
          <TableCell>{item.squad}</TableCell>
        </TableRow>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
