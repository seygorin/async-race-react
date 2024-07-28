import React from "react";
import { Pagination } from "antd";

interface WinnersPaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
}

const WinnersPagination: React.FC<WinnersPaginationProps> = ({
  currentPage,
  total,
  onChange,
}) => {
  return (
    <Pagination
      style={{ marginTop: "20px" }}
      current={currentPage}
      total={total}
      pageSize={10}
      onChange={onChange}
    />
  );
};

export default WinnersPagination;
