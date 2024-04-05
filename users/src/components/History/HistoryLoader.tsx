export default function HistoryLoader() {
  return (
    <>
      <div className="history__body">
        <div>
          <div className="history-loader__label shimmer" />

          <div className="history-loader__date shimmer" />
        </div>
        <div className="history-loader__points shimmer" />
      </div>
      <hr className="history__body__hr" />
    </>
  );
}
