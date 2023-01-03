interface PageType {
  pageNumber: number;
  pageSize: number;
}

interface SearchQueryType {
  searchKeyword?: string;
  sortType?: string;
  sortKey?: string;
}

interface DateQueryType {
  startedAt?: string;
  endedAt?: string;
  dateRangeType: string;
}

export interface EnrolmentPendingQueryType
  extends PageType,
    SearchQueryType,
    DateQueryType {}

export interface EnrolmentProcessedQueryType
  extends PageType,
    SearchQueryType,
    DateQueryType {
  status: string;
}
