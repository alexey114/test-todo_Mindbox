import Checkbox from "@mui/material/Checkbox";
import { IItemsTodo } from "./Todos";

export interface IItemProps {
  item: IItemsTodo;
  check: (id: number) => void;
}

export const TodoItem = ({ item, check }: IItemProps) => {
  return (
    <>
      <div style={{display: "flex", alignItems: "center"}}>
        <Checkbox
          checked={item.completed}
          id={item.id.toString()}
          onChange={() => check(item.id)}
          inputProps={{ "aria-label": "controlled" }}
        ></Checkbox>
        <div
          style={{ textDecoration: item.completed ? "line-through" : "none", opacity: item.completed ? 0.6 : 1 }}
          key={item.id}
        >
          {item.name}
        </div>
      </div>
    </>
  );
};
