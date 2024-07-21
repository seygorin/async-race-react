import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import "antd/dist/reset.css";
import "./App.css";

import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

const { Header, Content } = Layout;

const menuItems = [
  {
    key: "1",
    label: <NavLink to="/garage">Garage</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/winners">Winners</NavLink>,
  },
];

function App(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" items={menuItems} />
        </Header>
        <Content style={{ padding: "50px" }}>
          <Routes>
            <Route path="/garage" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/" element={<Garage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
