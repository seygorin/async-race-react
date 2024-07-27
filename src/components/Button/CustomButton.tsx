import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import "./CustomButton.css";

interface CustomButtonProps extends AntButtonProps {}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <AntButton {...props} className="custom-button" />;
};

export default CustomButton;
