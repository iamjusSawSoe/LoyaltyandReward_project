import type { HistoryBodyProps } from "./HistoryBody";
import HistoryBody from "./HistoryBody";
import HistoryHeader from "./HistoryHeader";
import HistoryLoader from "./HistoryLoader";

type HistoryProps = {
  viewAllLink?: boolean;
  data?: HistoryBodyProps[];
  isLoading: boolean;
  isLoadmore?: boolean;
};

export default function History({ viewAllLink = false, data, isLoading }: HistoryProps) {
  const loader = () => {
    if (viewAllLink || (!viewAllLink && data?.length === 0)) {
      return (
        <>
          <HistoryLoader />
          <HistoryLoader />
          <HistoryLoader />
          <HistoryLoader />
          <HistoryLoader />
        </>
      );
    }
    return;
  };

  return (
    <div className="centered">
      <div className={data === null ? "no-history-data history" : "history"}>
        {viewAllLink ? <HistoryHeader link="view-all-history" /> : <HistoryHeader />}

        {isLoading ? (
          loader()
        ) : data?.length === 0 ? (
          <div>This user has no points</div>
        ) : (
          data?.map((data, index) => (
            <HistoryBody
              key={index}
              itemName={data.itemName}
              date={data.date}
              points={data.points}
            />
          ))
        )}
      </div>
    </div>
  );
}
