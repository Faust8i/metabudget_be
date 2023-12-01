import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy }         from 'passport-local';

import { AuthService } from '../auth.service';

import { User } from '../../entities/user.entity';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
  * Валидация учетных данных
  * @param email Е-майл
  * @param password Пароль
  * @returns Информация о пользователе, без пароля
  */
  async validate(email: string, password: string): Promise<User> {
    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) throw new Error('Не подходящие емайл или пароль.');
      return user;
    } catch (error) {
      error.userError = 'Указанная учетная запись не зарегистрирована.';
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}