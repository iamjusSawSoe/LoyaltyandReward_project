import * as MerchantTypes from "@/api/features/merchant/merchant.type";
import { setToast } from "@/store/toastSlice";
import { CopyOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row, Spin } from "antd";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  apiCredentialData?: MerchantTypes.MerchantApiCredentialData;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  onFormSubmit: (formData: MerchantTypes.MerchantApiCredentialData) => void;
  submitBtnLoading?: boolean;
  submitSuccess?: boolean;
  fetchApiLoading: boolean;
};

const ApiCredentialForm = (props: Props) => {
  const [apiCredential, setApiCredential] = useState("");
  const [channel, setChannel] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.submitSuccess) {
      setApiCredential("");
      setChannel("");
    }
  }, [props.submitSuccess]);

  return (
    <Form
      initialValues={props.apiCredentialData}
      className="modal-form"
      autoComplete="off"
      onFinish={props.onFormSubmit}
    >
      <Spin tip="Loading" spinning={props.fetchApiLoading} className="loading">
        <Row gutter={40} style={{ marginTop: "1rem" }}>
          <Col span={12}>
            <label>Api Credential</label>
            <Form.Item<MerchantTypes.MerchantApiCredentialData>
              name="api_key"
              rules={[
                {
                  required: true,
                  message: "Please input Api Credential!",
                },
              ]}
            >
              <Flex gap={10} style={{ marginTop: "0.5rem" }}>
                <Input
                  value={
                    props.apiCredentialData?.api_key
                      ? props.apiCredentialData?.api_key
                      : apiCredential
                  }
                  disabled={!!props.apiCredentialData?.api_key}
                  onChange={(e) => setApiCredential(e.target.value)}
                />
                {props.fetchApiLoading && (
                  <LoadingOutlined style={{ fontSize: "1.25rem" }} />
                )}

                {props.apiCredentialData?.api_key && (
                  <CopyOutlined
                    style={{ fontSize: "1.25rem", cursor: "pointer" }}
                    onClick={() => {
                      if (props.apiCredentialData?.api_key)
                        navigator.clipboard.writeText(
                          props.apiCredentialData.api_key
                        );
                      dispatch(
                        setToast({
                          toastContent: "Api Credential copied to clipboard.",
                          toastType: "success",
                        })
                      );
                    }}
                  />
                )}
              </Flex>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<MerchantTypes.MerchantApiCredentialData>
              name="channel"
              rules={[
                {
                  required: true,
                  message: "Please input channel!",
                },
              ]}
            >
              <div>
                <label>Channel</label>
                <Input
                  style={{ marginTop: "0.5rem" }}
                  disabled={!!props.apiCredentialData?.channel}
                  value={
                    props.apiCredentialData?.channel
                      ? props.apiCredentialData?.channel
                      : channel
                  }
                  onChange={(e) => setChannel(e.target.value)}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Spin>

      <Flex gap={10} justify="end" style={{ height: 30 }}>
        <Form.Item>
          <Button type="default" onClick={() => props.setIsModalOpen(false)}>
            Cancel
          </Button>
        </Form.Item>
        {!props.apiCredentialData?.api_key && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.submitBtnLoading}
            >
              Create
            </Button>
          </Form.Item>
        )}
      </Flex>
    </Form>
  );
};

export default ApiCredentialForm;
