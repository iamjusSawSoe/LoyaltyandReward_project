import { formatDate } from "../../utils/formatDate";

export type HistoryBodyProps = {
  itemName: string;
  date: string;
  points: number;
};

export default function HistoryBody({ itemName, date, points }: HistoryBodyProps) {
  return (
    <>
      <div className="history__body">
        <div>
          <h4>{itemName}</h4>
          <span>{formatDate(date)}</span>
        </div>
        <div className="history__points">+ {points} pts</div>
      </div>
      <hr className="history__body__hr" />
    </>
  );
}
