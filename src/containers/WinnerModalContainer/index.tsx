import { Modal } from "antd";
import useModal from "@hooks/Modal/useModal";
import useStateApp from "@hooks/useStateApp";

import "./index.css";

function WinnerModalContainer() {
  const { isModalVisible, handleCloseModal } = useModal();
  const { winner } = useStateApp();

  const renderTime = (time: number | undefined) => {
    if (time === undefined || Number.isNaN(time)) {
      return "We don't know";
    }
    return `${time.toFixed(1)} seconds`;
  };

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
            <span className="winner-label">Time:</span> {renderTime(winner.bestTime)}
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
