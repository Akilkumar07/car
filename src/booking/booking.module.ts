import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { AppController } from 'src/app.controller';

@Module({
  controllers: [BookingController, AppController],
  providers: [BookingService],
})
export class BookingModule {}
