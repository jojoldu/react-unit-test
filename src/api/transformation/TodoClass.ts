export class TodoClass {
  id?: number;
  name?: string;
  done?: boolean;

  constructor() {
  }

  get upperName() {
    return this.name?.toUpperCase();
  }
}

export class TodoClasses {
  private _todos: TodoClass[];

  constructor() {
    this._todos = [];
  }

  get inProgressTodos() {
    return this._todos.filter((todo) => !todo.done);
  }

  get todos(): TodoClass[] {
    return this._todos;
  }
}