import React from "react";
import { Form, Input } from "antd";
import CustomButton from "../Button/CustomButton";

const CarForm = ({
  carName,
  carColor,
  setCarName,
  setCarColor,
  handleAddCar,
  editingCar,
}) => {
  return (
    <Form layout="inline" style={{ marginBottom: "20px" }}>
      <Form.Item>
        <Input
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <div
          style={{
            padding: "5px",
            background: carColor,
            border: "1px solid #d9d9d9",
            cursor: "pointer",
          }}
        >
          <input
            type="color"
            value={carColor}
            onChange={(e) => setCarColor(e.target.value)}
            style={{
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </div>
      </Form.Item>
      <Form.Item>
        <CustomButton onClick={handleAddCar}>
          {editingCar !== null ? "Edit Car" : "Add Car"}
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
