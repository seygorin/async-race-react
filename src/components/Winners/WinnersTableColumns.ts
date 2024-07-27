const columns = [
  {
    title: "Car Number",
    dataIndex: "id",
    key: "id",
    render: (text) => `#${text}`,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Car Icon",
    dataIndex: "id",
    key: "carIcon",
    render: () => "🚗",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Wins",
    dataIndex: "wins",
    key: "wins",
    sorter: (a, b) => a.wins - b.wins,
  },
  {
    title: "Best Time",
    dataIndex: "bestTime",
    key: "bestTime",
    sorter: (a, b) => a.bestTime - b.bestTime,
  },
];

export default columns;
