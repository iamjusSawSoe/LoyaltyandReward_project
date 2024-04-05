import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import { SearchOutlined } from "@ant-design/icons";
import type { PaginationProps, TableColumnsType } from "antd";
import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Input,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { useGetLoyaltyItem } from "../api/features/loyaltyItem/LoyaltyItem";
import {
  LoyaltyItemData,
  LoyaltyItemRouteParams,
} from "../api/features/loyaltyItem/interface";
import FloatLabel from "../components/common/FloatingLabel";

const columns: TableColumnsType<LoyaltyItemData & { key: React.Key }> = [
  {
    title: "No.",
    dataIndex: "key",
    rowScope: "row",
    key: "1",
    width: "5%",
    align: "center",
  },
  {
    title: "Item Name",
    dataIndex: "item_name",
    key: "2",
  },
  {
    title: "Point Code",
    dataIndex: "point_code",
    key: "3",
  },

  {
    title: "Point Quantity",
    dataIndex: "point_qty",
    key: "4",
    render: (text) => <>{text === 0 ? "0" : text}</>,
  },
  {
    title: "Merchant Username",
    dataIndex: "merchant_username",
    key: "5",
  },
  {
    title: "Claimed",
    dataIndex: "claimed",
    key: "6",
    render: (text) => <>{text ? "Yes" : "No"}</>,
  },
];

const LoyaltyItemListing: React.FC = () => {
  const [routeParams, setRouteParams] = useState<LoyaltyItemRouteParams>({
    point_code: "",
    point_qty: null,
    item_name: "",
    claimed: null,
    merchant_username: "",
    page: 0,
    pageSize: 10,
  });
  const [itemName, setItemName] = useState("");
  const [pointQty, setPointQty] = useState("");
  const [claimed, setClaimed] = useState("");
  const [merchantName, setMerchantName] = useState("");

  const [form] = Form.useForm();
  const { data, isFetching } = useGetLoyaltyItem(routeParams);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setRouteParams((prevState) => ({
      ...prevState,
      page: pageNumber - 1,
      pageSize: pageSize,
    }));
  };

  const tableDataSource = useMemo(() => {
    if (data) {
      if (data.loyalty_items.data === null) {
        return undefined;
      } else {
        const modifiedData = data.loyalty_items.data.map((item, index) => ({
          ...item,
          key:
            data.loyalty_items.currentPage * data.loyalty_items.pageSize +
            (index + 1),
        }));
        return modifiedData;
      }
    }
  }, [data]);

  const onFinish = (values: LoyaltyItemData) => {
    setRouteParams((prevParams) => ({
      ...prevParams,
      point_code: values.point_code,
      point_qty: values.point_qty,
      item_name: values.item_name,
      claimed: values.claimed,
      merchant_username: values.merchant_username,
    }));
  };

  const btnDisabled = () => {
    if (itemName || pointQty || claimed || merchantName) {
      return false;
    }
    return true;
  };

  const handleChangeValue = (value: string, type: string) => {
    switch (type) {
      case "itemName":
        setItemName(value || "");
        break;
      case "pointQty":
        setPointQty(value || "");
        break;
      case "merchantName":
        setMerchantName(value || "");
        break;
      case "claimed":
        setClaimed(value);
        break;
      default:
        throw new Error("Invalid type: " + type);
    }
  };

  const handleCross = () => {
    setRouteParams((prevParams) => ({
      ...prevParams,
      point_code: "",
      point_qty: null,
      item_name: "",
      claimed: null,
      merchant_username: "",
    }));
    setItemName("");
    setPointQty("");
    setClaimed("");
    setMerchantName("");
    form.resetFields();
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Breadcrumb items={CustomBreadcrumb()} className="breadcrumb" />
        <Form
          className="form"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Flex align="center" justify="end" gap={15}>
            {!btnDisabled() && (
              <Form.Item>
                <Button className="cross-btn" onClick={handleCross}>
                  <FiX />
                </Button>
              </Form.Item>
            )}
            <FloatLabel label="Claimed" value={claimed}>
              <Form.Item<LoyaltyItemData> name="claimed">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  allowClear
                  value={claimed}
                  onChange={(e) => handleChangeValue(e, "claimed")}
                  options={[
                    {
                      value: "true",
                      label: "Yes",
                    },
                    {
                      value: "false",
                      label: "No",
                    },
                  ]}
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Item Name" value={itemName}>
              <Form.Item<LoyaltyItemData> name="item_name">
                <Input
                  value={itemName}
                  onChange={(e) =>
                    handleChangeValue(e.target.value, "itemName")
                  }
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Point Quantity" value={pointQty}>
              <Form.Item<LoyaltyItemData> name="point_qty">
                <Input
                  onKeyDown={(event) => {
                    if (event.key.length > 1 || /^[0-9]$/.test(event.key)) {
                      return;
                    }
                    event.preventDefault();
                  }}
                  value={pointQty}
                  onChange={(e) =>
                    handleChangeValue(e.target.value, "pointQty")
                  }
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Merchant Name" value={merchantName}>
              <Form.Item<LoyaltyItemData> name="merchant_username">
                <Input
                  value={merchantName}
                  onChange={(e) =>
                    handleChangeValue(e.target.value, "merchantName")
                  }
                />
              </Form.Item>
            </FloatLabel>

            <Form.Item>
              <Button
                className="icon-btn"
                htmlType="submit"
                disabled={btnDisabled()}
              >
                <SearchOutlined />
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Flex>

      <Table
        columns={columns}
        dataSource={tableDataSource}
        scroll={{ y: 390 }}
        pagination={false}
        loading={isFetching}
      />
      <Pagination
        className="pagination"
        defaultCurrent={
          data?.loyalty_items?.currentPage
            ? data?.loyalty_items?.currentPage + 1
            : 1
        }
        defaultPageSize={data?.loyalty_items?.pageSize}
        total={data?.loyalty_items?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChange}
      />
    </>
  );
};

export default LoyaltyItemListing;
