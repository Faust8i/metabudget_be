import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { Share } from '../../entities/share.entity';
import { User }  from '../../entities/user.entity';

import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';
import { CreateShareResponseDto } from './dto/create-share-respone.dto';
import { FindShareResponseDto }   from './dto/find-share-response.dto';
import { DeleteShareResponseDto } from './dto/delete-share-response.dto';


@Injectable()
export class SharesService {
  
  constructor(
    @InjectRepository(Share) private readonly shareRep: Repository<Share>,
  ) {}

  /**
  * Создание записи о совместном доступе
  * @param user_id Идентификатор пользователя
  * @param share Информация о создаваемой записи о совместном доступе
  * @returns Номер созданной записи о совместном доступе
  */
  async create(user_id: number, share: CreateShareDto): Promise<CreateShareResponseDto> {
    try {
      share['creator_id'] = user_id;
      const insertResult = await this.shareRep.insert(share);
      return {
        share_id: insertResult.identifiers[0]['share_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании нового совместного доступа.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение информации о совместном доступе
  * @param user_id Идентификатор пользователя
  * @returns Массив записей о совместном доступе
  */
  async findAll(user_id: number): Promise<FindShareResponseDto> {
    try {
      return {
        message: 'OK',
        shares: await this.shareRep.find({ 
          where: {creator_id: user_id},
        }),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске информации о совместных доступах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение информации о записи совместного доступа
  * @param user_id Идентификатор пользователя
  * @param share_id Идентификатор записи о совместном доступе
  * @returns Запись о совместном доступе в массиве
  */
  async findOne(user_id: number, share_id: number): Promise<FindShareResponseDto> {
    try {
      const share = await this.shareRep.findOne({
        where: {
          share_id, 
          creator_id: user_id,
        }
      });
      return {
        message: 'OK',
        shares: share ? [share] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске информации о совместном доступе.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление записи о совместном доступе
  * @param user_id Идентификатор пользователя
  * @param share_id Идентификатор записи о совместном доступе
  * @param share Информация для удаления записи о совместном доступе
  * @returns Информационное сообщение
  */
  async delete(user_id: number, share_id: number, share: UpdateShareDto): Promise<DeleteShareResponseDto> {
    try {
      await this.shareRep.update(
        {
          share_id,
          creator_id: user_id
        }, 
        share
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении инфорации о совместном доступе.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение списка идентификаторов пользователей системы, которым разрешен совместный доступ
  * @param user_id Идентификатор пользователя
  * @returns Массив идентификаторов
  */
  async getSharedUserIds(user_id: number): Promise<number[]> {
    try {
      const sharedUserIds = await this.shareRep.createQueryBuilder('sh')
        .leftJoin(User, 'u', 'u.email = sh.friendly_email')
        .select('creator_id')
        .where(`u.user_id = :user_id`, {user_id})
        .getRawMany();
      return sharedUserIds.map(el => el.creator_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске пользователей к совместному доступу.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}