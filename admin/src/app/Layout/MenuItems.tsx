import { TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import React from "react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import {
  LiaGiftsSolid,
  LiaUsersCogSolid,
  LiaUserTieSolid,
} from "react-icons/lia";
import { PiGearSix } from "react-icons/pi";
import { TbEaseInOutControlPoints } from "react-icons/tb";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const MenuItems: MenuItem[] = [
  getItem("Customer", "/customer", <TeamOutlined />),
  getItem(
    "Loyalty Item",
    "/loyalty-item",
    <LiaGiftsSolid style={{ fontSize: 18 }} />
  ),
  getItem(
    "Point Transaction",
    "/point-transaction",
    <TbEaseInOutControlPoints style={{ fontSize: 18 }} />
  ),
  getItem(
    "Merchant",
    "/merchant",
    <LiaUserTieSolid style={{ fontSize: 18 }} />
  ),
  getItem(
    "Campaign",
    "/campaign",
    <HiOutlineSquaresPlus style={{ fontSize: 18 }} />
  ),
  getItem("User Accounts", "/user", <LiaUsersCogSolid />),
  getItem("Role & Permissions", "/role-and-permissions", <PiGearSix />),
];
