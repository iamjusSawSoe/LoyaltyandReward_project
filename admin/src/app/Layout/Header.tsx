import { setToast } from "@/store/toastSlice";
import { resetToken } from "@/store/tokenSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import logoCoinImg from "../../assets/images/logo_coin.png";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "1") {
      dispatch(resetToken());
      dispatch(
        setToast({ toastContent: "Logout successfully!", toastType: "success" })
      );
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      icon: <TbLogout style={{ fontSize: "16px" }} />,
      key: "1",
    },
  ];

  return (
    <header className="header">
      <Flex align="center" justify="space-between">
        <Flex align="center" justify="start" gap={5}>
          {!props.collapsed && (
            <>
              <img
                className="logo animated"
                src={logoCoinImg}
                width={35}
                height={35}
                alt="citizen rewards coin"
                style={{ transform: "translateX(0)" }}
              ></img>
              <h3 className="animated" style={{ transform: "translateX(0)" }}>
                Citizen Rewards
              </h3>
            </>
          )}

          <Button
            type="text"
            icon={
              props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={() => props.setCollapsed(!props.collapsed)}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
            }}
          />
        </Flex>
        <Flex align="center" justify="space-around" gap={15}>
          <Dropdown menu={{ items, onClick }}>
            <Button
              onClick={(e) => e.preventDefault()}
              style={{
                borderRadius: "15px",
                fontWeight: "500",
              }}
            >
              <Space>
                <FaRegUserCircle style={{ fontSize: "20px" }} />
                Admin
                <IoIosArrowDown style={{ fontSize: "16px" }} />
              </Space>
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
