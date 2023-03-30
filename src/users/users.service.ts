import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import * as bcrypt          from 'bcryptjs'

import { User }       from '../entities/user.entity';
import { AccountDto } from 'src/auth/dto/account.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    try {
      return await this.userRep.findOne({where: {email}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(account: AccountDto): Promise<User> {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(account.password, salt);
      const now = new Date();
      const user = {
        email:      account.email,
        password:   hashedPassword,
        created_at: now,
        updated_at: now,
      };
      await this.userRep.insert(user);
      return await this.findOne(account.email);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
