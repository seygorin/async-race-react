import { useEffect } from "react";
import { useGetWinnersQuery } from "@store/api/apiBuilder";
import useStateApp from "@hooks/useStateApp";

const useWinnersQuery = () => {
  const { currentPageWinners, itemsPerPageWinners } = useStateApp();

  const { data, refetch } = useGetWinnersQuery(
    { page: currentPageWinners, limit: itemsPerPageWinners },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    refetch();
  }, [currentPageWinners, refetch]);

  return { data, refetch };
};

export default useWinnersQuery;
