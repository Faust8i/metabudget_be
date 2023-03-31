import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../decorator/user-jwt.decorator';

import { SharesService } from './shares.service';

import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';


@UseGuards(JwtAuthGuard)
@Controller('shares')
export class SharesController {
  constructor(
    private readonly SharesService: SharesService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    share:   CreateShareDto,
    ) {
      return await this.SharesService.create(user_id, share);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.SharesService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id:  number,
    @Param('id') share_id: string,
    ) {
      return await this.SharesService.findOne(user_id, +share_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id:  number,
    @Param('id') share_id: string,
    @Body()      category: UpdateShareDto,
    ) {
      return await this.SharesService.delete(user_id, +share_id, category);
  }

}