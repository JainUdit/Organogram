import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import "./index.css";

const RowHandler = SortableHandle(() => <div className="handle">|</div>);

const TableRow = ({ first, second, third, fourth, className }) => {
  return (
    <tr className={className}>
      <td>
        <div className="firstElement">
          <RowHandler />
          {first}
        </div>
      </td>
      <td>{second}</td>
      <td>{third}</td>
      <td>{fourth}</td>
    </tr>
  );
};

export default TableRow;
