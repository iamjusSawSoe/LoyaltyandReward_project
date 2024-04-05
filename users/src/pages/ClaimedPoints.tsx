import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Points from "../components/Points";
import Button from "../components/common/Button";
import HeaderText from "../components/common/HeaderText";
import type { RootState } from "../store";

export default function ClaimedPoints() {
  const navigate = useNavigate();
  const earnedPoints = useSelector((state: RootState) => state.earnPoints.points);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="claim-points loading outer">
      <div className="inner" />
      <HeaderText className="loading-header header" isMainLogo={true} />

      <div className="container">
        <div className="container__content">
          <Points isLoading={false} label="earned" points={earnedPoints} />
          <p>
            You have received{" "}
            <span className="text-yellow font-bold">{earnedPoints.toLocaleString()} points</span>{" "}
            from purchasing at <span className="text-yellow">Capital Super Market.</span>
          </p>
          <Button text="Add new Point Code" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
