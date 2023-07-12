
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoListDto } from './dtos/todo.dto';
// import { TodoService } from './todo.service';
import { TodoUpdateDto } from './dtos/updatetodo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteTodoCommand } from './commands/delete-todo.command';
import { UpdateTodoCommand } from './commands/update-todo.command';
import { CreateTodoCommand } from './commands/create-todo.command';
import { GetTodoQuery } from './queries/get-todo.query';
import { GetTodosQuery } from './queries/get-all-todos.query';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
      ) {}

    @UseGuards(AuthGuard)
    @Get("/all")
     async findAllTodo() {
        const command = new GetTodosQuery();
        return {message : await this.queryBus.execute(command)}
    }

    @Get(":id")
     async findOneTodo(@Param('id') id : number){
        const command = new GetTodoQuery(id);
        return {message : await this.queryBus.execute(command)}
    }

    @Post()
    async createTodo(@Body() body : TodoListDto){
        const command = new CreateTodoCommand(body);
        return {message : await this.commandBus.execute(command)}
    }

    @Patch(':id')
    async updateTodo(@Param('id') id : number, @Body() body : TodoUpdateDto){
        const command = new UpdateTodoCommand(id, body);
        return {message : await this.commandBus.execute(command)}
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id : number){
        const command = new DeleteTodoCommand(id);
        return {message : await this.commandBus.execute(command)}
    }

}
