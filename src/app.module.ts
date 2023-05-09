import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LatestCarsModule } from './latest-cars/latest-cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LatestCarsService } from './latest-cars/latest-cars.service';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { CartModule } from './cart/cart.module';
import { AuthService } from './auth/auth.service';
import { LatestCar } from './latest-cars/entities/latest-car.entity';
import { BookingModule } from './booking/booking.module';
import { Entity } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    AuthModule,
    LatestCarsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'car_portal',
      username: 'root',
      password: '',
      port: 3306,
      autoLoadEntities: true,
      // entities: [Auth],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([LatestCar]),
    AdminModule,
    ContactModule,
    MailModule,
    CartModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [LatestCarsModule, AuthModule],
})
export class AppModule {}
