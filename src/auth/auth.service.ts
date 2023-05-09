import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private usersRepo: Repository<Auth>) {}

  async create(user: Auth): Promise<Auth> {
    // const hash = bcrypt.hash(user.getPassword(), 10);
    // user.setPassword(await hash);
    return this.usersRepo.save(user);
  }

  findAll() {
    return `This action returns all auth`;
  }

  async login(email: string, password: string, @Req() req): Promise<Auth> {
    const user = await this.usersRepo.findOneBy({ email: email });
    const errors = [];
    if (!user) {
      errors.push('email is Invalid');
      req.session.flashErrors = errors;
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.getPassword());
      // if (!isMatch) {
      //   errors.push('password Incorrect');
      //   req.session.flashErrors = errors;
      // }
      if (isMatch) {
        return user;
      } else {
        errors.push('password Incorrect');
        req.session.flashErrors = errors;
      }
    }
    return null;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
