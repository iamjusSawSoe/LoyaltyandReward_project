import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { ClaimPoints, ClaimPointsData } from "./interface";

const claimPoints = async (claimPointsReqData: ClaimPoints): Promise<ClaimPointsData> => {
  const res = await axios.post("/customer/claim", claimPointsReqData);
  return res.data;
};

export const useClaimMutation = () => {
  return useMutation({
    mutationFn: claimPoints,
  });
};
