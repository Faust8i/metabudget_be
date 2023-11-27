import { Module }         from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService }  from '@nestjs/config';

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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret_key'),
        signOptions: { expiresIn: configService.get('jwt.life_time') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy, JwtStrategy, 
    LocalAuthGuard],
})
export class AuthModule {}