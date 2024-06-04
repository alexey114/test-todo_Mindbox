import { TodoItem } from "./TodoItem";
import type { IItemsTodo } from "./Todos"

export interface IItemsProps {
  items: IItemsTodo[];
  check: (id: number) => void;
}

export default function TodoItems({ items, check }:IItemsProps) {
  console.log("items", items);

  return (
    <>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          check={check}
        ></TodoItem>
      ))}
    </>
  );
}
