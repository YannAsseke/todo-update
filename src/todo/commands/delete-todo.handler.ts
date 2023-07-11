/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoCommand } from './delete-todo.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute(command: DeleteTodoCommand): Promise<void> {
    const { id } = command;
    await this.todoRepository.delete(id);
  }
}