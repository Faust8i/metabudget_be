import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { SpendingItemMarkersService } from './item-markers.service';

import { CreateSpendingItemMarkerDto } from './dto/create-item-marker.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-items/markers')
export class SpendingItemMarkersController {
  constructor(
    private readonly spendingItemMarkersService: SpendingItemMarkersService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    marker:  CreateSpendingItemMarkerDto,
    ) {
      return await this.spendingItemMarkersService.create(user_id, marker);
  }

  @Get(':marker_name')
  async findOne(
    @UserJWT()            user_id:     number,
    @Param('marker_name') marker_name: string,
    ) {
      return await this.spendingItemMarkersService.findOne(user_id, marker_name);
  }

}