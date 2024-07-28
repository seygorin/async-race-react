import CatSitting from "../../assets/CatSitting";

const columns = [
  {
    title: "Cat Number",
    dataIndex: "id",
    key: "id",
    render: (text) => `#${text}`,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Cat Icon",
    dataIndex: "color",
    key: "color",
    render: (color) => <CatSitting size={30} color={color} />,
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
