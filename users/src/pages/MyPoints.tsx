import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import footerImg from "../assets/BU Rewards 2x.png";
import History from "../components/History/History";
import Points from "../components/Points";
import Button from "../components/common/Button";
import HeaderText from "../components/common/HeaderText";
import useHistories from "../hooks/useHistories";
import usePoints from "../hooks/usePoints";

export default function MyPoints() {
  const navigate = useNavigate();
  const { histories, loadingHistories, myHistories } = useHistories({
    page: 0,
    page_size: 5,
  });
  const { points, loadingPoints } = usePoints();

  const checkPoints = useCallback(() => {
    if (histories) {
      if (histories.point_history.data?.length > 1) {
        return "my-points outer";
      } else if (histories.point_history.data === null) {
        return "no-points outer";
      }
    }
    return "my-points outer";
  }, [histories]);

  const goToClaimPage = () => {
    navigate("/");
  };

  return (
    <div className={checkPoints()}>
      <div className="inner" />

      <div className=" container ">
        <div className="container__content">
          <HeaderText isMainLogo={false} />

          <div className="points-container">
            <Points
              isLoading={loadingPoints}
              label="total points"
              points={points.data?.total_point}
            />
          </div>
          <History isLoading={loadingHistories} viewAllLink={true} data={myHistories()} />
        </div>
      </div>
      <div className=" my-points__footer">
        <Button text="Claim Your Rewards" onClick={goToClaimPage} />

        <img src={footerImg} className="my-points__footer-img" />
      </div>
    </div>
  );
}
