import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

import { AuthService } from '../auth.service';

import { DecodedJWT } from '../dto/decoded_JWT.dto';


dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  /**
  * Валидация учетных данных
  * @param decodedJWT Информация, раскрытая из токена доступа
  * @returns Информация о пользователе, без пароля
  */
  async validate(decodedJWT: DecodedJWT) {
    try {
      const {email, id} = decodedJWT;
      const userJWTCorrect = await this.authService.checkUserJWT(email, id);
      if (!userJWTCorrect) throw new Error('Не корректный JWT.');
      return {
        user_id: id,
      };
    } catch (error) {
      error.userError = 'Произошла ошибка про проверке токена доступа.';
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}