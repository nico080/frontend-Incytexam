import { Items, Rules } from "../types/Menu";

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

export type GetMenuItemsResponse = { items: Items; rules: Rules };
export const getMenuItems = (): Promise<GetMenuItemsResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menu);
    }, 3000);
  });
};
