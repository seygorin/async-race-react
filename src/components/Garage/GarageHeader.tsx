import React from "react";
import CarForm from "../Car/CarForm";
import Title from "../Title/Title";

const GarageHeader = ({ carFormProps }) => (
  <>
    <Title text="Garage" />
    <CarForm {...carFormProps} />
  </>
);

export default GarageHeader;
