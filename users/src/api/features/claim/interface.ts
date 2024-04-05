export type ClaimPoints = {
  phone_number: string;
  point_code: string;
};

export type ClaimPointsResponse = {
  code: number;
  message: string;
  timestamp: string;
  data: ClaimPointsData;
};

export type ClaimPointsData = {
  message: string;
  points: number;
};
