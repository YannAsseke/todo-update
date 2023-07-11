/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
// import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTodoHandler } from './commands/create-todo.handler';
import { UpdateTodoHandler } from './commands/update-todo.handler';
import { DeleteTodoHandler } from './commands/delete-todo.handler';
import { GetTodoHandler } from './queries/get-todo.handler';
import { GetTodosHandler } from './queries/get-all-todos.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports : [TypeOrmModule.forFeature([Todo]),
            CqrsModule,],
  controllers: [TodoController],
  providers: [CreateTodoHandler,
              UpdateTodoHandler,
              DeleteTodoHandler,
              GetTodoHandler,
              GetTodosHandler,]
})
export class TodoModule {}
