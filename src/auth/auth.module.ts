import { Module }         from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtConstants } from '../configs/jwt-const';

import { UsersModule } from '../users/users.module';

import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy }   from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { LocalAuthGuard } from './guards/local-auth.guard'


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    LocalStrategy, JwtStrategy,
    LocalAuthGuard],
})
export class AuthModule {}