import { PointCreditDebitRequest } from "@/api/features/merchant/merchant.type";
import { usePostPointsCredit } from "@/api/features/merchant/postPointsCredit";
import { setToast } from "@/store/toastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  refetch: () => void;
  currentPopConfirmIndex: number;
  setIsPopConfirmOpened: React.Dispatch<React.SetStateAction<boolean[]>>;
};

const usePointsCredit = (props: Props) => {
  const pointsCreditMutation = usePostPointsCredit();
  const dispatch = useDispatch();

  const handlePointsCredit = (values: PointCreditDebitRequest) => {
    pointsCreditMutation.mutateAsync({
      merchantName: values.merchantName,
      point_qty: Number(values.point_qty),
    });
  };

  useEffect(() => {
    if (pointsCreditMutation.data) {
      props.refetch();
      props.setIsPopConfirmOpened((prevState) => {
        const newState = [...prevState];
        newState[props.currentPopConfirmIndex] = false;
        return newState;
      });
      dispatch(
        setToast({
          toastContent: "Points Credit added successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsCreditMutation.data]);

  return {
    handlePointsCredit,
    isLoading: pointsCreditMutation.isPending,
    isSuccess: pointsCreditMutation.isSuccess,
  };
};

export default usePointsCredit;
