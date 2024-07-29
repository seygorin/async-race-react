import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import "./index.css";

interface CustomButtonProps extends AntButtonProps {}

function CustomButton(props: CustomButtonProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AntButton {...props} className="custom-button" />;
}

export default CustomButton;
