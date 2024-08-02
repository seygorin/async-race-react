import { useEffect } from "react";
import { Pagination } from "antd";
import "./index.css";

interface GaragePaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

function GaragePagination({
  currentPage,
  totalCount,
  onPageChange,
}: GaragePaginationProps) {
  const pageSize = 7;
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(totalPages);
    }
  }, [currentPage, onPageChange, totalPages]);

  if (totalCount === 0 || totalPages <= 1) {
    return null;
  }
  return (
    <Pagination
      className="garage-pagination"
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
}

export default GaragePagination;
