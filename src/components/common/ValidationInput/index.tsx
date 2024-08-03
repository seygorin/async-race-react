import React, { useEffect, useState } from "react";
import { Input, Tooltip } from "antd";
import "./index.css";

interface CustomValidationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage: string;
  validator: (value: string) => boolean;
  onValidStateChange: (isValid: boolean) => void;
}

function handleFocus(
  isValid: boolean,
  setIsTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (!isValid) {
    setIsTooltipVisible(true);
  }
}

function handleBlur(setIsTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>) {
  setIsTooltipVisible(false);
}

function validateInput(
  inputValue: string,
  validator: (value: string) => boolean,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  onValidStateChange: (isValid: boolean) => void,
) {
  const valid = validator(inputValue);
  setIsValid(valid);
  onValidStateChange(valid);
}

function CustomValidationInput({
  value,
  onChange,
  placeholder,
  errorMessage,
  validator,
  onValidStateChange,
}: CustomValidationInputProps) {
  const [isValid, setIsValid] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    validateInput(value, validator, setIsValid, onValidStateChange);
  }, [value, validator, onValidStateChange]);

  return (
    <Tooltip
      title={!isValid ? errorMessage : ""}
      open={!isValid && isTooltipVisible}
      overlayClassName="custom-tooltip"
    >
      <div>
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => handleFocus(isValid, setIsTooltipVisible)}
          onBlur={() => handleBlur(setIsTooltipVisible)}
        />
      </div>
    </Tooltip>
  );
}

export default CustomValidationInput;
