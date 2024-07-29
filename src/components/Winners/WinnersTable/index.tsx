import { Table } from "antd";
import { Winner } from "@store/slices/winnersSlice";
import columns from "./WinnersTableColumns";
import "./index.css";

interface WinnersTableProps {
  winners: Winner[];
}

function WinnersTable({ winners }: WinnersTableProps) {
  return (
    <Table
      className="winners-table"
      dataSource={winners}
      columns={columns}
      pagination={false}
      rowKey="id"
    />
  );
}

export default WinnersTable;
