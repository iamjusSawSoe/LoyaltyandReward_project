import { useGetCustomers } from "@/api/features/customer/getCustomers";
import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import {
  customerPointsTransitionColumns,
  customersColumn,
} from "@/components/table/tableColumns";
import { allowOnlyNumber } from "@/utils/allowOnlyNumber";
import { SearchOutlined } from "@ant-design/icons";
import type { PaginationProps } from "antd";
import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
} from "antd";
import React, { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { useFetchCustomerPointTransaction } from "../api/features/customer/getCustomerPointTransaction";
import * as CustomerTypes from "../api/features/customer/interface";
import FloatLabel from "../components/common/FloatingLabel";

const CustomerListing: React.FC = () => {
  const [routeParams, setRouteParams] =
    useState<CustomerTypes.CustomerRequestParams>({
      phone_number: "",
      status: "",
      point_qty: "20",
      page: 0,
      pageSize: 10,
    });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pointQty, setPointQty] = useState("");
  const [status, setStatus] = useState("");
  const [pointRouteParams, setPointRouteParams] =
    useState<CustomerTypes.CustomerPointTransactionParams>({
      phone_number: "",
      page: 0,
      pageSize: 10,
    });

  const [form] = Form.useForm();
  const customersQuery = useGetCustomers(routeParams);
  const pointTransactionQuery =
    useFetchCustomerPointTransaction(pointRouteParams);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setRouteParams((prevState) => ({
      ...prevState,
      page: pageNumber - 1,
      pageSize: pageSize,
    }));
  };

  const tableDataSource = useMemo(() => {
    if (customersQuery.data) {
      if (customersQuery.data.customers.data) {
        const modifiedData = customersQuery.data.customers.data.map(
          (item, index) => ({
            ...item,
            key: index + 1,
          })
        );
        return modifiedData;
      } else {
        return undefined;
      }
    }
  }, [customersQuery.data]);

  const onFinish = (values: CustomerTypes.CustomerFieldType) => {
    setRouteParams((prevParams) => ({
      ...prevParams,
      phone_number: values.phone_number,
      point_qty: values.point_qty,
      status: values.status,
    }));
  };

  const btnDisabled = () => {
    if (phoneNumber || pointQty || status) {
      return false;
    }
    return true;
  };

  const changeValue = (value: string, type: string) => {
    if (type === "phoneNumber") {
      if (!value) {
        setPhoneNumber("");
        setRouteParams((prevParams) => ({
          ...prevParams,
          phone_number: "",
        }));
      } else {
        setPhoneNumber(value);
      }
    } else if (type === "pointQty") {
      if (!value) {
        setPointQty("");
        setRouteParams((prevParams) => ({
          ...prevParams,
          point_qty: "",
        }));
      } else {
        setPointQty(value);
      }
    }
  };

  const pointTransactionTableDataSource = useMemo(() => {
    if (pointTransactionQuery.data) {
      if (pointTransactionQuery.data.customer.data) {
        const modifiedData = pointTransactionQuery.data.customer.data.map(
          (item, index) => ({
            ...item,
            key: index + 1,
          })
        );
        return modifiedData;
      } else {
        return undefined;
      }
    }
  }, [pointTransactionQuery.data]);

  const handleCross = () => {
    setPhoneNumber("");
    setPointQty("");
    setStatus("");
    setRouteParams((prevParams) => ({
      ...prevParams,
      phone_number: "",
      point_qty: "",
      status: "",
    }));
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
            {phoneNumber && (
              <Form.Item>
                <Button className="cross-btn" onClick={handleCross}>
                  <FiX />
                </Button>
              </Form.Item>
            )}

            {/* <FloatLabel label="Status" value={status}>
            <Form.Item<CustomerTypes.CustomerFieldType> name="status">
              <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                allowClear
                value={status}
                onClear={() => clearSearch("status")}
                onChange={(e) => {
                  if (e === undefined) {
                    setStatus("");
                  } else {
                    setStatus(e);
                  }
                }}
                options={[
                  {
                    value: "REGISTER",
                    label: "Register",
                  },
                  {
                    value: "NEW",
                    label: "New",
                  },
                ]}
              />
            </Form.Item>
          </FloatLabel> */}

            <FloatLabel label="Phone Number" value={phoneNumber}>
              <Form.Item<CustomerTypes.CustomerFieldType> name="phone_number">
                <Input
                  onKeyDown={(event) => {
                    allowOnlyNumber(event);
                  }}
                  value={phoneNumber}
                  onChange={(e) => changeValue(e.target.value, "phoneNumber")}
                />
              </Form.Item>
            </FloatLabel>

            {/* <FloatLabel label="Point Quantity" value={pointQty}>
            <Form.Item<CustomerTypes.CustomerFieldType> name="point_qty">
              <Input
                onKeyDown={(event) => {
                  if (event.key.length > 1 || /^[0-9]$/.test(event.key)) {
                    return;
                  }
                  event.preventDefault();
                }}
                value={pointQty}
                onChange={(e) => changeValue(e.target.value, "pointQty")}
              />
            </Form.Item>
          </FloatLabel> */}

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
        columns={customersColumn}
        dataSource={tableDataSource}
        scroll={{ x: 1000, y: 390 }}
        pagination={false}
        loading={customersQuery.isFetching}
        onRow={(record) => {
          return {
            onClick: () => {
              setPointRouteParams((prevParams) => ({
                ...prevParams,
                phone_number: record.phone_number,
              }));
              setIsModalOpen(true);
            },
          };
        }}
      />
      <Pagination
        className="pagination"
        defaultCurrent={
          customersQuery.data?.customers?.currentPage
            ? customersQuery.data?.customers?.currentPage + 1
            : 1
        }
        defaultPageSize={customersQuery.data?.customers?.pageSize}
        total={customersQuery.data?.customers?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChange}
      />

      {isModalOpen && (
        <Modal
          width={1200}
          closeIcon={true}
          title={`Transition Detail for ${pointRouteParams.phone_number}`}
          centered
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Return
            </Button>,
          ]}
          className="detail-modal"
        >
          <Table
            columns={customerPointsTransitionColumns}
            dataSource={pointTransactionTableDataSource}
            scroll={{ x: 1000, y: 390 }}
            pagination={false}
            loading={pointTransactionQuery.isFetching}
          />
          <Pagination
            className="pagination"
            defaultCurrent={
              pointTransactionQuery.data?.customer?.currentPage
                ? pointTransactionQuery.data?.customer?.currentPage + 1
                : 1
            }
            defaultPageSize={pointTransactionQuery.data?.customer?.pageSize}
            total={pointTransactionQuery.data?.customer?.totalElements}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            responsive={true}
            onChange={onChange}
          />
        </Modal>
      )}
    </>
  );
};

export default CustomerListing;
