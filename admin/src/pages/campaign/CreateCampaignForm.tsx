import { CampaignFieldType } from "@/api/features/campaign/campaign.types";
import { MerchantRouteParams } from "@/api/features/merchant/merchant.type";
import { useFetchMerchant } from "@/api/features/merchant/useFetchMerchant";
import { allowOnlyNumber } from "@/utils/allowOnlyNumber";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import { SearchProps } from "antd/es/input/Search";
import dayjs from "dayjs";
import { Dispatch, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuCheckCheck } from "react-icons/lu";

type Props = {
  onFormSubmit: (formData: CampaignFieldType) => void;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  submitBtnLoading: boolean;
};

const CreateCampaignForm = (props: Props) => {
  const [form] = Form.useForm();
  const [isDateRangeLimit, setIsDateRangeLimit] = useState<boolean>(false);
  const [routeParams, setRouteParams] = useState<MerchantRouteParams>({});
  const [suffixIcon, setSuffixIcon] = useState(<></>);
  const [noData, setNoData] = useState(true);
  const [isStatus, setIsStatus] = useState(false);
  const [isSetFieldsExecuted, setIsSetFieldsExecuted] = useState(false);

  const fetchMerchantQuery = useFetchMerchant(routeParams);

  const initialValues: CampaignFieldType = {
    title: "",
    point: "",
    total_coupons: "",
    type: null,
    username: "",
    dateRange: [],
    format: {
      char_only: false,
      length: "",
      mix_char_num: false,
      number_only: false,
      postfix: "",
      prefix: "",
    },
    valid: {
      is_date_range_limit: false,
      from: "",
      to: "",
    },
  };

  const onFormSubmit = (values: CampaignFieldType) => {
    if (!values.valid?.is_date_range_limit && values.valid) {
      values.valid.from = "";
      values.valid.to = "";
    }

    if (values.valid?.is_date_range_limit && values.dateRange && values.valid) {
      values.valid.from = new Date(
        dayjs(values.dateRange[0]).format("YYYY-MM-DD HH") + ":00:00"
      ).toISOString();
      values.valid.to = new Date(
        dayjs(values.dateRange[1]).format("YYYY-MM-DD HH") + ":00:00"
      ).toISOString();
    }

    if (values.format) {
      const format = {
        prefix: values.format?.prefix,
        postfix: values.format?.postfix,
        length: values.format?.length,
        char_only: values.type === "character",
        number_only: values.type === "number",
        mix_char_num: values.type === "mix",
      };
      values.format = format;
    }

    delete values.type;
    delete values.dateRange;

    console.log(values);

    props.onFormSubmit(values);
  };

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    if (value === routeParams.username) {
      fetchMerchantQuery.refetch();
    } else {
      setRouteParams((prevParams) => ({ ...prevParams, username: value }));
    }
  };

  const onSearchChange = () => {
    setSuffixIcon(<></>);
    setIsStatus(false);
    setNoData(true);
    setIsSetFieldsExecuted(false);
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

  useEffect(() => {
    if (!fetchMerchantQuery.isFetching) {
      if (
        fetchMerchantQuery.data?.merchant &&
        fetchMerchantQuery.data?.merchant?.totalElements > 0
      ) {
        setNoData(false);
        setIsStatus(false);
        setSuffixIcon(
          <LuCheckCheck style={{ color: "green", fontSize: "18px" }} />
        );
      } else if (
        !fetchMerchantQuery.data?.merchant?.data &&
        fetchMerchantQuery.data?.merchant?.totalElements === 0
      ) {
        setNoData(true);
        setIsStatus(true);
        setSuffixIcon(
          <AiOutlineCloseCircle style={{ color: "red", fontSize: "18px" }} />
        );
        form.setFields([
          {
            name: "username",
            errors: ["The username is not found. Please search again."],
          },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMerchantQuery.data?.merchant, fetchMerchantQuery.isFetching]);

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
                message: "Please input the merchant username!",
              },
            ]}
          >
            <div className="search-box" style={{ flexGrow: 1 }}>
              <div className="search-label">
                <label>Username</label>
              </div>
              <Input.Search
                placeholder="Enter username"
                onSearch={onSearch}
                loading={fetchMerchantQuery.isFetching}
                status={isStatus ? "error" : ""}
                onChange={onSearchChange}
                suffix={suffixIcon}
              />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Title</label>
              <Input disabled={noData} placeholder="Enter title" />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <div className="text-box" style={{ flexGrow: 1 }}>
            <label>Date Range Limit</label>
            <Form.Item name={["valid", "is_date_range_limit"]}>
              <Radio.Group
                disabled={noData}
                onChange={(e) => setIsDateRangeLimit(e.target.value)}
              >
                <Radio value={false}> No </Radio>
                <Radio value={true}> Yes </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Col>

        <Col span={12}>
          <div className="text-box" style={{ flexGrow: 1 }}>
            <label>Valid Date</label>
            <Form.Item
              name={"dateRange"}
              rules={
                isDateRangeLimit
                  ? [
                      {
                        required: true,
                        message: "Please input the points!",
                      },
                    ]
                  : []
              }
            >
              <DatePicker.RangePicker
                disabled={!isDateRangeLimit}
                style={{ width: "100%" }}
                format="YYYY-MM-DD HH:mm"
                showTime={{
                  defaultValue: [
                    dayjs().startOf("day"),
                    dayjs().startOf("day"),
                  ],
                  format: "HH",
                }}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col span={12}>
          <Form.Item
            name="total_coupons"
            rules={[
              {
                required: true,
                message: "Please input the total coupons!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Total Coupons</label>
              <Input
                disabled={noData}
                placeholder="Enter total Coupons"
                onKeyDown={(event) => {
                  allowOnlyNumber(event);
                }}
              />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="point"
            rules={[
              {
                required: true,
                message: "Please input the points!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Points</label>
              <Input
                disabled={noData}
                placeholder="Enter points"
                onKeyDown={(event) => {
                  allowOnlyNumber(event);
                }}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>

      <label className="modal-header">Format</label>
      <Row gutter={40}>
        <Col span={12}>
          <Form.Item
            name={["format", "prefix"]}
            rules={[
              {
                required: true,
                message: "Please input the prefix!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Prefix</label>
              <Input disabled={noData} placeholder="Enter prefix" />
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={["format", "postfix"]}
            rules={[
              {
                required: true,
                message: "Please input the postfix!",
              },
            ]}
          >
            <div className="text-box" style={{ flexGrow: 1 }}>
              <label>Postfix</label>
              <Input disabled={noData} placeholder="Enter postfix" />
            </div>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={40}>
        <Col span={12}>
          <div className="text-box" style={{ flexGrow: 1 }}>
            <label>Type</label>
            <br></br>
            <Form.Item
              name="type"
              style={{ marginTop: 8 }}
              rules={[
                {
                  required: true,
                  message: "Please selecct the type!",
                },
              ]}
            >
              <Select
                disabled={noData}
                showSearch
                style={{ width: "100%", marginTop: "5spx" }}
                optionFilterProp="children"
                allowClear
                placeholder="Select a type"
                options={[
                  {
                    value: "character",
                    label: "Character Only",
                  },
                  {
                    value: "number",
                    label: "Number Only",
                  },
                  {
                    value: "mix",
                    label: "Mix Character and Number",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </Col>

        <Col span={12}>
          <div className="text-box" style={{ flexGrow: 1 }}>
            <label>Length</label>
            <Form.Item
              name={["format", "length"]}
              rules={[
                {
                  required: true,
                  message: "Please input the length!",
                },
              ]}
            >
              <Input
                disabled={noData}
                placeholder="Enter length"
                onKeyDown={(event) => {
                  allowOnlyNumber(event);
                }}
              />
            </Form.Item>
          </div>
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
            disabled={noData}
          >
            Create
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default CreateCampaignForm;
