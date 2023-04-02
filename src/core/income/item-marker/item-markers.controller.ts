import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { IncomeItemMarkersService } from './item-markers.service';

import { CreateIncomeItemMarkerDto } from './dto/create-item-marker.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-items/markers')
export class IncomeItemMarkersController {
  constructor(
    private readonly incomeItemMarkersService: IncomeItemMarkersService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    marker:  CreateIncomeItemMarkerDto,
    ) {
      return await this.incomeItemMarkersService.create(user_id, marker);
  }

  @Get(':marker_name')
  async findOne(
    @UserJWT()            user_id:     number,
    @Param('marker_name') marker_name: string,
    ) {
      return await this.incomeItemMarkersService.findOne(user_id, marker_name);
  }

}