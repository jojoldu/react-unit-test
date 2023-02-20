import { useCallback } from 'react';

export const LIMIT_OF_SELECTING_JOBS = 5;
const selectedJobs: Set<string> = new Set([]);

export const canBeSelected = useCallback(
  (value: string) => {
    if (selectedJobs.has(value)) {
      return true;
    }

    if (selectedJobs.size !== LIMIT_OF_SELECTING_JOBS) {
      return true;
    }

    return false;
  },
  [selectedJobs],
);
