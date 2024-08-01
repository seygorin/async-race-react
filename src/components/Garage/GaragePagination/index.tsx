import React, { useEffect, useCallback } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

interface GaragePaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  catsOnCurrentPage: number;
}

function GaragePagination({
  currentPage,
  totalCount,
  onPageChange,
  catsOnCurrentPage,
}: GaragePaginationProps) {
  const navigate = useNavigate();
  const pageSize = 7;

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
      if (page === 1) {
        navigate("/garage");
      } else {
        navigate(`/garage/${page}`);
      }
    },
    [navigate, onPageChange],
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (catsOnCurrentPage === 0 && currentPage > 1) {
      handlePageChange(currentPage - 1);
    } else if (currentPage > totalPages && totalPages > 0) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages, catsOnCurrentPage, handlePageChange]);

  if (totalCount === 0) {
    return null;
  }

  return (
    <Pagination
      className="garage-pagination"
      current={currentPage}
      total={totalCount}
      pageSize={pageSize}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
}

export default React.memo(GaragePagination);
