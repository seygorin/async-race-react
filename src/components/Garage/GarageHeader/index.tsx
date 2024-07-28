import { Row, Col } from "antd";
import CatForm from "@components/Cat/CatForm";
import CatControls from "@components/Cat/CatControls";
import Title from "@components/common/Title";

function GarageHeader() {
  return (
    <>
      <Title text="Garage" />
      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CatForm />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CatControls />
        </Col>
      </Row>
    </>
  );
}

export default GarageHeader;
