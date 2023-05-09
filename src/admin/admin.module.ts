import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LatestCarsModule } from 'src/latest-cars/latest-cars.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [LatestCarsModule],
})
export class AdminModule {}
