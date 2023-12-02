import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserParam }      from '../decorator/user-param.decorator';

import { AuthService } from './auth.service';

import { UserDto }    from './dto/user.dto';
import { AccountDto } from './dto/account.dto';
import { LoginResponseDto } from './dto/login_response.dto';
import { ErrorResponseDto } from '../filters/dto/error_response.dto';


@Controller('auth')
@ApiTags('Аутентификация')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('registration')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Токен доступа',                  type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: AccountDto,
    description: 'Учетные данные',
  })
  async registration(
    @Body() account: AccountDto,
    ): Promise<LoginResponseDto> {
      return this.authService.registration(account);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Токен доступа',                  type: LoginResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: UserDto,
    description: 'Учетная запись',
  })
  async login(
    @UserParam() user: UserDto,
    ): Promise<LoginResponseDto> {
      return this.authService.login(user);
  }

}