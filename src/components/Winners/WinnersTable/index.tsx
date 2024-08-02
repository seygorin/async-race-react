import { Table } from "antd";
import { Winner } from "@store/slices/winnersSlice";
import useWinners from "@hooks/Winners/useWinners";
import Button from "@components/common/Button";
import columns from "./WinnersTableColumns";
import "./index.css";

interface WinnersTableProps {
  winners: Winner[];
}

function WinnersTable({ winners }: WinnersTableProps) {
  const { handleDeleteWinner } = useWinners();

  const handleDelete = (id: number) => {
    if (id !== undefined) {
      handleDeleteWinner(id);
    } else {
      console.error("Attempted to delete a winner with undefined id");
    }
  };

  const deleteColumn = {
    title: "Action",
    dataIndex: "action",
    render: (_: string, record: number) => (
      <Button onClick={() => record !== undefined && handleDelete(record)}>
        Delete
      </Button>
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
    />
  );
}

export default WinnersTable;
