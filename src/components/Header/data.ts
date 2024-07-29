export interface MenuItem {
  key: string;
  label: string;
  to: string;
}

export const menuItems: MenuItem[] = [
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
