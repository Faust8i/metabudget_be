import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt    from 'bcryptjs'

import { UsersService } from '../users/users.service';

import { User } from '../entities/user.entity';

import { UserDto }    from './dto/user.dto';
import { AccountDto } from './dto/account.dto';
import { LoginResponseDto } from './dto/login_response.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService:   JwtService,
  ) {}

  /**
  * Валидация учетных данных
  * @param email Е-майл
  * @param password Пароль
  * @returns Информация о пользователе, без пароля
  */
  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        return user;
      }
      return null;
    } catch (error) {
      error.userError = 'Произошла ошибка при валидации учетных данных.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Верификация е-майла
  * @param email Е-майл
  * @param id Регистрационный номер пользователя в системе
  * @returns Соответствие е-майла пользователя его регистрационному номеру в системе
  */
  async checkUserJWT(email: string, id: number): Promise<boolean> {
    try {
      const user = await this.usersService.findOne(email);
      return user?.user_id === id;
    } catch (error) {
      error.userError = 'Произошла ошибка при проверке пользователя.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Регистрация нового пользователя
  * @param user Учетные данные
  * @returns Токен доступа
  */
  async registration(account: AccountDto): Promise<LoginResponseDto> {
    try {
      let user = await this.usersService.findOne(account.email);
      if (user) throw new Error('Данный емайл занят.');
      user = await this.usersService.create(account);
      return await this.login(user);
    } catch (error) {
      error.userError = 'Произошла ошибка при регистрации пользователя.';
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  /**
  * Аутентификация пользователя
  * @param user Пользователь
  * @returns Токен доступа
  */
  async login(user: UserDto): Promise<LoginResponseDto>  {
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
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
  
}