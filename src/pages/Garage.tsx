import WinnerModalContainer from "@containers/WinnerModalContainer";
import GarageHeader from "@components/Garage/GarageHeader";
import GarageContent from "@containers/GarageContnentContainer";
import EngineStatuses from "./EngineStatuses";

function Garage() {
  return (
    <>
      <GarageHeader />
      <EngineStatuses />
      <GarageContent />
      <WinnerModalContainer />
    </>
  );
}

export default Garage;
