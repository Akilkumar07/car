import { Injectable } from '@nestjs/common';
import { PARAMTYPES_METADATA } from '@nestjs/common/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLatestCarDto } from './dto/create-latest-car.dto';
import { UpdateLatestCarDto } from './dto/update-latest-car.dto';
import { LatestCar } from './entities/latest-car.entity';

@Injectable()
export class LatestCarsService {
  constructor(
    @InjectRepository(LatestCar)
    private readonly carRepo: Repository<LatestCar>,
  ) {}
  create(Latestcar: LatestCar) {
    return this.carRepo.save(Latestcar);
  }

  findAll() {
    return this.carRepo.find();
  }

  findOne(slug: string) {
    return this.carRepo.findOne({ where: { slug } });
  }

  querybulider(alias: string) {
    return this.carRepo.createQueryBuilder(alias);
  }

  findById(id) {
    return this.carRepo.findOne({ where: { id } });
  }

  findByIds(ids: string[]): Promise<LatestCar[]> {
    return this.carRepo.findByIds(ids);
  }

  update(id: number, updateLatestCarDto: UpdateLatestCarDto) {
    return `This action updates a #${id} latestCar`;
  }

  remove(id: number) {
    return this.carRepo.delete(id);
  }
}
