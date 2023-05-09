import { Module } from '@nestjs/common';
import { LatestCarsService } from './latest-cars.service';
import { LatestCarsController } from './latest-cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LatestCar } from './entities/latest-car.entity';
import { AppController } from 'src/app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LatestCar])],
  controllers: [AppController, LatestCarsController],
  providers: [LatestCarsService],
  exports: [LatestCarsService],
})
export class LatestCarsModule {}
