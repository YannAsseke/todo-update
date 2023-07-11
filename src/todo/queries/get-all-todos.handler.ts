/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from './get-all-todos.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
      ) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}