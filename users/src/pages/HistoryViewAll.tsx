import { useState } from "react";
import type { GetHistories } from "../api/features/points/interface";
import History from "../components/History/History";
import HistoryLoader from "../components/History/HistoryLoader";
import Points from "../components/Points";
import Button from "../components/common/Button";
import HeaderText from "../components/common/HeaderText";
import useHistories from "../hooks/useHistories";
import usePoints from "../hooks/usePoints";

export default function HistoryViewAll() {
  const [reqHistoryData, setReqHistoryData] = useState<GetHistories>({
    page: 0,
    page_size: 10,
  });

  const {
    histories,
    loadingHistories,
    historiesItem,
    setLoadmoreClicked,
    refetch,
    loadmoreClicked,
  } = useHistories(reqHistoryData);

  const { points, loadingPoints } = usePoints();

  const handleLoadMore = () => {
    setReqHistoryData((prevData) => ({
      page: prevData.page + 1,
      page_size: 10,
    }));
    setLoadmoreClicked(true);

    refetch();
  };

  return (
    <div className="view-all outer">
      <div className="inner" />

      <div className="container">
        <div className="container__content">
          <HeaderText isMainLogo={false} />

          <div className="points-container">
            <Points
              isLoading={loadingPoints}
              label="total points"
              points={points.data?.total_point}
            />
          </div>
          <History isLoadmore={loadmoreClicked} isLoading={loadingHistories} data={historiesItem} />

          {loadmoreClicked ? (
            <div className="history loadmore-clicked ">
              <HistoryLoader />
              <HistoryLoader />
              <HistoryLoader />
            </div>
          ) : (
            histories?.point_history.hasNext && (
              <Button text="Load more" buttonType="fill" onClick={handleLoadMore} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
