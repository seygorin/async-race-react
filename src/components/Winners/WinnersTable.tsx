import React from "react";
import { Table } from "antd";
import useWinners from "../../hooks/useWinners";
import columns from "./WinnersTableColumns";
import "./WinnersTable.css";

function WinnersTable() {
  const { winners } = useWinners();

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
