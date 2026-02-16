/// <reference types="vitest" />
import { test, expect, vi } from "vitest";
import type { Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { fetchStations } from "../api/station";
import { useStations } from "../hooks/useStaions";
import StationsProvider from "../context/StationProvider";

vi.mock("../api/station", () => ({
  fetchStations: vi.fn(),
}));

test("useStations loads and filters correctly", async () => {
  (fetchStations as Mock).mockResolvedValue([
    { id: 1, name: "Berlin", city: "Berlin", lat: 1, lng: 1 },
  ]);
  const wrapper = (args: any) =>
    React.createElement(StationsProvider, null, args.children);

  const { result } = renderHook(() => useStations(), { wrapper });

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.filtered.length).toBe(1);

  result.current.filterByCity("Berl");
  expect(result.current.filtered.length).toBe(1);
});
