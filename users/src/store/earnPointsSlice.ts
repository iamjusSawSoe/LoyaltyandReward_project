import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface PointsState {
  points: number;
}

const initialState: PointsState = {
  points: 0,
};

const earnPointsSlice = createSlice({
  name: "earnPoints",
  initialState,
  reducers: {
    updateEarnPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
  },
});

export const { updateEarnPoints } = earnPointsSlice.actions;

export const selectPoinits = (state: RootState) => state.earnPoints.points;

export default earnPointsSlice.reducer;
