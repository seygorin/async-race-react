import React from "react";
import { Pagination } from "antd";
import useWinners from "../../hooks/useWinners";

function WinnersPagination() {
  const { winners, currentPage, handlePageChange } = useWinners();

  return (
    <Pagination
      style={{ marginTop: "20px" }}
      current={currentPage}
      total={winners.length}
      pageSize={10}
      onChange={handlePageChange}
    />
  );
}

export default WinnersPagination;
