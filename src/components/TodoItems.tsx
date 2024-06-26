import { TodoItem } from "./TodoItem"
import type { IItemsTodo } from "./Todos"

export interface IItemsProps {
  items: IItemsTodo[];
  check: (id: number) => void;
  deleteItem: (id: number) => void;
}

export default function TodoItems({ items, check, deleteItem }: IItemsProps) {
  return (
    <>
      {items.map((item) => (
        <TodoItem key={item.id} item={item} check={check} deleteItem={deleteItem}></TodoItem>
      ))}
    </>
  );
}
