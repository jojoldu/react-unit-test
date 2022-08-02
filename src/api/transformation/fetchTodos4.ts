import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { plainToInstance } from "class-transformer";

const fetchTodos = async (): Promise<Todos> => {
  const config: AxiosRequestConfig = {
    url: 'todos',
    method: 'GET',
  };

  const response = await axios.request<Todos>(config);
  return plainToInstance<Todos, AxiosResponse['data']>(Todos, response.data);
}

const transformTodoNames = (data: Todos) =>
  data.todos.map((todo) => todo.name?.toUpperCase());

export const useTodosQuery = () =>
  useQuery(['todos'], fetchTodos, {
    // ✅ uses a stable function reference
    select: transformTodoNames,
  });

export class Todo {
  id?: number;
  name?: string;
  done?: boolean;

  constructor() {}

  get upperName() {
    return this.name?.toUpperCase();
  }
}

export class Todos {
  private _todos: Todo[];

  constructor() {
    this._todos = [];
  }

  get inProgressTodos() {
    return this._todos.filter(todo => !todo.done)
  }

  get todos(): Todo[] {
    return this._todos;
  }
}
