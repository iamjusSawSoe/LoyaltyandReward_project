import { AdminCreateReqData } from "@/api/features/adminUserAccount/adminUser.type";
import { PasswordVisibilityState } from "@/api/features/merchant/merchant.type";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import { Dispatch, useEffect, useState } from "react";

type Props = {
  onFormSubmit: (formData: AdminCreateReqData) => void;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  submitBtnLoading: boolean;
};

const CreateAdminUserAccForm = (props: Props) => {
  const [form] = Form.useForm();
  const [isSetFieldsExecuted, setIsSetFieldsExecuted] = useState(false);
  const [passwordVisible, setPasswordVisible] =
    useState<PasswordVisibilityState>({
      password: false,
      confirm_password: false,
    });

  const initialValues: AdminCreateReqData = {
    name: "",
    password: "",
    confirm_password: "",
    username: "",
  };

  const onFormSubmit = (values: AdminCreateReqData) => {
    props.onFormSubmit(values);
  };

  useEffect(() => {
    if (!isSetFieldsExecuted) {
      form.setFields([
        { name: "point", errors: [] },
        { name: "total_coupons", errors: [] },
        { name: "type", errors: [] },
        { name: "title", errors: [] },
        { name: ["format", "prefix"], errors: [] },
        { name: ["format", "postfix"], errors: [] },
        { name: ["format", "length"], errors: [] },
      ]);

      setIsSetFieldsExecuted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetFieldsExecuted]);

  const togglePasswordVisibility = (field: keyof PasswordVisibilityState) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <Form
      className="modal-form"
      autoComplete="off"
      onFinish={onFormSubmit}
      initialValues={initialValues}
      form={form}
    >
      <Row gutter={40}>
        <Col span={12}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input username!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Username</label>
              <Input placeholder="Enter username" />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Name</label>
              <Input placeholder="Enter name" />
            </div>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col span={12}>
          <Form.Item
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
                  onVisibleChange: () => togglePasswordVisibility("password"),
                }}
              />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
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
          >
            Create
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default CreateAdminUserAccForm;
