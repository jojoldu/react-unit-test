export interface EnrolmentPendingQueryType {
  pageNumber: number;
  pageSize: number;
  searchKeyword?: string;
  sortType?: string;
  sortKey?: string;
  startedAt?: string;
  endedAt?: string;
  dateRangeType: string;
}

export interface EnrolmentProcessedQueryType {
  pageNumber: number;
  pageSize: number;
  searchKeyword?: string;
  sortType?: string;
  sortKey?: string;
  startedAt?: string;
  endedAt?: string;
  dateRangeType: string;
  status: string;
}
