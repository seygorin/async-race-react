import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { GarageState } from "@store/slices/garageSlice";
import { EngineState } from "@store/slices/engineSlice";
import { WinnersState } from "@store/slices/winnersSlice";
import { DriveEngineState } from "@store/slices/driveEngineSlice";
import { CatFormState } from "@store/slices/catFormSlice";
import { ModalState } from "@store/slices/modalSlice";

interface StateApp
  extends GarageState,
    EngineState,
    WinnersState,
    CatFormState,
    ModalState {
  status: DriveEngineState["statuses"];
}

const useStateApp = (): StateApp => {
  const garageState = useSelector((state: RootState) => state.garage);
  const engineState = useSelector((state: RootState) => state.engine);
  const winnersState = useSelector((state: RootState) => state.winners);
  const status = useSelector((state: RootState) => state.driveEngine.statuses);
  const catFormState = useSelector((state: RootState) => state.catForm);
  const isModalVisible = useSelector((state: RootState) => state.modal.isModalVisible);

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
