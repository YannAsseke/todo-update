import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { Response , Request } from 'express';


@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}


    @Post("/create")
    async createUser(@Body() body : UserDto){
        return await this.userService.createUser(body);
    }

    @Post("/login")
    async loginUser(@Body() body : LoginUserDto, @Res({passthrough : true}) response : Response){
        return await this.userService.loginUser(body, response);
    }

    @Get("/get-user")
    async getUser(@Req() request : Request){
        return await this.userService.getUser(request);
    }

    @Post("/logout")
    async logoutUser(@Res({passthrough : true}) response : Response){
        return await this.userService.logoutUser(response);
    }

}
