import { useState } from "react";
import TodoItems from "./TodoItems";
import TextField from "@mui/material/TextField";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";

export interface IItemsTodo {
  id: number;
  name: string;
  completed: boolean;
}

const ITEMS_DEFAULT = [
  {
    id: 1,
    name: "вынести мусор",
    completed: true,
  },
  {
    id: 2,
    name: "сделать ракету",
    completed: false,
  },
  {
    id: 3,
    name: "слетать в космос",
    completed: false,
  },
];

export default function Todos() {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<IItemsTodo[]>(ITEMS_DEFAULT);
  const [currentItems, setCurrentItems] = useState<IItemsTodo[]>([]);
  const [isAllTasks, setIsAllTasks] = useState(true);

  function addItem() {
    if (inputValue === "") {
      console.log("заполните поле");
      return;
    }
    setItems([
      ...items,
      { id: items.length + 1, name: inputValue, completed: false },
    ]);
  }

  const check = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  function isFilterCompletedTasks(arg: boolean, argAll: boolean) {
    if (argAll) {
      isAllTasksVisible(argAll);
    }
    setCurrentItems(items.filter((element) => element.completed === arg));
    isAllTasksVisible(argAll);
    console.log("currentItems", currentItems);
    console.log("arg", arg);
  }

  function isAllTasksVisible(visible: boolean) {
    setIsAllTasks(visible);
  }

  const outstanding = () => {
    //?? мемоизировать некоторые значения, а то отрисовка console.log("items", items) идёт 4 раза
    let res = 0;

    items.forEach((element) => {
      if (element.completed === false) {
        res++;
      }
    });
    // return setOutstandingTasks(res);
    return res;
  };

  outstanding();

  console.log("items", items);

  return (
    <div style={{border: "1px solid #000", borderRadius: 20, padding: 30, backgroundColor: "#fff", boxShadow: "10px 5px 5px black"}}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <TextField
          variant="outlined"
          label="Введите новую задачу!"
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          style={{width: "100%"}}
        />
        <AddTaskSharpIcon onClick={addItem} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", margin: 20 }}>
        <div>
          {outstanding()
            ? `${outstanding()} невыполнена(ы)`
            : "Все задачи выполнены!"}{" "}
        </div>
        <button onClick={() => isFilterCompletedTasks(false, true)}>Все</button>
        <button onClick={() => isFilterCompletedTasks(false, false)}>
          Активные
        </button>
        <button onClick={() => isFilterCompletedTasks(true, false)}>
          Выполненые
        </button>
      </div>
      <TodoItems items={isAllTasks ? items : currentItems} check={check} />
    </div>
  );
}
