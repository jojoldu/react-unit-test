import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { formatDate } from './dateUtil';

type DateRangeState = [Date | null, Date | null];

function useRouter() {
  return {
    query: {
      startedAt: '2022-12-31 00:00:00',
      endedAt: '2022-12-31 23:59:59',
    },
  };
}

export const useDateRangeParams = ({
  defaultQuery,
}: {
  defaultQuery: { startedAt: string; endedAt: string };
  method?: 'push' | 'replace';
}): [DateRangeState, (value: DateRangeState) => void] => {
  const router = useRouter();
  const existStartedAt = router.query.startedAt;
  const existEndedAt = router.query.endedAt;

  const serialize = (value: Date | null) => formatDate(value, 'YYYY-MM-DD');
  const deserialize = (value: string) => dayjs(value).toDate();

  const defaultDateRangeState: DateRangeState =
    existStartedAt && existEndedAt
      ? [deserialize(String(existStartedAt)), deserialize(String(existEndedAt))]
      : [
          deserialize(String(defaultQuery.startedAt)),
          deserialize(String(defaultQuery.endedAt)),
        ];

  const [dateRange, setDateRange] = useState<DateRangeState>(
    defaultDateRangeState,
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser router
    if (
      (existStartedAt &&
        deserialize(String(existStartedAt)) !== dateRange[0]) ||
      (existEndedAt && deserialize(String(existEndedAt)) !== dateRange[1])
    ) {
      setDateRange([
        deserialize(String(existStartedAt)),
        deserialize(String(existEndedAt)),
      ]);
    }
  }, [existStartedAt, existEndedAt]);

  const onChange = (_dateRange: DateRangeState) => {
    setDateRange(_dateRange);

    if (!_dateRange[0] || !_dateRange[1]) {
      return;
    }

    const query = {
      ...router.query,
      startedAt: serialize(_dateRange[0]),
      endedAt: serialize(_dateRange[1]),
    };

    return query;
  };

  return [dateRange, onChange];
};
