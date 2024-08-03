import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import { menuItems, MenuItem } from "./data";
import "./index.css";

const { Header } = Layout;

function CustomMenu() {
  return (
    <Header className="header">
      <nav className="custom-menu">
        {menuItems.map((item: MenuItem) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "custom-menu-item custom-menu-item-active" : "custom-menu-item"
            }
          >
            <span className="menu-item-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </Header>
  );
}

export default CustomMenu;
