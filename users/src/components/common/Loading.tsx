import { Box, LinearProgress } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { updateLoading, updatePause } from "../../store/loadingSlice";
import HeaderText from "./HeaderText";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#3f7cc2",
    border: "1px solid #94b6d7",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#FBF574" : "#308fe8",
  },
}));

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const pause = useSelector((state: RootState) => state.loading.pause);
  const route = useSelector((state: RootState) => state.loading.route);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;
    if (!pause && progress < 70) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress >= 70 ? 70 : prevProgress + 10;
          if (nextProgress === 70) clearInterval(interval);
          return nextProgress;
        });
      }, 100);
    } else if (pause && progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress >= 100 ? 100 : prevProgress + 10;
          return nextProgress;
        });
      }, 100);
    }

    if (progress === 100) {
      clearInterval(interval);
      dispatch(updateLoading(false));
      dispatch(updatePause(false));
      navigate(route);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dispatch, pause, progress, navigate, route]);

  return (
    <div className="loading outer">
      <div className="inner" />

      <HeaderText className="loading-header header" isMainLogo={true} />

      <div className="container">
        <div className="container__content">
          <div className="progress">
            <label className="progress__label">Please wait...</label>
            <Box sx={{ width: "100%" }} className="progress__bar">
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
