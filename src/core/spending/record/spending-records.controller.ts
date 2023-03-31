import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { SpendingRecordsService } from './spending-records.service';

import { CreateSpendingRecordDto } from './dto/create-spending-record.dto';
import { UpdateSpendingRecordDto } from './dto/update-spending-record.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-records')
export class SpendingRecordsController {
  constructor(
    private readonly spendingRecordService: SpendingRecordsService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    record:  CreateSpendingRecordDto,
    ) {
      return await this.spendingRecordService.create(user_id, record);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.spendingRecordService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id:   number,
    @Param('id') record_id: string,
    ) {
      return await this.spendingRecordService.findOne(user_id, +record_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id:   number,
    @Param('id') record_id: string,
    @Body()      record:    UpdateSpendingRecordDto,
    ) {
      return await this.spendingRecordService.delete(user_id, +record_id, record);
  }

}
