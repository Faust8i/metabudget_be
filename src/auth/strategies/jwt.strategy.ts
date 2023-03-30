import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants }         from '../../configs/jwt-const';

import { AuthService } from '../auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const userJWTCorrect = await this.authService.checkUserJWT(payload.email, payload.id);
    if (!userJWTCorrect)
      throw new HttpException(new Error('Не корректный JWT.'), HttpStatus.UNAUTHORIZED);
    return {
      user_id: payload.id,
    };
  }
}