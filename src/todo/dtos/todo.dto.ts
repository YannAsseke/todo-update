import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class TodoListDto{
    @IsNotEmpty()
    @IsString()
    
    readonly title : string
    @IsNotEmpty()
    @IsString()
    readonly description : string

    readonly status : boolean
}
