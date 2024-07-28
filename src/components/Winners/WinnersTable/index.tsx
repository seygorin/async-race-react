import React from "react";
import { Table } from "antd";
import columns from "./WinnersTableColumns";
import "./index.css";

interface WinnersTableProps {
  winners: any[];
}

const WinnersTable: React.FC<WinnersTableProps> = ({ winners }) => {
  return (
    <Table
      className="winners-table"
      dataSource={winners}
      columns={columns}
      pagination={false}
      rowKey="id"
    />
  );
};

export default WinnersTable;
