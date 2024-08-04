import { Table } from "antd";
import useWinners from "@hooks/Winners/useWinners";
import Button from "@components/common/Button";
import { Winner } from "@type/winnersTypes";
import columns from "./WinnersTableColumns";

import "./index.css";

interface WinnersTableProps {
  winners: Winner[];
}

function WinnersTable({ winners }: WinnersTableProps) {
  const { handleDeleteWinner } = useWinners();

  const deleteColumn = {
    title: "Action",
    dataIndex: "action",
    render: (_: string, record: Winner) => (
      <Button onClick={() => handleDeleteWinner(record)}>Delete</Button>
    ),
  };

  const updatedColumns = [...columns, deleteColumn];

  return (
    <Table
      className="winners-table"
      dataSource={winners}
      columns={updatedColumns}
      pagination={false}
      rowKey="id"
      scroll={{ x: "max-content" }}
    />
  );
}

export default WinnersTable;
