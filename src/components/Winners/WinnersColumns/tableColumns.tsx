import CatSitting from "@assets/CatSitting";
import { WinnerColumnsType } from "@type/winnersTypes";

const columnsData: WinnerColumnsType = [
  {
    title: "Cat Number",
    dataIndex: "id",
    key: "id",
    render: (text: number) => `#${text}`,
    sorter: true,
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
    sorter: true,
  },
  {
    title: "Wins",
    dataIndex: "wins",
    key: "wins",
    sorter: true,
  },
  {
    title: "Best Time",
    dataIndex: "bestTime",
    key: "bestTime",
    sorter: true,
  },
  {
    title: "Action",
    key: "action",
    render: () => null,
  },
];

export default columnsData;
