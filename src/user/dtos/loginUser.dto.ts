import { IsString, IsBoolean, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class LoginUserDto{

    @IsNotEmpty()
    @IsEmail()
    readonly email : string

    @IsNotEmpty()
    @IsString()
    password : string
}
