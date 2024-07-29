import { Space } from "antd";
import CustomButton from "@components/common/Button";
import useGaragePage from "@hooks/useGaragePage";

function CatGenerate() {
  const { garageContentProps } = useGaragePage();
  const { handleGenerateRandomCats } = garageContentProps;

  return (
    <Space>
      <CustomButton onClick={handleGenerateRandomCats}>
        Generate: <span className="cat-controls-emoji">🐈</span>
      </CustomButton>
    </Space>
  );
}

export default CatGenerate;
