import { Pagination } from "antd";
import "./index.css";

interface WinnersPaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
}

function WinnersPagination({ currentPage, total, onChange }: WinnersPaginationProps) {
  const pageSize = 10;
  const pageCount = Math.ceil(total / pageSize);

  if (pageCount <= 1) {
    return null;
  }

  return (
    <Pagination
      className="winners-pagination"
      current={currentPage}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
    />
  );
}

export default WinnersPagination;
