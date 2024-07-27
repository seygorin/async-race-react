import WinnerModal from "../components/Winners/WinnerModal";
import GarageHeader from "../components/Garage/GarageHeader";
import GarageContent from "../components/Garage/GarageContent";

function Garage() {
  return (
    <div>
      <GarageHeader />
      <GarageContent />
      <WinnerModal />
    </div>
  );
}

export default Garage;
