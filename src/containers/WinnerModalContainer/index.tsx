import { Modal } from "antd";
import { useSelector } from "react-redux";
import useGaragePage from "@hooks/useGaragePage";
import "./index.css";

function WinnerModalContainer() {
  const { isModalVisible, handleCloseModal } = useGaragePage();
  const winner = useSelector((state) => state.garage.winner);

  return (
    <Modal
      title="Winner"
      open={isModalVisible}
      onCancel={handleCloseModal}
      footer={null}
      centered
    >
      {winner ? (
        <div className="modal-content">
          <p>Name: {winner.name}</p>
          <p>Time: {winner.bestTime.toFixed(1)} seconds</p>
        </div>
      ) : (
        <div className="modal-content">
          <p>No winner yet</p>
        </div>
      )}
    </Modal>
  );
}

export default WinnerModalContainer;
