/// <reference types="vitest/globals" />

import { fireEvent, render, screen } from "@testing-library/react";
import CityFilter from "../components/CityFilter/CityFilter";

test("CityFilter calls onFilter with input value", () => {
  const onFilterMock = vi.fn();
  render(<CityFilter onFilter={onFilterMock} />);

  const input = screen.getByPlaceholderText(/Filter by city/i);
  fireEvent.change(input, { target: { value: "Berlin" } });

  expect(onFilterMock).toHaveBeenCalledWith("Berlin");
});
