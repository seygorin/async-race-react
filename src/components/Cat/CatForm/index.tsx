import React from "react";
import { Form, Input } from "antd";
import { ColorPicker } from "antd";
import CustomButton from "@components/common/Button";
import useGaragePage from "@hooks/useGaragePage";

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
        <CustomButton onClick={handleAddOrUpdateCat}>
          {editingCat !== null ? "Update Cat" : "Add Cat"}
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CatForm;
