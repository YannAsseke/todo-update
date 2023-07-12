import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository : Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({email : username});

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<string> {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
