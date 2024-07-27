import { Pagination } from "antd";

function GaragePagination({ currentPage, totalCount, pageSize, onPageChange }) {
  return (
    <Pagination
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      onChange={onPageChange}
      style={{ marginTop: "20px", textAlign: "center" }}
    />
  );
}

export default GaragePagination;
