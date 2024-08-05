import { useEffect } from "react";
import { useGetWinnersQuery } from "@store/api/apiBuilder";
import useStateApp from "@hooks/useStateApp";

const useWinnersQuery = () => {
  const { currentPageWinners, itemsPerPageWinners, sortField, sortOrder } = useStateApp();

  const { data, refetch, isLoading, isFetching } = useGetWinnersQuery(
    {
      page: currentPageWinners,
      limit: itemsPerPageWinners,
      sort: sortField,
      order: sortOrder,
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    refetch();
  }, [currentPageWinners, itemsPerPageWinners, sortField, sortOrder, refetch]);

  return { data, refetch, isLoading, isFetching };
};

export default useWinnersQuery;
