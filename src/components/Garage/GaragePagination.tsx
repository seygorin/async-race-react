import { Pagination } from "antd";

const GaragePagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => (
  <Pagination
    current={currentPage}
    total={totalCount}
    pageSize={pageSize}
    onChange={onPageChange}
    style={{ marginTop: "20px", textAlign: "center" }}
  />
);

export default GaragePagination;
