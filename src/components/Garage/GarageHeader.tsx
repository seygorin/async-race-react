import React from "react";
import CarForm from "../Car/CarForm";

const GarageHeader = ({ carFormProps }) => (
  <>
    <h1>Garage</h1>
    <CarForm {...carFormProps} />
  </>
);

export default GarageHeader;
