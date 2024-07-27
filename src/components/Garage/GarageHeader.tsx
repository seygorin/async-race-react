import { Row, Col } from "antd";
import CarForm from "../Car/CarForm";
import CarControls from "../Car/CarControls";
import Title from "../Title/Title";

function GarageHeader() {
  return (
    <>
      <Title text="Garage" />
      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CarForm />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CarControls />
        </Col>
      </Row>
    </>
  );
}

export default GarageHeader;
