import { useCallback, useEffect, useState } from "react";
import { useGetHistories } from "../api/features/points/getPoints";
import type { GetHistories } from "../api/features/points/interface";
import type { HistoryBodyProps } from "../components/History/HistoryBody";

type UseHistoriesProps = GetHistories;

const useHistories = ({ page, page_size }: UseHistoriesProps) => {
  const [loadingHistories, setLoadingHistories] = useState(false);
  const [historiesItem, setHistoriesItem] = useState<HistoryBodyProps[]>([]);
  const [loadmoreClicked, setLoadmoreClicked] = useState(false);

  const {
    data: histories,
    isFetching,
    isSuccess,
    isRefetching,
    refetch,
  } = useGetHistories({
    page: page,
    page_size: page_size,
  });

  const myHistories = useCallback(() => {
    const transformedHistories: HistoryBodyProps[] = [];
    if (histories && histories.point_history.data?.length > 0) {
      histories?.point_history?.data.forEach((item) => {
        transformedHistories.push({
          itemName: item.item_name,
          date: item.transaction_date,
          points: item.point_qty,
        });
      });
    }
    return transformedHistories;
  }, [histories]);

  useEffect(() => {
    if (isFetching) {
      setLoadingHistories(true);
    }
    if (isSuccess) {
      setLoadingHistories(false);
      setLoadmoreClicked(false);
    }

    if (isRefetching) {
      setLoadmoreClicked(true);
    }
  }, [isFetching, isSuccess, isRefetching]);

  useEffect(() => {
    if (page_size === 10) {
      if (isSuccess) {
        const transformedHistories: HistoryBodyProps[] = [];
        if (histories) {
          histories?.point_history?.data?.forEach((item) => {
            transformedHistories.push({
              itemName: item.item_name,
              date: item.transaction_date,
              points: item.point_qty,
            });
          });
        }

        setHistoriesItem((prevData) => [...prevData, ...transformedHistories]);
      }
    }
  }, [histories, histories?.point_history, isSuccess, page_size]);

  return {
    histories,
    loadingHistories,
    historiesItem,
    myHistories,
    setLoadmoreClicked,
    refetch,
    loadmoreClicked,
  };
};

export default useHistories;
