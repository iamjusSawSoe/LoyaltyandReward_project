import {
  EarnConfigData,
  EarnConfigFormFields,
} from "@/api/features/merchant/merchant.type";
import { allowOnlyNumber } from "@/utils/allowOnlyNumber";
import { Button, Col, Flex, Form, Input, Row, Spin } from "antd";
import { Dispatch, useEffect, useState } from "react";

type Props = {
  earnConfigData?: EarnConfigData;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  onFormSubmit: (formData: EarnConfigFormFields) => void;
  submitBtnLoading?: boolean;
  submitSuccess?: boolean;
  fetchLoading: boolean;
};

const EarnConfigurationForm = (props: Props) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState<
    EarnConfigFormFields | undefined
  >();
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

  useEffect(() => {
    if (props.earnConfigData) {
      form.setFieldsValue(props.earnConfigData);
      setInitialValues({
        name: props.earnConfigData.name,
        earnPercent: props.earnConfigData.earnPercent.toString(),
      });
    }
  }, [form, props.earnConfigData]);

  const formSubmit = (values: EarnConfigFormFields) => {
    props.onFormSubmit(values);
  };

  const handleValuesChange = (_: unknown, allValues: EarnConfigFormFields) => {
    if (initialValues) {
      setIsUpdateDisabled(
        JSON.stringify(initialValues) === JSON.stringify(allValues)
      );
    }
  };

  return (
    <Form
      initialValues={props.earnConfigData}
      className="modal-form"
      autoComplete="off"
      onFinish={formSubmit}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Spin tip="Loading" spinning={props.fetchLoading} className="loading">
        <Row gutter={40} style={{ marginTop: "1rem" }}>
          <Col span={12}>
            <label>Name</label>
            <Flex gap={10} style={{ marginTop: "0.5rem" }}>
              <Form.Item<EarnConfigFormFields>
                name="name"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Flex>
          </Col>
          <Col span={12}>
            <div>
              <label>Earn Percentage</label>
              <Form.Item<EarnConfigFormFields>
                name="earnPercent"
                rules={[
                  {
                    required: true,
                    message: "Please input earn percent!",
                  },
                ]}
              >
                <Input
                  style={{ marginTop: "0.5rem" }}
                  onKeyDown={(event) => {
                    allowOnlyNumber(event);
                  }}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Spin>

      <Flex gap={10} justify="end" style={{ height: 30 }}>
        <Form.Item>
          <Button type="default" onClick={() => props.setIsModalOpen(false)}>
            Cancel
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={props.fetchLoading || isUpdateDisabled}
            type="primary"
            htmlType="submit"
            loading={props.submitBtnLoading}
          >
            Update
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default EarnConfigurationForm;
