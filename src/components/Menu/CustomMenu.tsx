import React from "react";
import { NavLink } from "react-router-dom";
import "./CustomMenu.css";

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
  );
}

export default CustomMenu;
