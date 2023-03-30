import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserParam }      from '../decorator/user-param.decorator';

import { UserDto }    from './dto/user.dto';
import { AccountDto } from './dto/account.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('registration')
  async registration(
    @Body() account: AccountDto,
    ) {
      return this.authService.registration(account);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @UserParam() user: UserDto,
    ) {
      return this.authService.login(user);
  }

}
