import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { Winner } from "@type/winnersTypes";
import Button from "@components/common/Button";

const useWinnersTableColumns = (handleDeleteWinner: (winner: Winner) => void) => {
  return useMemo<ColumnsType<Winner>>(
    () => [
      {
        title: "Cat Number",
        dataIndex: "id",
        key: "id",
        render: (text: number) => `#${text}`,
        sorter: true,
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
        render: (_, record: Winner) => (
          <Button onClick={() => handleDeleteWinner(record)}>Delete</Button>
        ),
      },
    ],
    [handleDeleteWinner],
  );
};

export default useWinnersTableColumns;
