import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingItemMarker } from '../../../entities/spending-item-marker.entity';

import { CreateSpendingItemMarkerDto } from './dto/create-item-marker.dto';


@Injectable()
export class SpendingItemMarkersService {

  constructor(
    @InjectRepository(SpendingItemMarker) private readonly SpendingItemMarkerRep: Repository<SpendingItemMarker>,
  ) {}

  async create(user_id: number, spending_item_marker: CreateSpendingItemMarkerDto) {
    try {
      spending_item_marker['creator_id'] = user_id;
      await this.SpendingItemMarkerRep.update(
        { creator_id:       user_id,
          spending_item_id: spending_item_marker.spending_item_id, },
        { deleted_at: spending_item_marker.created_at, });
      return await this.SpendingItemMarkerRep.insert(spending_item_marker);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании метки на расходной статье.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, marker_name: string) {
    try {
      return await this.SpendingItemMarkerRep.createQueryBuilder('sm')
        .select(['spending_item_id'])
        .where("marker_value = :marker_name and creator_id = :user_id", { marker_name, user_id })
        .getRawOne() || {}
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске метки расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
