import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class CartService {
  private paypalSdk: typeof paypal;
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {
    paypal.configure({
      mode: 'sandbox', // or 'live' for production
      client_id: 'YOUR_CLIENT_ID_HERE',
      client_secret: 'YOUR_CLIENT_SECRET_HERE',
    });
    this.paypalSdk = paypal;
  }
  create(Cart: Cart) {
    return this.cartRepo.save(Cart);
  }

  findAll() {
    return this.cartRepo.find();
  }

  remove(id: number) {
    return this.cartRepo.delete(id);
  }

  delete() {
    return this.cartRepo.clear();
  }


}
