const machines = [
  { id: 1, area: "Area 1", lastFailure: "2025-06-12" },
  { id: 2, area: "Area 1", lastFailure: "2025-06-14" },
  { id: 3, area: "Area 2", lastFailure: "2025-06-16" },
  { id: 4, area: "Area 2", lastFailure: "2025-06-18" },
  { id: 5, area: "Area 1", lastFailure: "2025-06-20" },
  { id: 6, area: "Area 2", lastFailure: "2025-06-22" },
];

const sensorHealthData = [
  {
    id: 1,
    machine: "Machine 1",
    area: "Area 1",
    sensors: [
      { name: "Sensor 1", value: 90, health: 94.52 },
      { name: "Sensor 2", value: 60, health: 62.17 },
      { name: "Sensor 3", value: 30, health: 92.01 },
      { name: "Sensor 4", value: 40, health: 24.97 },
    ],
  },
  {
    id: 2,
    machine: "Machine 2",
    area: "Area 1",
    sensors: [
      { name: "Sensor 1", value: 85, health: 88.45 },
      { name: "Sensor 2", value: 45, health: 56.22 },
      { name: "Sensor 3", value: 60, health: 70.01 },
      { name: "Sensor 4", value: 35, health: 30.33 },
    ],
  },
  {
    id: 3,
    machine: "Machine 3",
    area: "Area 2",
    sensors: [
      { name: "Sensor 1", value: 70, health: 81.23 },
      { name: "Sensor 2", value: 50, health: 68.77 },
      { name: "Sensor 3", value: 60, health: 75.01 },
      { name: "Sensor 4", value: 40, health: 42.33 },
    ],
  },
  {
    id: 4,
    machine: "Machine 4",
    area: "Area 2",
    sensors: [
      { name: "Sensor 1", value: 95, health: 92.45 },
      { name: "Sensor 2", value: 60, health: 66.22 },
      { name: "Sensor 3", value: 55, health: 58.01 },
      { name: "Sensor 4", value: 38, health: 40.33 },
    ],
  },
  {
    id: 5,
    machine: "Machine 5",
    area: "Area 1",
    sensors: [
      { name: "Sensor 1", value: 82, health: 86.32 },
      { name: "Sensor 2", value: 40, health: 50.12 },
      { name: "Sensor 3", value: 45, health: 62.88 },
      { name: "Sensor 4", value: 50, health: 51.21 },
    ],
  },
  {
    id: 6,
    machine: "Machine 6",
    area: "Area 2",
    sensors: [
      { name: "Sensor 1", value: 78, health: 80.5 },
      { name: "Sensor 2", value: 50, health: 60.22 },
      { name: "Sensor 3", value: 65, health: 72.88 },
      { name: "Sensor 4", value: 48, health: 49.91 },
    ],
  },
];

// Merge lastFailure into sensorHealthData by matching ID
const mergedSensorHealthData = sensorHealthData.map((machine) => {
  const machineMeta = machines.find((m) => m.id === machine.id);
  return {
    ...machine,
    lastFailure: machineMeta?.lastFailure || null,
  };
});

export default mergedSensorHealthData;
