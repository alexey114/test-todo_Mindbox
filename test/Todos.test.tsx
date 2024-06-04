import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Todos from "../src/components/Todos";

describe("Todos Component", () => {
  it("renders default tasks", () => {
    render(<Todos />);
    expect(screen.getByText("вынести мусор")).toBeInTheDocument();
    expect(screen.getByText("сделать ракету")).toBeInTheDocument();
    expect(screen.getByText("слетать в космос")).toBeInTheDocument();
  });

  it("adds a new task", () => {
    render(<Todos />);
    fireEvent.change(screen.getByLabelText("Введите новую задачу!"), {
      target: { value: "новая задача" },
    });
    fireEvent.click(screen.getByLabelText("add"));
    expect(screen.getByText("новая задача")).toBeInTheDocument();
  });

  it("toggles task completion", () => {
    render(<Todos />);
    const taskCheckbox = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
    expect(taskCheckbox).toBeChecked();
    fireEvent.click(taskCheckbox);
    expect(taskCheckbox).not.toBeChecked();
  });

  it("filters tasks", () => {
    render(<Todos />);
    fireEvent.click(screen.getByText("Активные"));
    expect(screen.queryByText("вынести мусор")).not.toBeInTheDocument();
    expect(screen.getByText("сделать ракету")).toBeInTheDocument();
    expect(screen.getByText("слетать в космос")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Выполненые"));
    expect(screen.getByText("вынести мусор")).toBeInTheDocument();
    expect(screen.queryByText("сделать ракету")).not.toBeInTheDocument();
    expect(screen.queryByText("слетать в космос")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Все"));
    expect(screen.getByText("вынести мусор")).toBeInTheDocument();
    expect(screen.getByText("сделать ракету")).toBeInTheDocument();
    expect(screen.getByText("слетать в космос")).toBeInTheDocument();
  });
});
