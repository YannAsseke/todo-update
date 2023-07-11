import { TodoUpdateDto } from "../dtos/updatetodo.dto";

export class UpdateTodoCommand {
  constructor(
    public readonly id: number,
    public readonly body: TodoUpdateDto,
  ) {}
  }