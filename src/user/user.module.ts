import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports : [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
                TypeOrmModule.forFeature([User]),
                JwtModule.register({
                    global : true,
                    secret : process.env.JWT_SECRET,
                    signOptions : {expiresIn : "1d"}
                })
            ],
            controllers: [UserController],
            providers: [UserService],
            exports:[UserModule]
})
export class UserModule {}
