import useWinners from "@hooks/useWinners";
import WinnersTable from "@components/Winners/WinnersTable";
import WinnersPagination from "@components/Winners/WinnersPagination";

function WinnersContainer() {
  const { winners, currentPage, handlePageChange } = useWinners();

  return (
    <>
      <WinnersTable winners={winners} />
      <WinnersPagination
        currentPage={currentPage}
        total={winners.length}
        onChange={handlePageChange}
      />
    </>
  );
}

export default WinnersContainer;
