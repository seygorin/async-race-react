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
