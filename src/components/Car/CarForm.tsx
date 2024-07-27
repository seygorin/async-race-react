import { Form, Input, ColorPicker } from "antd";
import CustomButton from "../Button/CustomButton";

import useGaragePage from "../../hooks/useGaragePage";

function CarForm() {
  const { carFormProps } = useGaragePage();

  const {
    carName,
    carColor,
    setCarName,
    setCarColor,
    handleAddCar,
    editingCar,
  } = carFormProps;

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
        <ColorPicker
          value={carColor}
          onChange={(color) => setCarColor(color.toHexString())}
          format="hex"
        />
      </Form.Item>
      <Form.Item>
        <CustomButton onClick={handleAddCar}>
          {editingCar !== null ? "Edit Car" : "Add Car"}
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CarForm;
