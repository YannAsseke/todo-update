import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>,
        private jwtService : JwtService
    ){}

    async createUser(body : UserDto): Promise<any>{
        try {
            const hashPassword = await bcrypt.hash(body.password, 12);
            body.password = hashPassword;
            const user = this.userRepository.create({...body});
            const userSave = await this.userRepository.save(user);

            const {password, ...result} = userSave;
            return result;
             
        } catch (error) {
            return error.message
            
        }
        
    }


    async loginUser(body : LoginUserDto, response : Response) : Promise<any>{
        try {
            const email = body.email;
            const password = body.password;
            const user = await this.userRepository.findOneBy({email});

            if(!user){
                return "User not found"
            }

            if(!await bcrypt.compare(password, user.password)){
                return "Invalid Password"
            }else{
                
                const payload = { sub: user.id, username: user.email };
                
                const jwt = await this.jwtService.signAsync(payload);
                response.cookie('jwt', jwt , {httpOnly : true})
                return {message : "Success"};
            }
            
        } catch (error) {
            return error.message
        }
    }


    async getUser(request : Request){
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if(!data){
                return new UnauthorizedException();
            }

            const user = await this.userRepository.findOneBy({email : data.username});

            const {password, ...result} = user;
            return result;

        } catch (error) {
           return error.message 
        }
    }


    async logoutUser(response : Response){
        response.clearCookie('jwt');

        return "Success"
    }

}
