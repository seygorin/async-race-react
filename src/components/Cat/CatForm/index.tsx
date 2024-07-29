import { Form, Input, ColorPicker } from "antd";
import CustomButton from "@components/common/Button";
import useGaragePage from "@hooks/useGaragePage";
import "./index.css";

function CatForm() {
  const { catFormProps } = useGaragePage();

  const {
    catName,
    catColor,
    setCatName,
    setCatColor,
    handleAddOrUpdateCat,
    editingCat,
  } = catFormProps;

  return (
    <Form layout="inline" className="cat-form">
      <Form.Item>
        <Input
          placeholder="Cat Name"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <ColorPicker
          value={catColor}
          onChange={(color) => setCatColor(color.toHexString())}
          format="hex"
        />
      </Form.Item>
      <Form.Item>
        <CustomButton onClick={handleAddOrUpdateCat}>
          {editingCat !== null ? "Update Cat" : "Add Cat"}
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CatForm;
