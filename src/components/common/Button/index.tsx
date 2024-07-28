import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import "./index.css";

interface CustomButtonProps extends AntButtonProps {}

function CustomButton(props: CustomButtonProps) {
  return <AntButton {...props} className="custom-button" />;
}

export default CustomButton;
