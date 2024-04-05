import { MenuItems } from "@/app/Layout/MenuItems";
import { HomeOutlined } from "@ant-design/icons";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomBreadCrumb = () => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
  >([]);

  useEffect(() => {
    // Find the matching item based on the current location
    const foundItem = MenuItems.find((item) => {
      if (typeof item?.key === "string") {
        return location.pathname.includes(item.key);
      }
    }) as MenuItemType;

    const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] =
      foundItem
        ? [
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              title: <>{foundItem.icon}</>,
            },
            {
              title: <span>{foundItem.label}</span>,
            },
          ]
        : [];

    setBreadcrumbItems(breadcrumbs);
  }, [location]);

  return breadcrumbItems;
};

export default CustomBreadCrumb;
