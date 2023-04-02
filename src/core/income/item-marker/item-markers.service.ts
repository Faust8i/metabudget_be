import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { IncomeItemMarker } from '../../../entities/income-item-marker.entity';

import { CreateIncomeItemMarkerDto } from './dto/create-item-marker.dto';


@Injectable()
export class IncomeItemMarkersService {

  constructor(
    @InjectRepository(IncomeItemMarker) private readonly IncomeItemMarkerRep: Repository<IncomeItemMarker>,
  ) {}

  async create(user_id: number, income_item_marker: CreateIncomeItemMarkerDto) {
    try {
      income_item_marker['creator_id'] = user_id;
      await this.IncomeItemMarkerRep.update(
        { creator_id:     user_id,
          income_item_id: income_item_marker.income_item_id, },
        { deleted_at: income_item_marker.created_at, });
      return await this.IncomeItemMarkerRep.insert(income_item_marker);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании метки на доходной статье.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findOne(user_id: number, marker_name: string) {
    try {
      return await this.IncomeItemMarkerRep.createQueryBuilder('im')
        .select(['income_item_id'])
        .where("marker_value = :marker_name and creator_id = :user_id", { marker_name, user_id })
        .getRawOne() || {}
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске метки доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
