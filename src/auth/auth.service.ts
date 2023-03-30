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
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async checkUserJWT(email: string, id: number): Promise<boolean> {
    const user = await this.usersService.findOne(email);
    if (user && user.user_id === id)
      return true;
    return false;
  }

  async registration(account: AccountDto): Promise<object>  {
    let user = await this.usersService.findOne(account.email);
    if (user)
      throw new HttpException(new Error('Данный емайл занят.'), HttpStatus.CONFLICT);
    user = await this.usersService.create(account);
    return await this.login(user);
  }

  async login(user: UserDto): Promise<object>  {
    const payload = {
      email: user.email,
      id:    user.user_id,
    };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
  
}