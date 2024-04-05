import { MerchantData } from "@/api/features/merchant/merchant.type";
import { allowOnlyNumber } from "@/utils/allowOnlyNumber";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popconfirm } from "antd";
import { Dispatch } from "react";

type Props = {
  record: MerchantData;
  index: number;
  currentPopConfirmIndex: number;
  setCurrentPopConfirmIndex: Dispatch<React.SetStateAction<number>>;
  onFormSubmit: (formData: MerchantData) => void;
  isPopConfirmOpened: boolean[];
  setIsPopConfirmOpened: Dispatch<React.SetStateAction<boolean[]>>;
  submitLoading: boolean;
  creditPoint: string;
  setCreditPoint: Dispatch<React.SetStateAction<string>>;
};

const PointsCreditForm = (props: Props) => {
  const showPopconfirm = (index: number, type: string) => {
    if (type === "credit") {
      props.setIsPopConfirmOpened((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  return (
    <Flex gap={20}>
      <Popconfirm
        title="Enter points you want to credit."
        icon={<InfoCircleOutlined style={{ color: "blue" }} />}
        onConfirm={() => props.onFormSubmit(props.record)}
        okButtonProps={{ loading: props.submitLoading }}
        onCancel={() => {
          props.setCreditPoint("");
          props.setIsPopConfirmOpened((prevState) => {
            const newState = [...prevState];
            newState[props.index] = false;
            return newState;
          });
        }}
        onOpenChange={() => {
          props.setCurrentPopConfirmIndex(props.index);
        }}
        open={props.isPopConfirmOpened[props.index]}
        description={
          <>
            <Input
              style={{ margin: "0.25rem 0" }}
              value={props.creditPoint}
              onKeyDown={(event) => {
                allowOnlyNumber(event);
              }}
              onChange={(e) => {
                props.setCreditPoint(e.target.value);
              }}
            />
          </>
        }
      >
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => showPopconfirm(props.index, "credit")}
        >
          Credit
        </Button>
      </Popconfirm>
    </Flex>
  );
};

export default PointsCreditForm;
