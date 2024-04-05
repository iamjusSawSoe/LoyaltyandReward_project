import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

type HistoryHeaderProps = {
  link?: string;
};

export default function HistoryHeader({ link }: HistoryHeaderProps) {
  return (
    <>
      <div className="history__header">
        <h4>History</h4>
        {link && (
          <Link to={`/${link}`}>
            <span>view all</span>
            <ArrowForwardIosIcon sx={{ fontSize: "12px", marginLeft: "5px", paddingTop: "2px" }} />
          </Link>
        )}
      </div>
      <hr className="history__header__hr" />
    </>
  );
}
