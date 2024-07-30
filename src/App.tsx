import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./App.css";

import Garage from "@pages/Garage";
import Winners from "@pages/Winners";
import CustomMenu from "@components/Header";
import CustomFooter from "@components/Footer";
import NotFound from "@components/NotFound";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <CustomMenu />
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/garage/:page" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/winners/:page" element={<Winners />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <CustomFooter />
      </Layout>
    </Router>
  );
}

export default App;
