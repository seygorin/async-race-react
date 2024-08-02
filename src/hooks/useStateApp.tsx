import { useSelector } from "react-redux";
import { RootState } from "@store/store";

const useStateApp = () => {
  const garageState = useSelector((state: RootState) => state.garage);
  const engineState = useSelector((state: RootState) => state.engine);
  const winnersState = useSelector((state: RootState) => state.winners);
  const status = useSelector((state: RootState) => state.driveEngine.statuses);
  const catFormState = useSelector((state: RootState) => state.catForm);
  const isModalVisible = useSelector(
    (state: RootState) => state.modal.isModalVisible,
  );

  return {
    ...garageState,
    ...engineState,
    ...winnersState,
    status,
    ...catFormState,
    isModalVisible,
  };
};

export default useStateApp;
