import { Modal } from "antd";
import { useSelector } from "react-redux";
import useGaragePage from "@hooks/useGaragePage";
import { RootState } from "@store/store";
import "./index.css";

function WinnerModalContainer() {
  const { isModalVisible, handleCloseModal } = useGaragePage();
  const winner = useSelector((state: RootState) => state.garage.winner);

  return (
    <Modal
      title="Winner"
      open={isModalVisible}
      onCancel={handleCloseModal}
      footer={null}
      centered
      className="custom-modal"
    >
      {winner ? (
        <div className="modal-content">
          <p className="winner-name">
            <span className="winner-label">Name:</span> {winner.name}
          </p>
          <p className="winner-time">
            <span className="winner-label">Time:</span>{" "}
            {winner.bestTime.toFixed(1)} seconds
          </p>
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
