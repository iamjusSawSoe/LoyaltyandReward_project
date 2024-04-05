import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { MenuItems } from "./MenuItems";
const { Sider } = Layout;

interface Props {
  children: React.ReactNode;
  singleCard?: boolean;
}

const AuthenticatedLayout: React.FC<Props> = ({
  children,
  singleCard = true,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  let openKeys = location.pathname;
  if (openKeys.split("/").length > 2) openKeys = `/${openKeys.split("/")[1]}`;
  openKeys = `${openKeys}`;

  const [collapsed, setCollapsed] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
      <Layout className="container">
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            style={{ marginTop: "10px" }}
            defaultSelectedKeys={[openKeys]}
            selectedKeys={[openKeys]}
            mode="inline"
            items={MenuItems}
            onClick={onClick}
          />
        </Sider>
        <div className="content">
          <div className={singleCard ? "content__wrapper" : ""}>{children}</div>
        </div>
      </Layout>
    </>
  );
};

export default AuthenticatedLayout;
