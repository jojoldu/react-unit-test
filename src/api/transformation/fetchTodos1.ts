import { Todos } from './Todo';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchTodos = async (): Promise<Todos> => {
  const response = await axios.get("todos", options);
  const data: Todos = response.data;

  return data.map((todo) => {
    todo.name = todo.name.toUpperCase();
    return todo;
  });
};

export const useTodosQuery = () => useQuery(['todos'], fetchTodos);
