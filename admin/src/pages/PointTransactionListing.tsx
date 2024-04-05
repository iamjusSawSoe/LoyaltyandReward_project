import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import { pointTransactionColumns } from "@/components/table/tableColumns";
import { SearchOutlined } from "@ant-design/icons";
import type { DatePickerProps, PaginationProps } from "antd";
import {
  Breadcrumb,
  Button,
  DatePicker,
  Flex,
  Form,
  Modal,
  Pagination,
  Select,
  Spin,
  Table,
} from "antd";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import {
  PointTransactionFieldType,
  PointTransactionRouteParams,
} from "../api/features/pointTransaction/IPointTransaction";
import {
  useGetPointTransaction,
  useGetPointTransactionDetail,
} from "../api/features/pointTransaction/pointTransaction";
import FloatLabel from "../components/common/FloatingLabel";
import { formatDate } from "../utils/formatDate";

const PointTransactionListing: React.FC = () => {
  const [routeParams, setRouteParams] = useState<PointTransactionRouteParams>({
    pointQty: "",
    pointCode: "",
    itemName: "",
    transactionDate: "",
    transactionType: "",
    channel: "",
    phoneNumber: "",
    username: "",
    initiatorType: "",
    page: 0,
    pageSize: 10,
  });

  const [initiator_type, setInitiator_type] = useState("");
  const [channel, setChannel] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [date, setDate] = useState<string>("");

  // * for Point Transaction Detail
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>(0);

  const [form] = Form.useForm();

  const pointTransactionDetailQuery = useGetPointTransactionDetail(selectedID);
  const { data, isFetching } = useGetPointTransaction(routeParams);

  const tableDataSource = useMemo(() => {
    if (data) {
      if (data.point_transactions.data) {
        const modifiedData = data.point_transactions.data.map(
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
  }, [data]);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setRouteParams((prevState) => ({
      ...prevState,
      page: pageNumber - 1,
      pageSize: pageSize,
    }));
  };

  const handleCross = () => {
    setChannel("");
    setInitiator_type("");
    setTransactionType("");
    setDate("");
    setRouteParams((prevParams) => ({
      ...prevParams,
      channel: "",
      initiator_type: "",
      transactionType: "",
      transactionDate: "",
    }));
    form.resetFields();
  };

  const btnDisabled = () => {
    if (initiator_type || channel || transactionType || date) {
      return false;
    }
    return true;
  };

  const onDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };

  const onFinish = (values: PointTransactionFieldType) => {
    setRouteParams((prevParams) => ({
      ...prevParams,
      pointQty: values.pointQty,
      pointCode: values.pointCode,
      itemName: values.itemName,
      transactionDate: date,
      transactionType: values.transactionType,
      channel: values.channel,
      phoneNumber: values.phoneNumber,
      username: values.username,
      initiatorType: values.initiatorType,
    }));
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
            <FloatLabel label="Transaction Date" value={date}>
              <Form.Item<PointTransactionFieldType> name="transactionDate">
                <DatePicker
                  format={"YYYY-MM-DD"}
                  value={dayjs(date, "YYYY-MM-DD")}
                  onChange={onDateChange}
                  placeholder=""
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Transaction Type" value={transactionType}>
              <Form.Item<PointTransactionFieldType> name="transactionType">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  allowClear
                  value={transactionType}
                  onChange={(e) => {
                    if (e) {
                      setTransactionType(e);
                    } else {
                      setTransactionType("");
                    }
                  }}
                  options={[
                    {
                      value: "DEBIT",
                      label: "Debit",
                    },
                    {
                      value: "CREDIT",
                      label: "Credit",
                    },
                  ]}
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Channel" value={channel}>
              <Form.Item<PointTransactionFieldType> name="channel">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  allowClear
                  value={channel}
                  onChange={(e) => {
                    if (e === undefined) {
                      setChannel("");
                    } else {
                      setChannel(e);
                    }
                  }}
                  options={[
                    {
                      value: "EARN",
                      label: "Earn",
                    },
                    {
                      value: "CLAIM",
                      label: "Claim",
                    },
                    {
                      value: "PREFUNDING",
                      label: "Prefunding",
                    },
                    {
                      value: "REVERSE",
                      label: "Reverse",
                    },
                  ]}
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Initiator Type" value={initiator_type}>
              <Form.Item<PointTransactionFieldType> name="initiatorType">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  allowClear
                  value={initiator_type}
                  onChange={(e) => {
                    if (e === undefined) {
                      setInitiator_type("");
                    } else {
                      setInitiator_type(e);
                    }
                  }}
                  options={[
                    {
                      value: "CUSTOMER",
                      label: "Customer",
                    },
                    {
                      value: "MERCHANT",
                      label: "Merchant",
                    },
                  ]}
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
        columns={pointTransactionColumns}
        dataSource={tableDataSource}
        scroll={{ x: 1800, y: 390 }}
        pagination={false}
        loading={isFetching}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedID(record.id);
              setIsModalOpen(true);
            },
          };
        }}
      />
      <Pagination
        className="pagination"
        defaultCurrent={1}
        defaultPageSize={data?.point_transactions?.pageSize}
        total={data?.point_transactions?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChange}
      />

      {isModalOpen && (
        <Modal
          width={800}
          closeIcon={true}
          title={`Point Transaction Detail for ${pointTransactionDetailQuery.data?.point_transaction?.customer_phone_number}`}
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
          <Spin
            tip="Loading"
            spinning={pointTransactionDetailQuery.isFetching}
            className="loading"
          >
            <Flex justify="space-between" wrap="wrap">
              <Flex className="text-box " vertical={true} flex={1}>
                <label>Item Name</label>
                <span>
                  {
                    pointTransactionDetailQuery.data?.point_transaction
                      ?.item_name
                  }
                </span>
              </Flex>

              <Flex className="text-box" vertical={true} flex={1}>
                <label>Point Code</label>
                <span>
                  {
                    pointTransactionDetailQuery.data?.point_transaction
                      ?.point_code
                  }
                </span>
              </Flex>

              <Flex className="text-box" vertical={true} flex={1}>
                <label>Point Quantity</label>
                <span>
                  {
                    pointTransactionDetailQuery.data?.point_transaction
                      ?.point_qty
                  }
                </span>
              </Flex>

              <Flex className="text-box" vertical={true} flex={1}>
                <label>Transaction Date</label>
                <span>
                  {pointTransactionDetailQuery.data?.point_transaction
                    ?.transaction_date &&
                    formatDate(
                      pointTransactionDetailQuery.data?.point_transaction
                        ?.transaction_date
                    )}
                </span>
              </Flex>
            </Flex>

            <Flex justify="space-between" wrap="wrap">
              <Flex className="text-box" vertical={true} flex={1}>
                <label>Merchant Username</label>
                <span>
                  {
                    pointTransactionDetailQuery.data?.point_transaction
                      ?.merchant_username
                  }
                </span>
              </Flex>

              <Flex className="text-box" vertical={true} flex={1}>
                <label>Transaction Type</label>
                <span>
                  {
                    pointTransactionDetailQuery.data?.point_transaction
                      ?.transaction_type
                  }
                </span>
              </Flex>

              <Flex className="text-box" vertical={true} flex={1}>
                <label>Channel</label>
                <span>
                  {pointTransactionDetailQuery.data?.point_transaction?.channel}
                </span>
              </Flex>
              <Flex className="text-box" vertical={true} flex={1}>
                <label>Initiator Type</label>
                <span>
                  {
                    pointTransactionDetailQuery.data?.point_transaction
                      ?.initiator_type
                  }
                </span>
              </Flex>
            </Flex>
          </Spin>
        </Modal>
      )}
    </>
  );
};

export default PointTransactionListing;
