import * as React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
  collapse: {
    visibility: "collapse",
  },
});

const VIewTableRow = ({ item, collapsedUserIds, handleHierarchyClick }) => {
  const classes = useStyles();

  return (
    <TableRow
      className={`${classes.draggingListItem} ${
        collapsedUserIds.includes(item?.admin?.managerId)
          ? classes.collapse
          : ""
      }`}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Button variant="text" onClick={() => handleHierarchyClick(item)}>
          {item?.name}
        </Button>
      </TableCell>
      <TableCell>{item?.employeeId}</TableCell>
      <TableCell>{item?.name}</TableCell>
      <TableCell>{item?.designation}</TableCell>
      <TableCell>{item?.admin?.userLevel}</TableCell>
      <TableCell>{item?.admin?.managerName}</TableCell>
      <TableCell>{item?.functional?.managerName}</TableCell>
      <TableCell>{item?.squad}</TableCell>
    </TableRow>
  );
};

export default VIewTableRow;
