import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateOrderView from "./pages/CreateOrder/CreateOrder.view";
import CreateOrder from "./pages/CreateOrder";
import { getMenuItems } from "./services/menu";

jest.mock("./services/menu");

const menu = {
  items: [
    [
      { id: "101", value: "Weather Station" },
      { id: "102", value: "Water Level Monitoring" },
      { id: "103", value: "Track & Sense" },
    ],
    [
      { id: "203", value: "Battery Module" },
      { id: "201", value: "GPS Tracker" },
      { id: "202", value: "Water Depth Sensor" },
      { id: "206", value: "Bluetooth Module" },
      { id: "204", value: "RGB Lights" },
      { id: "205", value: "Self Cleaning Function" },
    ],
    [
      { id: "304", value: "Free Plan" },
      { id: "301", value: "Lite Plan" },
      { id: "303", value: "Standard Plan" },
      { id: "302", value: "Pro Plan" },
    ],
  ],
  rules: {
    // 'Weather Station' is NOT compatible with 'GPS Tracker', 'Water Depth Sensor', 'Bluetooth Module', 'Lite Plan'
    101: [201, 202, 206, 302],
    // 'Water Level Monitoring' is NOT compatible with 'GPS Tracker', 'Lite Plan',
    102: [201, 301],
    // 'Track & Sense' is NOT compatible with 'Water Depth Sensor',
    103: [202],
    // 'RGB Lights' is NOT compatible with 'Free Plan',
    204: [304],
    // 'Self Cleaning Function' is NOT compatible with 'Free Plan',
    205: [304],
  },
};

test("Renders all radio buttons", () => {
  render(<CreateOrderView items={menu.items} rules={menu.rules} />);
  const items = screen.getAllByTestId("radio-input-container");
  expect(items.length).toEqual(13);
});

test("Data is fetched properly", async () => {
  (getMenuItems as jest.Mock).mockReturnValue({ items: [], rules: {} });
  render(<CreateOrder />);
  await waitFor(() => {
    expect(getMenuItems as jest.Mock).toHaveBeenCalledTimes(1);
  });
});

test("Renders menu items properly", () => {
  render(<CreateOrderView items={menu.items} rules={menu.rules} />);
  const item1 = screen.getByText("Water Level Monitoring");
  expect(item1).toBeDefined();
  const item2 = screen.getByText("RGB Lights");
  expect(item2).toBeDefined();
  const item3 = screen.getByText("Pro Plan");
  expect(item3).toBeDefined();
});

test("Renders loading page", () => {
  render(<CreateOrderView items={[]} rules={{}} />);
  const item = screen.getByText("Loading...");
  expect(item).toBeDefined();
});

test("Rules are working [1]", () => {
  render(<CreateOrderView items={menu.items} rules={menu.rules} />);
  const target1 = screen.getByText("Water Level Monitoring");
  fireEvent.click(target1);
  const disabled10 = screen.getByLabelText("GPS Tracker");
  expect(disabled10).toBeDisabled();
  const disabled11 = screen.getByLabelText("Lite Plan");
  expect(disabled11).toBeDisabled();
  const target2 = screen.getByText("RGB Lights");
  fireEvent.click(target2);
  const disabled20 = screen.getByLabelText("Free Plan");
  expect(disabled20).toBeDisabled();
});

test("Rules are working [2]", () => {
  render(<CreateOrderView items={menu.items} rules={menu.rules} />);
  const target1 = screen.getByText("Weather Station");
  fireEvent.click(target1);
  const disabled10 = screen.getByLabelText("GPS Tracker");
  expect(disabled10).toBeDisabled();
  const disabled11 = screen.getByLabelText("Water Depth Sensor");
  expect(disabled11).toBeDisabled();
  const disabled12 = screen.getByLabelText("Pro Plan");
  expect(disabled12).toBeDisabled();

  const target2 = screen.getByText("RGB Lights");
  fireEvent.click(target2);
  const disabled20 = screen.getByLabelText("Free Plan");
  expect(disabled20).toBeDisabled();
});

