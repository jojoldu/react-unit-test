import { Todos } from './Todo';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchTodos = async (): Promise<Todos> => {
  const response = await axios.get('todos')
  return response.data
}

export const useTodosQuery = () => {
  const queryInfo = useQuery(['todos'], fetchTodos)

  return {
    ...queryInfo,
    data: queryInfo.data?.map((todo) => {
      todo.name = todo.name.toUpperCase();
      return todo;
    }),
  }
}
