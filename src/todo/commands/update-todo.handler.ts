/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoCommand } from './update-todo.command';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<string> {
    const id = command.id;
    
    const { body } = command;
    const todo = await this.todoRepository.findOneBy({id});
    
    if (!todo) {
        return "Todo not found";
    }
    try {
        await this.todoRepository.save({...todo, ...body})
        console.log({...body});
        return "Todo updated!"
    } catch (error) {
        return error.message
        
    } 
  }
}
