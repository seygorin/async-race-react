import { Table } from "antd";
import { Winner } from "@type/winnersTypes";
import { ColumnsType, SorterResult } from "antd/es/table/interface";

import "./index.css";

interface WinnersTableProps {
  winners: Winner[];
  columns: ColumnsType<Winner>;
  loading: boolean;
  onChange: (sorter: SorterResult<Winner>) => void;
}

function WinnersTable({ winners, columns, loading, onChange }: WinnersTableProps) {
  return (
    <Table
      className="winners-table"
      dataSource={winners}
      columns={columns}
      pagination={false}
      rowKey="id"
      scroll={{ x: "max-content" }}
      loading={loading}
      onChange={(_, __, sorter) => onChange(sorter as SorterResult<Winner>)}
    />
  );
}

export default WinnersTable;
