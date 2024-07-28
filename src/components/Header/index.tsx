import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import "./index.css";

const { Header } = Layout;

const menuItems = [
  {
    key: "1",
    label: "Garage",
    to: "/garage",
  },
  {
    key: "2",
    label: "Winners",
    to: "/winners",
  },
];

function CustomMenu() {
  return (
    <Header className="header">
      <nav className="custom-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "custom-menu-item custom-menu-item-active"
                : "custom-menu-item"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </Header>
  );
}

export default CustomMenu;
