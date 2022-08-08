import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { plainToInstance } from 'class-transformer';
import { TodoClasses } from "./TodoClass";

const fetchTodos = async (): Promise<TodoClasses> => {
  const config: AxiosRequestConfig = {
    url: 'todos',
    method: 'GET',
  };

  const response = await axios.request<TodoClasses>(config);
  return plainToInstance<TodoClasses, AxiosResponse['data']>(TodoClasses, response.data);
};

const transformTodoNames = (data: TodoClasses) =>
  data.todos.map((todo) => todo.name?.toUpperCase());

export const useTodosQuery = () =>
  useQuery(['todos'], fetchTodos, {
    // ✅ uses a stable function reference
    select: transformTodoNames,
  });

