import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoItem } from "../components/TodoItem";
import { IItemsTodo } from "../components/Todos";

describe("TodoItem Component", () => {
  const mockCheck = vi.fn();

  const renderComponent = (itemProps: IItemsTodo) => {
    render(<TodoItem item={itemProps} check={mockCheck} />);
  };

  it("renders a task", () => {
    const item: IItemsTodo = {
      id: 1,
      name: "Test Task",
      completed: false,
    };

    renderComponent(item);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("calls check function on checkbox click", () => {
    const item: IItemsTodo = {
      id: 1,
      name: "Test Task",
      completed: false,
    };

    renderComponent(item);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(mockCheck).toHaveBeenCalledWith(item.id);
  });
});
