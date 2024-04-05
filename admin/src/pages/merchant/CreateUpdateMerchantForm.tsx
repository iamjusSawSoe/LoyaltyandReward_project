import * as MerchantTypes from "@/api/features/merchant/merchant.type";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import { Dispatch, useState } from "react";

type Props = {
  modalMode: "add" | "update";
  selectedRecord: MerchantTypes.MerchantData;
  setSelectedRecord: Dispatch<React.SetStateAction<MerchantTypes.MerchantData>>;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  onFormSubmit: (formData: MerchantTypes.CreateMerchantFieldType) => void;
  submitBtnLoading: boolean;
};

const CreateUpdateMerchantForm = (props: Props) => {
  const [createMerchantData, setCreateMerchantData] =
    useState<MerchantTypes.CreateMerchantFieldType>({
      username: "",
      email: "",
      confirm_password: "",
      password: "",
      pointQty: "",
    });
  const [passwordVisible, setPasswordVisible] =
    useState<MerchantTypes.PasswordVisibilityState>({
      password: false,
      confirm_password: false,
    });
  const [shallowCopy] = useState(props.selectedRecord);

  const modalValueChange = (value: string, fieldName: string) => {
    if (props.modalMode === "add") {
      setCreateMerchantData((prevState) => ({
        ...prevState,
        [`${fieldName}`]: value,
      }));
    } else {
      props.setSelectedRecord((prevState: MerchantTypes.MerchantData) => ({
        ...prevState,
        [`${fieldName}`]: value,
      }));
    }
  };

  const togglePasswordVisibility = (
    field: keyof MerchantTypes.PasswordVisibilityState
  ) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <Form
      className="modal-form"
      autoComplete="off"
      onFinish={props.onFormSubmit}
      initialValues={props.selectedRecord && props.selectedRecord}
    >
      <Row gutter={40}>
        <Col span={12}>
          <Form.Item<MerchantTypes.CreateMerchantFieldType>
            name="username"
            rules={[
              {
                required: true,
                message: "Please input merchant username!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Username</label>
              <Input
                placeholder="Enter username"
                value={
                  props.modalMode === "update"
                    ? props.selectedRecord.username
                    : createMerchantData.username
                }
                onChange={(e) => modalValueChange(e.target.value, "username")}
              />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MerchantTypes.CreateMerchantFieldType>
            name="email"
            rules={[
              {
                required: true,
                message: "Please input merchant email!",
              },
              {
                type: "email",
                message: "Please input valid email format!",
              },
            ]}
          >
            <div className="text-box">
              <label>Email</label>
              <Input
                placeholder="Enter Email"
                value={
                  props.modalMode === "update"
                    ? props.selectedRecord.email
                    : createMerchantData.email
                }
                onChange={(e) => modalValueChange(e.target.value, "email")}
              />
            </div>
          </Form.Item>
        </Col>

        {props.modalMode === "add" && (
          <>
            <Col span={12}>
              <Form.Item<MerchantTypes.CreateMerchantFieldType>
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input the password!",
                  },
                ]}
              >
                <div className="text-box">
                  <label>Password</label>
                  <Input.Password
                    className="password"
                    placeholder="Enter password"
                    visibilityToggle={{
                      visible: passwordVisible.password,
                      onVisibleChange: () =>
                        togglePasswordVisibility("password"),
                    }}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<MerchantTypes.CreateMerchantFieldType>
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Please input the confirm password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <div className="text-box">
                  <label>Confirm Password</label>
                  <Input.Password
                    className="password"
                    placeholder="Enter confirm password"
                    visibilityToggle={{
                      visible: passwordVisible.confirm_password,
                      onVisibleChange: () =>
                        togglePasswordVisibility("confirm_password"),
                    }}
                  />
                </div>
              </Form.Item>
            </Col>
          </>
        )}

        <Col span={12}>
          <Form.Item<MerchantTypes.CreateMerchantFieldType> name="pointQty">
            <div className="text-box">
              <label>Point Quantity</label>
              <Input
                disabled={props.modalMode === "update"}
                placeholder="Enter point quantity"
                value={
                  props.modalMode === "update"
                    ? props.selectedRecord.point_collection
                    : createMerchantData.pointQty
                }
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  )
                    modalValueChange(e.target.value, "pointQty");
                }}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>

      <Flex gap={10} justify="end" style={{ height: 30 }}>
        <Form.Item>
          <Button type="default" onClick={() => props.setIsModalOpen(false)}>
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={props.submitBtnLoading}
            disabled={
              props.modalMode === "update" &&
              props.selectedRecord === shallowCopy
            }
          >
            {props.modalMode === "add" ? "Add" : "Update"}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default CreateUpdateMerchantForm;
