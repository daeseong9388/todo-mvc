import { v4 as uuidv4 } from 'uuid';

export interface PlainTodo {
  id: string;
  label: string;
  done: boolean;
}

export type InputTodo = Partial<PlainTodo>;

export interface Update {
  setDone: () => Todo;
  setReady: () => Todo;
  edit: (label: string) => Todo;
  toggleDone: () => Todo;
}

export class Todo implements PlainTodo, Update {
  id: string;
  label: string;
  done: boolean;
  constructor(todo: InputTodo) {
    this.id = todo.id ?? uuidv4();
    this.label = todo.label ?? '';
    this.done = todo.done ?? false;
  }

  setDone(): Todo {
    this.done = true;
    return this;
  }

  setReady(): Todo {
    this.done = false;
    return this;
  }

  edit(label: string): Todo {
    this.label = label;
    return this;
  }

  toggleDone(): Todo {
    this.done = !this.done;
    return this;
  }

  toPlain(): PlainTodo {
    return { ...this };
  }
}
