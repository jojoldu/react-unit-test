import { firstDayOfMonth, formatDate, now } from '../dateUtil';
import { isNil } from 'lodash-es';

type Context = {
  query: any;
};

function getQueryParam(query: any, today = now()) {
  const firstDayOfThisMonth = firstDayOfMonth(today);
  const tab =
    query.tab === 'pending' || isNil(query.tab) ? 'pending' : 'processed';
  const pageNumber = Number(query.pageNumber ?? 1);
  const searchKeyword = String(query.searchKeyword ?? '');

  const startedAt = String(
    query.startedAt ?? formatDate(firstDayOfThisMonth, 'YYYY-MM-DD'),
  );
  const endedAt = String(query.endedAt ?? formatDate(today, 'YYYY-MM-DD'));
  return { tab, pageNumber, searchKeyword, startedAt, endedAt };
}

export async function getServerSideProps(context: Context) {
  const query = context.query;
  const pageSize = 50;

  const { tab, pageNumber, searchKeyword, startedAt, endedAt } =
    getQueryParam(query);

  return {
    props: {
      tab,
      query: {
        pageNumber,
        pageSize,
        searchKeyword,
        sortType: String(query.sortType ?? 'DESC'),
        sortKey: String(query.sortKey ?? 'CREATED_AT'),
        dateRangeType: String(query.dateRangeType ?? 'ALL_RANGE'),
        startedAt,
        endedAt,
      },
    },
  };
}
