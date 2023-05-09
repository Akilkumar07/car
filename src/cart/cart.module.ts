import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { LatestCarsModule } from 'src/latest-cars/latest-cars.module';
import { LatestCarsService } from 'src/latest-cars/latest-cars.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [LatestCarsModule, AuthModule, TypeOrmModule.forFeature([Cart])],
})
export class CartModule {}
