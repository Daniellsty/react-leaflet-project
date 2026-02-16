/// <reference types="vitest/globals" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import App from "../App";
import * as useStationsHook from "../hooks/useStaions";

const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 51.5, lng: 13.4 },
  { id: 2, name: "Munich Hbf", city: "Munich", lat: 48.1, lng: 11.6 },
];

vitest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
}));

describe("App component tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders loader initially", () => {
    vi.spyOn(useStationsHook, "useStations").mockReturnValue({
      stations: [],
      filtered: [],
      loading: true,
      error: null,
      filterByCity: () => {},
    });

    render(<App />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders error when fetch fails", () => {
    vi.spyOn(useStationsHook, "useStations").mockReturnValue({
      stations: [],
      filtered: [],
      loading: false,
      error: new Error("fetch failed"),
      filterByCity: () => {},
    });

    render(<App />);
    expect(screen.getByText(/fetch failed/i)).toBeInTheDocument();
  });

  test("renders MapView with stations", () => {
    vi.spyOn(useStationsHook, "useStations").mockReturnValue({
      stations: mockStations,
      filtered: mockStations,
      loading: false,
      error: null,
      filterByCity: () => {},
    });

    render(<App />);

    expect(screen.getByText(/Berlin Hbf/i)).toBeInTheDocument();
    expect(screen.getByText(/Munich Hbf/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("marker")).toHaveLength(2);
  });

  test("calls filterByCity when typing in CityFilter", async () => {
    const filterByCityMock = vi.fn();
    vi.spyOn(useStationsHook, "useStations").mockReturnValue({
      stations: mockStations,
      filtered: mockStations,
      loading: false,
      error: null,
      filterByCity: filterByCityMock,
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/filter by city/i);
    await userEvent.type(input, "Berlin");

    expect(filterByCityMock).toHaveBeenCalledWith("Berlin");
  });
});
