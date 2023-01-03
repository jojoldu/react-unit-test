import { firstDayOfMonth, formatDate, now } from '../../dateUtil';
import { isNil } from 'lodash-es';
import { EnrolmentProcessedQueryType, QueryType } from './QueryType';

type Context = {
  query: any;
};

export async function getServerSideProps(context: Context) {
  const query = context.query;
  const pageSize = 50;

  const today = now();
  const firstDayOfThisMonth = firstDayOfMonth(today);
  const tab =
    query.tab === 'pending' || isNil(query.tab) ? 'pending' : 'processed';
  const pageNumber = Number(query.pageNumber ?? 1);
  const searchKeyword = String(query.searchKeyword ?? '');

  const startedAt = String(
    query.startedAt ?? formatDate(firstDayOfThisMonth, 'YYYY-MM-DD'),
  );
  const endedAt = String(query.endedAt ?? formatDate(today, 'YYYY-MM-DD'));

  const pendingQueryString: QueryType = {
    pageNumber,
    pageSize,
    searchKeyword,
    sortType: String(query.sortType ?? 'DESC'),
    sortKey: String(query.sortKey ?? 'CREATED_AT'),
    dateRangeType: String(query.dateRangeType ?? 'ALL_RANGE'),
    startedAt,
    endedAt,
  };

  const processedQueryString: EnrolmentProcessedQueryType = {
    pageNumber,
    pageSize,
    searchKeyword,
    sortType: String(query.sortType ?? 'DESC'),
    sortKey: String(query.sortKey ?? 'PROCESSED_AT'),
    status: String(query.status ?? 'ALL'),
    dateRangeType: String(query.dateRangeType ?? 'SELECTED_RANGE'),
    startedAt,
    endedAt,
  };

  return {
    props: {
      tab,
      pendingQueryString,
      processedQueryString,
    },
  };
}
