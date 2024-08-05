import useWinners from "@hooks/Winners/useWinners";
import WinnersTable from "@components/Winners/WinnersTable";
import WinnersPagination from "@components/Winners/WinnersPagination";
import useWinnersTableColumns from "@components/Winners/WinnersColumns";
import { SorterResult } from "antd/lib/table/interface";
import { Winner } from "@type/winnersTypes";

function WinnersContainer() {
  const {
    winners,
    currentPageWinners,
    totalCount,
    isLoading,
    isFetching,
    handlePageChange,
    handleSort,
    handleDeleteWinner,
  } = useWinners();

  const columns = useWinnersTableColumns(handleDeleteWinner);

  const handleTableChange = (sorter: SorterResult<Winner>) => {
    if (sorter.column && sorter.order) {
      handleSort(
        sorter.column.dataIndex as "id" | "wins" | "time",
        sorter.order === "ascend" ? "ASC" : "DESC",
      );
    }
  };

  return (
    <>
      <WinnersTable
        winners={winners}
        columns={columns}
        loading={isLoading || isFetching}
        onChange={handleTableChange}
      />
      <WinnersPagination
        currentPage={currentPageWinners}
        total={totalCount}
        onChange={handlePageChange}
      />
    </>
  );
}

export default WinnersContainer;
