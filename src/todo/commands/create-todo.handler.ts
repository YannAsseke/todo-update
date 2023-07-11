/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from './create-todo.command';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute(command: CreateTodoCommand): Promise<string> {
    try {
      
      const todo = {...command.body}
      console.log(todo);
      await this.todoRepository.save(todo);
      return "Todo created!"
    } catch (error) {
      return error.message;
    }
  }
}
