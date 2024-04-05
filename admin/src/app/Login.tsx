import { setToast } from "@/store/toastSlice";
import { Button, Card, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginFieldType, useDoLogin } from "../api/features/login/login";
import { updateToken } from "../store/tokenSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { mutate, data, isPending } = useDoLogin();

  const onFinish = (values: LoginFieldType) => {
    mutate({
      username: values.username,
      password: values.password,
    });
  };

  useEffect(() => {
    if (data) {
      dispatch(
        updateToken({
          token: data.admin_info.token,
          tokenExpireTime: data.admin_info.expires_at,
          refreshToken: data.admin_info.refresh_token,
        })
      );

      dispatch(
        setToast({
          toastContent: "Login successfully!",
          toastType: "success",
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <Card
        title="Welcome to Loyalty & Reward Admin Panel"
        style={{ width: 400, border: "3px solid #f0f0f0" }}
      >
        <Form
          layout="horizontal"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<LoginFieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginFieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<LoginFieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
