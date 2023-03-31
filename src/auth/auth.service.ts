import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt    from 'bcryptjs'

import { UsersService } from '../users/users.service';

import { UserDto }    from './dto/user.dto';
import { AccountDto } from './dto/account.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService:   JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<object | null> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        return user;
      }
      return null;
    } catch (error) {
      error.userError = 'Произошла ошибка при проверке пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkUserJWT(email: string, id: number): Promise<boolean> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && user.user_id === id)
        return true;
      return false;
    } catch (error) {
      error.userError = 'Произошла ошибка при проверке пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registration(account: AccountDto): Promise<object>  {
    try {
      let user = await this.usersService.findOne(account.email);
      if (user)
        throw new HttpException(new Error('Данный емайл занят.'), HttpStatus.CONFLICT);
      user = await this.usersService.create(account);
      return await this.login(user);
    } catch (error) {
      error.userError = 'Произошла ошибка при регистрации пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: UserDto): Promise<object>  {
    try {
      const payload = {
        email: user.email,
        id:    user.user_id,
      };
      return {
        access_token: this.jwtService.sign(payload)
      }
    } catch (error) {
      error.userError = 'Произошла ошибка при входе пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}