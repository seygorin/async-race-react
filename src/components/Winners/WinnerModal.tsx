import React from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import "./WinnerModal.css";

const WinnerModal = ({ visible, onClose }) => {
  const winner = useSelector((state) => state.garage.winner);

  return (
    <Modal
      title="Winner"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      {winner ? (
        <div className="modal-content">
          <p>Name: {winner.name}</p>
          <p>Time: {winner.bestTime.toFixed(2)} seconds</p>
        </div>
      ) : (
        <div className="modal-content">
          <p>No winner yet</p>
        </div>
      )}
    </Modal>
  );
};

export default WinnerModal;
