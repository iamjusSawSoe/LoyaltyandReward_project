import { useEffect, useState } from "react";
import { useGetPoints } from "../api/features/points/getPoints";

const usePoints = () => {
  const [loadingPoints, setLoadingPoints] = useState(false);

  const points = useGetPoints();

  useEffect(() => {
    if (points.isFetching) {
      setLoadingPoints(true);
    }
    if (points.isSuccess) {
      setLoadingPoints(false);
    }
  }, [points.isFetching, points.isSuccess]);

  return { points, loadingPoints };
};

export default usePoints;
