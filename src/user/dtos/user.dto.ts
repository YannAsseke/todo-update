import { IsString, IsBoolean, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class UserDto{
    @IsNotEmpty()
    @IsString()
    readonly name : string

    @IsNotEmpty()
    @IsEmail()
    readonly email : string

    @IsNotEmpty()
    @IsString()
    password : string
}
