import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingItemMarker } from '../../../entities/spending-item-marker.entity';

import { CreateSpendingItemMarkerDto }     from './dto/create-marker.dto';
import { CreateSpendingMarkerResponseDto } from './dto/create-marker-respone.dto';
import { FindSpendingMarkerResponseDto }   from './dto/find-marker-response.dto';


@Injectable()
export class SpendingItemMarkersService {

  constructor(
    @InjectRepository(SpendingItemMarker) private readonly SpendingItemMarkerRep: Repository<SpendingItemMarker>,
  ) {}

  /**
  * Создание маркера расходных статей
  * @param user_id Идентификатор пользователя
  * @param spending_item_marker Маркер расходных статей
  * @returns Номер созданного маркера расходных статей
  */
  async create(user_id: number, spending_item_marker: CreateSpendingItemMarkerDto): Promise<CreateSpendingMarkerResponseDto> {
    try {
      spending_item_marker['creator_id'] = user_id;
      await this.SpendingItemMarkerRep.update(
        { creator_id:       user_id,
          spending_item_id: spending_item_marker.spending_item_id, },
        { deleted_at: spending_item_marker.created_at, });
      const insertResult = await this.SpendingItemMarkerRep.insert(spending_item_marker);
      return {
        spending_marker_id: insertResult.identifiers[0]['spending_marker_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании метки на расходной статье.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение маркера расходных статей
  * @param user_id Идентификатор пользователя
  * @param marker_name Наименование маркера расходных статей
  * @returns Маркер расходных статей
  */
  async findOne(user_id: number, marker_name: string): Promise<FindSpendingMarkerResponseDto> {
    try {
      return { 
        message: 'OK',
        spendingMarker: await this.SpendingItemMarkerRep.createQueryBuilder('sm')
          .select(['spending_item_id'])
          .where("marker_value = :marker_name and creator_id = :user_id", { marker_name, user_id })
          .getRawOne(),
       };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске метки расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
