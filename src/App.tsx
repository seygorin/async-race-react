import React from "react";
import { Provider } from "react-redux";
import MainPage from "./pages/MainPage";
import { store } from "./store/store";
import "antd/dist/reset.css";

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
