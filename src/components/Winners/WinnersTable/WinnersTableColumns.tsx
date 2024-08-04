import { ColumnProps } from "antd/lib/table";
import CatSitting from "@assets/CatSitting";
import { Winner } from "@type/winnersTypes";

const columns: ColumnProps<Winner>[] = [
  {
    title: "Cat Number",
    dataIndex: "id",
    key: "id",
    render: (text: number) => `#${text}`,
    sorter: (a: Winner, b: Winner) => a.id - b.id,
  },
  {
    title: "Cat Icon",
    dataIndex: "color",
    key: "color",
    render: (color: string) => <CatSitting size={30} color={color} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: Winner, b: Winner) => a.name.localeCompare(b.name),
  },
  {
    title: "Wins",
    dataIndex: "wins",
    key: "wins",
    sorter: (a: Winner, b: Winner) => a.wins - b.wins,
  },
  {
    title: "Best Time",
    dataIndex: "bestTime",
    key: "bestTime",
    sorter: (a: Winner, b: Winner) => a.bestTime - b.bestTime,
  },
];

export default columns;
