import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    if (page === 1) {
      navigate("/garage");
    } else {
      navigate(`/garage/${page}`);
    }
  };

  return (
    <Pagination
      className="garage-pagination"
      current={currentPage}
      total={totalCount}
      onChange={handlePageChange}
      showSizeChanger={false}
    />
  );
}

export default GaragePagination;
