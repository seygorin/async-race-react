import React from "react";
import { Row, Card } from "antd";
import TestComponent from "../components/TestComponent";

function MainPage() {
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Card style={{ textAlign: "center", padding: "20px" }}>
        <h1>Main Page</h1>
        <TestComponent />
      </Card>
    </Row>
  );
}

export default MainPage;
