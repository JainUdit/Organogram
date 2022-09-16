import { useCallback, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "../utils";
import { ITEMS } from "./data";
import TableRow from "./TableRow";
import "./index.css";

const SortableCont = SortableContainer(({ children }) => {
  return <tbody>{children}</tbody>;
});

const SortableItem = SortableElement((props) => <TableRow {...props} />);

export const Table = () => {
  const [items, setItems] = useState(ITEMS);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
  }, []);

  return (
    <div className="tableWrapper">
      <table className="table table-dark fixed_header">
        <thead>
          <tr>
            <th>First</th>
            <th>Second</th>
            <th>Third</th>
            <th>Forth</th>
          </tr>
        </thead>
        <SortableCont
          onSortEnd={onSortEnd}
          axis="y"
          lockAxis="y"
          lockToContainerEdges={true}
          lockOffset={["30%", "50%"]}
          helperClass="helperContainerClass"
          useDragHandle={true}
        >
          {items.map((value, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              first={value.first}
              second={value.second}
              third={value.third}
              fourth={value.fourth}
            />
          ))}
        </SortableCont>
      </table>
    </div>
  );
};
