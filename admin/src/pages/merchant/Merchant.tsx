import {
  CreateMerchantFieldType,
  EarnConfigFormFields,
  MerchantApiCredentialData,
  MerchantData,
  MerchantRouteParams,
} from "@/api/features/merchant/merchant.type";
import { useFetchMerchantApiCredential } from "@/api/features/merchant/useFetchApiCredential";
import { useFetchEarnConfig } from "@/api/features/merchant/useFetchEarnConfig";
import { useFetchMerchant } from "@/api/features/merchant/useFetchMerchant";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import FloatLabel from "@/components/common/FloatingLabel";
import useCreateApiCredential from "@/hooks/merchant/useCreateApiCredential";
import useCreateEarnConfig from "@/hooks/merchant/useCreateEarnConfiguration";
import useCreateMerchant from "@/hooks/merchant/useCreateMerchant";
import usePointsCredit from "@/hooks/merchant/usePointsCredit";
import useUpdateMerchant from "@/hooks/merchant/useUpdateMerchant";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import type { PaginationProps, TableColumnsType } from "antd";
import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
  Tooltip,
} from "antd";
import React, { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { GrUserSettings } from "react-icons/gr";
import { TiPlus } from "react-icons/ti";
import ApiCredentialForm from "./ApiCredentialForm";
import CreateUpdateMerchantForm from "./CreateUpdateMerchantForm";
import EarnConfigurationForm from "./EarnConfigurationForm";
import PointsCreditForm from "./PointsCreditForm";

const Mechant: React.FC = () => {
  const columns: TableColumnsType<MerchantData & { key: React.Key }> = [
    {
      title: "No.",
      dataIndex: "key",
      rowScope: "row",
      key: "1",
      width: "5%",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "2",
      onCell: () => {
        return {
          className: "pointer-cursor ",
        };
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "3",
      onCell: () => {
        return {
          className: "pointer-cursor ",
        };
      },
    },
    {
      title: "Point Balance",
      dataIndex: "point_collection",
      key: "4",
      onCell: () => {
        return {
          className: "pointer-cursor ",
        };
      },
      render: (text) => <>{text === null ? "0" : text}</>,
    },
    {
      title: "Api Credential",
      key: "apiCredential",
      fixed: "right",
      width: 130,
      onCell: () => {
        return {
          onClick: (event) => {
            event.stopPropagation();
          },
        };
      },
      render: (_, record) => (
        <Button
          onClick={() => handleViewApiCredential(record.username)}
          icon={<EyeOutlined />}
        >
          View
        </Button>
      ),
    },
    {
      title: "Earn Configuration",
      key: "earnConfig",
      fixed: "right",
      width: 130,
      onCell: () => {
        return {
          onClick: (event) => {
            event.stopPropagation();
          },
        };
      },
      render: (_, record) => (
        <Button
          onClick={() => handleEarnConfig(record.username)}
          icon={<GrUserSettings />}
        >
          Change
        </Button>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 130,
      onCell: () => {
        return {
          onClick: (event) => {
            event.stopPropagation();
          },
        };
      },

      render: (_, record, index) => (
        <PointsCreditForm
          record={record}
          index={index}
          currentPopConfirmIndex={currentPopConfirmIndex}
          setCurrentPopConfirmIndex={setCurrentPopConfirmIndex}
          onFormSubmit={handlePopConfirm}
          isPopConfirmOpened={isPopConfirmOpened}
          setIsPopConfirmOpened={setIsPopConfirmOpened}
          submitLoading={pointCreditMutation.isLoading}
          creditPoint={creditPoint}
          setCreditPoint={setCreditPoint}
        />
      ),
    },
  ];

  const [routeParams, setRouteParams] = useState<MerchantRouteParams>({
    username: "",
    email: "",
    point_collection: "",
    page: 0,
    pageSize: 10,
  });

  const [selectedRecord, setSelectedRecord] = useState<MerchantData>({
    username: "",
    email: "",
    point_collection: 0,
  });

  const [selectMerchantName, setSelectMerchantName] = useState<string>("");
  const [selectMerchantEarnConfigName, setSelectMerchantEarnConfigName] =
    useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isApiCredentialModal, setIsApiCredentialModal] =
    useState<boolean>(false);
  const [currentPopConfirmIndex, setCurrentPopConfirmIndex] = useState(0);
  const [isPopConfirmOpened, setIsPopConfirmOpened] = useState<boolean[]>([]);
  const [creditPoint, setCreditPoint] = useState<string>("");

  const [modalMode, setModalMode] = useState<"add" | "update">("add");
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  const [isEarnConfigModalOpen, setIsEarnConfigModalOpen] =
    useState<boolean>(false);

  const [username, setUsername] = useState("");
  const [point_collection, setPoint_collection] = useState("");
  const [email, setEmail] = useState("");

  const [form] = Form.useForm();

  // * useQuery & useMutation declaration
  const { data, refetch, isFetching } = useFetchMerchant(routeParams);

  const pointCreditMutation = usePointsCredit({
    currentPopConfirmIndex: currentPopConfirmIndex,
    setIsPopConfirmOpened: setIsPopConfirmOpened,
    refetch: refetch,
  });

  const fetchApiCredential = useFetchMerchantApiCredential(selectMerchantName);
  const apiCredentialMutation = useCreateApiCredential({
    setIsModalOpen: setIsApiCredentialModal,
    refetch: refetch,
    username: selectMerchantName,
  });

  const createMerchantMutation = useCreateMerchant({
    setIsModalOpen: setIsModalOpen,
    refetch: refetch,
  });
  const updateMerchantMutation = useUpdateMerchant({
    setIsModalOpen: setIsModalOpen,
    refetch: refetch,
  });

  const earnConfigQuery = useFetchEarnConfig(selectMerchantEarnConfigName);
  const earnConfigMutation = useCreateEarnConfig({
    setIsModalOpen: setIsEarnConfigModalOpen,
    refetch: refetch,
    username: selectMerchantEarnConfigName,
  });

  const handleViewApiCredential = (username: string) => {
    setIsApiCredentialModal(true);

    if (username === selectMerchantName) {
      fetchApiCredential.refetch();
    } else {
      setSelectMerchantName(username);
    }
  };

  const handleEarnConfig = (username: string) => {
    setIsEarnConfigModalOpen(true);
    if (username === selectMerchantEarnConfigName) {
      earnConfigQuery.refetch();
    } else {
      setSelectMerchantEarnConfigName(username);
    }
  };

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setRouteParams((prevState) => ({
      ...prevState,
      page: pageNumber - 1,
      pageSize: pageSize,
    }));
  };

  const tableDataSource = useMemo(() => {
    if (data) {
      if (data.merchant.data) {
        const modifiedData = data.merchant.data.map((item, index) => ({
          ...item,
          key: index + 1,
        }));

        return modifiedData;
      } else {
        return undefined;
      }
    }
  }, [data]);

  const onFinish = (values: MerchantData) => {
    setRouteParams((prevParams) => ({
      ...prevParams,
      username: values.username,
      email: values.email,
    }));
  };

  const btnDisabled = () => {
    if (username || point_collection || email) {
      return false;
    }
    return true;
  };

  const changeValue = (value: string, type: string) => {
    if (type === "username") {
      if (!value) {
        setUsername("");
        setRouteParams((prevParams) => ({
          ...prevParams,
          username: "",
        }));
      } else {
        setUsername(value);
      }
    } else if (type === "point_collection") {
      if (!value) {
        setPoint_collection("");
        setRouteParams((prevParams) => ({
          ...prevParams,
          point_collection: "",
        }));
      } else {
        setPoint_collection(value);
      }
    } else if (type === "email") {
      if (!value) {
        setEmail("");
        setRouteParams((prevParams) => ({
          ...prevParams,
          email: "",
        }));
      } else {
        setEmail(value);
      }
    }
  };

  const handleFormSubmit = (values: CreateMerchantFieldType) => {
    values.pointQty = Number(values.pointQty);
    if (modalMode === "add") {
      createMerchantMutation.handleCreateMerchant(values);
    } else if (modalMode === "update") {
      updateMerchantMutation.handleUpdateMerchant({
        merchantName: selectedUsername,
        username: values.username,
        email: values.email,
      });
    }
  };

  // * add or update merchant api, functions
  const handleApiCredientialFormSubmit = (
    values: MerchantApiCredentialData
  ) => {
    apiCredentialMutation.handleCreateApiCredential(values);
  };

  // * add earn config api, functions
  const handleEarnConfigFormSubmit = (values: EarnConfigFormFields) => {
    earnConfigMutation.handleCreateEarnConfig(values);
  };

  const handlePopConfirm = (data: MerchantData) => {
    pointCreditMutation.handlePointsCredit({
      merchantName: data.username,
      point_qty: Number(creditPoint),
    });
  };

  const handleCross = () => {
    setUsername("");
    setPoint_collection("");
    setEmail("");
    setRouteParams((prevParams) => ({
      ...prevParams,
      username: "",
      point_collection: "",
      email: "",
    }));
    form.resetFields();
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Breadcrumb items={CustomBreadCrumb()} className="breadcrumb" />

        <Form
          form={form}
          className="form"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Flex align="center" justify="end" gap={15}>
            <Form.Item>
              <Tooltip placement="top" title="Create Merchant">
                <Button
                  className="icon-btn"
                  onClick={() => {
                    setModalMode("add");
                    setIsModalOpen(true);
                  }}
                >
                  <TiPlus />
                </Button>
              </Tooltip>
            </Form.Item>

            {!btnDisabled() && (
              <Form.Item>
                <Button className="cross-btn" onClick={handleCross}>
                  <FiX />
                </Button>
              </Form.Item>
            )}
            <FloatLabel label="Username" value={username}>
              <Form.Item<MerchantData> name="username">
                <Input
                  value={username}
                  onChange={(e) => changeValue(e.target.value, "username")}
                />
              </Form.Item>
            </FloatLabel>

            <FloatLabel label="Email" value={email}>
              <Form.Item<MerchantData>
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please input valid email format!",
                  },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => changeValue(e.target.value, "email")}
                />
              </Form.Item>
            </FloatLabel>

            {/* <FloatLabel label="Point Quantity" value={point_collection}>
              <Form.Item<MerchantData> name="point_collection">
                <Input
                  value={point_collection}
                  onKeyDown={(event) => {
                    allowOnlyNumber(event);
                  }}
                  onChange={(e) =>
                    changeValue(e.target.value, "point_collection")
                  }
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
        columns={columns}
        dataSource={tableDataSource}
        scroll={{ x: 1000, y: 390 }}
        pagination={false}
        loading={isFetching}
        onRow={(record) => {
          return {
            onClick: () => {
              setModalMode("update");
              setSelectedRecord(record);
              setSelectedUsername(record.username);
              setIsModalOpen(true);
            },
          };
        }}
      />
      <Pagination
        className="pagination"
        defaultCurrent={
          data?.merchant?.currentPage ? data?.merchant?.currentPage + 1 : 1
        }
        defaultPageSize={data?.merchant?.pageSize}
        total={data?.merchant?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChange}
      />

      {isModalOpen && (
        <Modal
          zIndex={100}
          width={1000}
          closeIcon={true}
          closable={true}
          centered
          open={isModalOpen}
          title={modalMode === "update" ? "Update Merchant" : "Create Merchant"}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
        >
          <CreateUpdateMerchantForm
            modalMode={modalMode}
            selectedRecord={selectedRecord}
            setSelectedRecord={setSelectedRecord}
            setIsModalOpen={setIsModalOpen}
            onFormSubmit={handleFormSubmit}
            submitBtnLoading={
              createMerchantMutation.isLoading ||
              updateMerchantMutation.isLoading
            }
          />
        </Modal>
      )}

      {isApiCredentialModal && (
        <Modal
          width={1000}
          closeIcon={true}
          centered
          open={isApiCredentialModal}
          onCancel={() => setIsApiCredentialModal(false)}
          closable={true}
          footer={null}
          title={`Api Credential for ${selectMerchantName}`}
        >
          <ApiCredentialForm
            apiCredentialData={fetchApiCredential.data?.api_credential}
            setIsModalOpen={setIsApiCredentialModal}
            fetchApiLoading={fetchApiCredential.isFetching}
            onFormSubmit={handleApiCredientialFormSubmit}
            submitBtnLoading={apiCredentialMutation.isLoading}
            submitSuccess={apiCredentialMutation.isSuccess}
          />
        </Modal>
      )}

      {isEarnConfigModalOpen && (
        <Modal
          width={1000}
          closeIcon={true}
          centered
          open={isEarnConfigModalOpen}
          closable={true}
          footer={null}
          onCancel={() => setIsEarnConfigModalOpen(false)}
          title={`Earn Configuration for ${selectMerchantEarnConfigName}`}
        >
          <EarnConfigurationForm
            earnConfigData={earnConfigQuery.data?.earn_config}
            onFormSubmit={handleEarnConfigFormSubmit}
            setIsModalOpen={setIsEarnConfigModalOpen}
            fetchLoading={earnConfigQuery.isFetching}
            submitBtnLoading={earnConfigMutation.isLoading}
            submitSuccess={earnConfigMutation.isSuccess}
          />
        </Modal>
      )}
    </>
  );
};

export default Mechant;
