import { Space } from "antd";
import CustomButton from "@components/common/Button";
import { useGenerateRandomCats } from "@containers/CatListContainer/hook/useCatList";

function CatGenerate() {
  const { handleGenerateRandomCats } = useGenerateRandomCats();

  return (
    <Space>
      <CustomButton onClick={handleGenerateRandomCats}>
        Generate: <span className="cat-controls-emoji">🐈</span>
      </CustomButton>
    </Space>
  );
}

export default CatGenerate;
