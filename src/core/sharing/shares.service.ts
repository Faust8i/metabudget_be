import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { Share } from '../../entities/share.entity';
import { User }  from 'src/entities/user.entity';

import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';


@Injectable()
export class SharesService {
  
  constructor(
    @InjectRepository(Share) private readonly shareRep: Repository<Share>,
  ) {}

  async create(user_id: number, share: CreateShareDto) {
    try {
      share['creator_id'] = user_id;
      return await this.shareRep.insert(share);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании нового совместного доступа.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user_id: number): Promise<Share[]> {
    try {
      return await this.shareRep.find({ 
        where: {creator_id: user_id},
      });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске информации о совместных доступах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, share_id: number): Promise<Share> {
    try {
      return await this.shareRep.findOne({
        where: {
          share_id, 
          creator_id: user_id,
        }
      });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске информации о совместном доступе.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(user_id: number, share_id: number, share: UpdateShareDto) {
    try {
      return await this.shareRep.update(
        {
          share_id,
          creator_id: user_id
        }, 
        share
      );
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении инфорации о совместном доступе.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSharedUserIds(user_id: number): Promise<number[]> {
    const sharedUserIds = await this.shareRep.createQueryBuilder('sh')
      .leftJoin(User, 'u', 'u.email = sh.friendly_email')
      .select('creator_id')
      .where(`u.user_id = :user_id`, {user_id})
      .getRawMany();
    return sharedUserIds.map(el => el.creator_id);
  }

}