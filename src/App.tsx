import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./App.css";

import Garage from "./pages/Garage";
import Winners from "./pages/Winners";
import CustomMenu from "./components/Menu/CustomMenu";

const { Header, Content, Footer } = Layout;

function App(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Header className="app-header">
          <CustomMenu />
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </Content>
        <Footer className="app-footer">GitHub: seygorin</Footer>
      </Layout>
    </Router>
  );
}

export default App;
