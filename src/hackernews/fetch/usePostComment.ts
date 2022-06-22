import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { Comment } from '../Comment';
import postComment from './postComment';

export default function usePostComment(queryClient:QueryClient = useQueryClient()) {

  return useMutation((data: Comment) => postComment(data), {
    onMutate: (data: Comment) => {
      const beforeComments = queryClient.getQueryData('users');
      queryClient.setQueryData('comments', (before: any) => {
        return [...before, data];
      });

      return beforeComments;
    },
    onSuccess: () => {
      console.log(`사용자추가`)
    },
  });
}

usePostComment(new StubQueryClient());

class StubQueryClient extends QueryClient {
  private data;
  constructor(getData) {
    super();
    this.data = getData;
  }

  setQueryData<TData>(queryKey: QueryKey, updater: Updater<TData | undefined, TData>, options?: SetDataOptions): TData {
    this.data = updater;
    return this.data;
  }

  getQueriesData<TData = unknown>(filters: QueryFilters): [QueryKey, TData][] {
    return this.data;
  }
}
