import { Todos } from './Todo';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchTodos = async (): Promise<Todos> => {
  const response = await axios.get('todos')
  return response.data
}

const transformTodoNames = (data: Todos) =>
  data.map((todo) => todo.name.toUpperCase());

export const useTodosQuery = () =>
  useQuery(['todos'], fetchTodos, {
    // ✅ uses a stable function reference
    select: transformTodoNames,
  });
