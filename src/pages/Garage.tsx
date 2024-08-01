import WinnerModalContainer from "@containers/WinnerModalContainer";
import GarageHeader from "@components/Garage/GarageHeader";
import GarageContent from "@containers/GarageContnentContainer";
import EngineStatuses from "./EngineStatuses"; // Импортируем новый компонент

function Garage() {
  return (
    <>
      <GarageHeader />
      <EngineStatuses /> {/* Добавляем новый компонент */}
      <GarageContent />
      <WinnerModalContainer />
    </>
  );
}

export default Garage;
