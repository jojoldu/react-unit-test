import { QueryClient, QueryClientProvider } from "react-query";
import { ReactElement } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useFetchComments from './fetch/useFetchComments';
import { Comment } from './Comment';

test('fetchComments', async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  const wrapper = ({ children }: { children: ReactElement }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const {result, waitFor} = renderHook(() => useFetchComments(), {wrapper});

  await waitFor(() => result.current.isSuccess);

  const actual: Comment[] | undefined = result.current.data;
  expect(actual).toHaveLength(3);
});
