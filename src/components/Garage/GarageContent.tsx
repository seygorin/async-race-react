import React from "react";
import { Row, Col } from "antd";
import CarControls from "../Car/CarControls";
import Track from "../Track/Track";
import GaragePagination from "./GaragePagination";

const GarageContent = ({
  cars,
  positions,
  isRacing,
  handleEditCar,
  handleDeleteCar,
  handleStartEngine,
  handleStopEngine,
  handleGenerateRandomCars,
  handleStartRace,
  handleStopRace,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => (
  <>
    <Row gutter={16} style={{ marginBottom: "20px" }}>
      <Col>
        <CarControls
          handleGenerateRandomCars={handleGenerateRandomCars}
          handleStartRace={handleStartRace}
          handleStopRace={handleStopRace}
        />
      </Col>
    </Row>
    <Track
      cars={cars}
      positions={positions}
      handleEditCar={handleEditCar}
      handleDeleteCar={handleDeleteCar}
      handleStartEngine={handleStartEngine}
      handleStopEngine={handleStopEngine}
      isRacing={isRacing}
    />
    <GaragePagination
      currentPage={currentPage}
      totalCount={totalCount}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  </>
);

export default GarageContent;
