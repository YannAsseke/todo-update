import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoListDto } from './dtos/todo.dto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    
    constructor(
        @InjectRepository(Todo)
        private readonly TodoRepository : Repository<Todo>,
    ){}

    async findAllTodo(){
        try {
            return await this.TodoRepository.find()
        } catch (error) {
            return error.message
        }
    }

    async findOneTodo(id : number){
        try {
            return await this.TodoRepository.findOneBy({id})
        } catch (error) {
            return error.message
        }
    } 

    async createTodo(body: TodoListDto) : Promise<string>{
        try {
            const todo = this.TodoRepository.create({...body});
            await this.TodoRepository.save(todo)
            return "Todo Created!"
        } catch (error) {
            return error.message
            
        }
    }

  async updateTodo(id: number, body: TodoListDto) {

        const updatedTodo = await this.TodoRepository.findOneBy({id});
        console.log(updatedTodo);
        if(!updatedTodo){
            return "Todo not found";
        }

        try {
            await this.TodoRepository.save({...updatedTodo, ...body})
            return "Todo updated!"
        } catch (error) {
            return error.message
            
        } 
    }

    async deleteTodo(id: number) {
        try {
            await this.TodoRepository.delete({id})
            return "Todo deleted!"
        } catch (error) {
            return "error.message"
        }
    }
}
