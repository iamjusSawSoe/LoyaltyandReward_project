export type GetPoints = {
  total_point: number;
};

export type GetHistories = {
  page: number;
  page_size?: number;
};

export type HistoriesResponse = {
  point_history: {
    hasNext: boolean;
    hasPrevious: boolean;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    first: boolean;
    last: boolean;
  } & PointHistories;
};

export type PointHistories = {
  data: HistoryData[];
};

export type HistoryData = {
  item_name: string;
  point_qty: number;
  transaction_type: string;
  transaction_date: string;
};

export type ResponseBody<T> = {
  code: number;
  message: string;
  data: T;
};
