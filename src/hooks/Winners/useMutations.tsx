import {
  useCreateWinnerMutation,
  useDeleteWinnerMutation,
  useUpdateWinnerMutation,
} from "@store/api/apiBuilder";

const useCreateWinner = () => useCreateWinnerMutation();
const useDeleteWinner = () => useDeleteWinnerMutation();
const useUpdateWinner = () => useUpdateWinnerMutation();

export { useCreateWinner, useDeleteWinner, useUpdateWinner };
