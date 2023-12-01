import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import * as bcrypt          from 'bcryptjs'

import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';

import { AccountDto } from 'src/auth/dto/account.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private configService: ConfigService,
  ) {}

  /**
  * Найти пользователя
  * @param email Е-майл
  * @returns Информация о пользователе
  */
  async findOne(email: string): Promise<User | null> {
    try {
      return await this.userRep.findOne({ where: {email} });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Создать пользователя
  * @param account Учетная запись 
  * @returns Информация о пользователе
  */
  async create(account: AccountDto): Promise<User> {
    try {
      const saltCount = this.configService.get('crypt.salt');
      const salt = bcrypt.genSaltSync(saltCount);
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
