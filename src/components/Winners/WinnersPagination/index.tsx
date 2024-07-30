import { Pagination } from "antd";
import "./index.css";

interface WinnersPaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
}

function WinnersPagination({
  currentPage,
  total,
  onChange,
}: WinnersPaginationProps) {
  return (
    <Pagination
      className="winners-pagination"
      current={currentPage}
      total={total}
      pageSize={10}
      onChange={onChange}
    />
  );
}

export default WinnersPagination;
