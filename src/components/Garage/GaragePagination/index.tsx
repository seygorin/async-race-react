import { Pagination } from "antd";
import "./index.css";

interface GaragePaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

function GaragePagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: GaragePaginationProps) {
  return (
    <Pagination
      className="garage-pagination"
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      onChange={onPageChange}
    />
  );
}

export default GaragePagination;
