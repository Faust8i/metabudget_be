import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { IncomeItemMarker } from '../../../entities/income-item-marker.entity';

import { CreateIncomeItemMarkerDto }     from './dto/create-marker.dto';
import { CreateIncomeMarkerResponseDto } from './dto/create-marker-respone.dto';
import { FindIncomeMarkerResponseDto }   from './dto/find-marker-response.dto';


@Injectable()
export class IncomeItemMarkersService {

  constructor(
    @InjectRepository(IncomeItemMarker) private readonly IncomeItemMarkerRep: Repository<IncomeItemMarker>,
  ) {}

  /**
  * Создание маркера доходных статей
  * @param user_id Идентификатор пользователя
  * @param income_item_marker Маркер доходных статей
  * @returns Номер созданного маркера доходных статей
  */
  async create(user_id: number, income_item_marker: CreateIncomeItemMarkerDto): Promise<CreateIncomeMarkerResponseDto> {
    try {
      income_item_marker['creator_id'] = user_id;
      await this.IncomeItemMarkerRep.update(
        { creator_id:     user_id,
          income_item_id: income_item_marker.income_item_id, },
        { deleted_at: income_item_marker.created_at, });
      const insertResult = await this.IncomeItemMarkerRep.insert(income_item_marker);
      return {
        income_marker_id: insertResult.identifiers[0]['income_mrker_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании метки на доходной статье.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  /**
  * Получение маркер доходных статей
  * @param user_id Идентификатор пользователя
  * @param marker_name Наименование маркера доходных статей
  * @returns Маркер доходных статей
  */
  async findOne(user_id: number, marker_name: string): Promise<FindIncomeMarkerResponseDto> {
    try {
      return { 
        message: 'OK',
        incomeMarker: await this.IncomeItemMarkerRep.createQueryBuilder('im')
          .select(['income_item_id'])
          .where("marker_value = :marker_name and creator_id = :user_id", { marker_name, user_id })
          .getRawOne(),
       };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске метки доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}