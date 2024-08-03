import useWinners from "@hooks/Winners/useWinners";
import WinnersTable from "@components/Winners/WinnersTable";
import WinnersPagination from "@components/Winners/WinnersPagination";

function WinnersContainer() {
  const { winners, currentPageWinners, totalCount, handlePageChange } = useWinners();

  return (
    <>
      <WinnersTable winners={winners} />
      <WinnersPagination
        currentPage={currentPageWinners}
        total={totalCount}
        onChange={handlePageChange}
      />
    </>
  );
}

export default WinnersContainer;
