import { PlainTodo, Todo } from './todo';

export interface CUD {
  add: (label: string) => TodoList;
  delete: (id: string) => TodoList;
  edit: (id: string, label: string) => TodoList;
  setDone: (id: string) => TodoList;
  toggleDone: (id: string) => TodoList;
  clearDone: () => TodoList;
}

export type FilterType = 'ALL' | 'DONE' | 'READY';

export interface READ {
  length: number;
  numReadyTodos: number;
  isAllCompleted: boolean;
  filter: (type: FilterType) => PlainTodo[];
}

export class TodoList implements CUD, READ {
  private readonly todoList: Todo[];
  constructor(todoList?: Todo[]) {
    this.todoList = todoList ?? [];
  }

  add(label: string): TodoList {
    return new TodoList([new Todo(label), ...this.todoList]);
  }

  delete(id: string): TodoList {
    return new TodoList(this.todoList.filter((el) => el.id !== id));
  }

  edit(id: string, label: string): TodoList {
    return new TodoList(
      this.todoList.map((el) => (el.id === id ? el.edit(label) : el))
    );
  }

  setDone(id: string): TodoList {
    return new TodoList(
      this.todoList.map((el) => (el.id === id ? el.setDone() : el))
    );
  }

  toggleDone(id: string): TodoList {
    return new TodoList(
      this.todoList.map((el) => (el.id === id ? el.toggleDone() : el))
    );
  }

  clearDone(): TodoList {
    return new TodoList(this.todoList.filter((el) => !el.done));
  }

  markAllDone(): TodoList {
    return new TodoList(this.todoList.map((el) => el.setDone()));
  }

  markAllReady(): TodoList {
    return new TodoList(this.todoList.map((el) => el.setReady()));
  }

  filter(type: FilterType): PlainTodo[] {
    switch (type) {
      case 'ALL':
        return this.todoList.map((el) => el.toPlain());
      case 'READY':
        return this.todoList.filter((el) => !el.done).map((el) => el.toPlain());
      case 'DONE':
        return this.todoList.filter((el) => el.done).map((el) => el.toPlain());
    }
  }

  get length(): number {
    return this.todoList.length;
  }

  get numReadyTodos(): number {
    return this.todoList.filter((el) => !el.done).length;
  }

  get isAllCompleted(): boolean {
    
    return this.length > 0 && this.numReadyTodos === 0;
  }
}
