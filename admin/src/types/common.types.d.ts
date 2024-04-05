export type RouteParams = {
  page?: number;
  pageSize?: number;
};

export type Pagination = {
  hasNext: boolean;
  hasPrevious: boolean;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  nextPage: boolean;
  previousPage: boolean;
  first: boolean;
  last: boolean;
};
