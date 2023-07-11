import { TodoListDto } from '../dtos/todo.dto';

export class CreateTodoCommand {
  constructor(public readonly body: TodoListDto) {}
}
