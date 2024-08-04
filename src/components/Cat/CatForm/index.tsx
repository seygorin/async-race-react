import { Form, ColorPicker } from "antd";
import CustomButton from "@components/common/Button";
import CustomValidationInput from "@components/common/ValidationInput";
import { Cat as CatType } from "@type/catsTypes";
import "./index.css";

const VALIDATION_MIN_LENGTH = 3;
const VALIDATION_MAX_LENGTH = 15;

const nameValidator = (name: string) =>
  name.length >= VALIDATION_MIN_LENGTH && name.length <= VALIDATION_MAX_LENGTH;

interface CatNameInputProps {
  catName: string;
  setCatName: (name: string) => void;
  setIsNameValid: (isValid: boolean) => void;
}

function CatNameInput({ catName, setCatName, setIsNameValid }: CatNameInputProps) {
  return (
    <CustomValidationInput
      placeholder="Cat Name"
      value={catName}
      onChange={(e) => setCatName(e.target.value)}
      errorMessage="Name must be between 3 and 15 characters"
      validator={nameValidator}
      onValidStateChange={setIsNameValid}
    />
  );
}

interface CatFormProps {
  catName: string;
  catColor: string;
  setCatName: (name: string) => void;
  setCatColor: (color: string) => void;
  editingCat: CatType | null;
  isNameValid: boolean;
  setIsNameValid: (isValid: boolean) => void;
  handleFormSubmit: () => void;
}

function CatForm({
  catName,
  catColor,
  setCatName,
  setCatColor,
  editingCat,
  isNameValid,
  setIsNameValid,
  handleFormSubmit,
}: CatFormProps) {
  return (
    <Form layout="inline" className="cat-form">
      <Form.Item>
        <CatNameInput
          catName={catName}
          setCatName={setCatName}
          setIsNameValid={setIsNameValid}
        />
      </Form.Item>
      <Form.Item>
        <ColorPicker
          value={catColor}
          onChange={(color) => setCatColor(color.toHexString())}
          format="hex"
          className="cat-form-color-picker"
        />
      </Form.Item>
      <Form.Item>
        <CustomButton onClick={handleFormSubmit} disabled={!isNameValid}>
          {editingCat !== null ? "Update Cat" : "Add Cat"}
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CatForm;
