/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from './get-todo.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
      ) {}

  async execute(query: GetTodoQuery): Promise<Todo> {
    const { id } = query;
    return this.todoRepository.findOneBy({id});
  }
}