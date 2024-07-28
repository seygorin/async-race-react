import { Form, Input, ColorPicker } from "antd";
import CustomButton from "@components/common/Button";
import useGaragePage from "@hooks/useGaragePage";

function CatForm() {
  const { catFormProps } = useGaragePage();

  const {
    catName,
    catColor,
    setCatName,
    setCatColor,
    handleAddCat,
    editingCat,
  } = catFormProps;

  return (
    <Form layout="inline" style={{ marginBottom: "20px" }}>
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
        <CustomButton onClick={handleAddCat}>
          {editingCat !== null ? "Edit Cat" : "Add Cat"}
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CatForm;
