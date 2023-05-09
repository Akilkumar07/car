import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  Request,
} from '@nestjs/common';
import session from 'express-session';
import { AuthService } from 'src/auth/auth.service';
import { LatestCar } from 'src/latest-cars/entities/latest-car.entity';
import { LatestCarsService } from 'src/latest-cars/latest-cars.service';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import * as paypal from 'paypal-rest-sdk';

@Controller('/cart')
export class CartController {
  constructor(
    private readonly latestCarService: LatestCarsService,
    private readonly authService: AuthService,
    private readonly cartService: CartService,
  ) {}

  @Get('/')
  @Render('cart')
  async find(@Req() req, @Body() body) {
    const data = await this.cartService.findAll();
    let total = 0;
    let productsInCart: LatestCar[] = null;
    const productsInSession = req.session.LatestCar;
    console.log('session', productsInSession);
    console.log('prod session', req.session);
    console.log('cart session', req.session.LatestCar);
    if (productsInSession) {
      productsInCart = await this.latestCarService.findByIds(
        Object.keys(productsInSession),
      );
      console.log('session1', productsInCart);
      total = LatestCar.sumPricesByQuantities(
        productsInCart,
        productsInSession,
      );
      console.log('totalAmount', total);
    }

    // const viewData = [];
    // viewData['productsInCart'] = data;
    // viewData['total'] = data;
    return { viewData: data, total: total };
  }
  // @Get('/')
  // @Render('cart')
  // async cart(@Req() req) {
  //   let total = 0;
  //   let productsInCart: LatestCar[] = null;
  //   const productsInSession = req.session.LatestCar;
  //   console.log('session', productsInSession);
  //   console.log('prod session', req.session);
  //   console.log('cart session', req.session.LatestCar);
  //   if (productsInSession) {
  //     productsInCart = await this.latestCarService.findByIds(
  //       Object.keys(productsInSession),
  //     );
  //     console.log('session1', productsInCart);
  //     total = LatestCar.sumPricesByQuantities(
  //       productsInCart,
  //       productsInSession,
  //     );
  //     console.log('total', total);
  //   }
  //   const viewData = [];
  //   viewData['total'] = total;
  //   viewData['productsInCart'] = productsInCart;
  //   return {
  //     viewData: viewData,
  //   };
  // }

  // @Post('/add/:id')
  // @Redirect('/cart')
  // add(@Param('id') id: number, @Body() body, @Request() req) {
  //   console.log('id<<<', id);
  //   let productsInSession = req.session.LatestCar;
  //   if (!productsInSession) {
  //     productsInSession = {};
  //   }
  //   console.log('qty', body.quantity);
  //   productsInSession[id] = body.quantity;
  //   req.session.LatestCar = productsInSession;
  //   console.log('s', productsInSession);
  // }

  @Post('/add/:id')
  @Redirect('/cart')
  async add1(@Param('id') id, @Body() body, @Request() req) {
    let productsInSession = req.session.LatestCar;
    if (!productsInSession) {
      productsInSession = {};
    }
    productsInSession[id] = body.quantity;
    req.session.LatestCar = productsInSession;

    const productsInCart = await this.latestCarService.findByIds(
      Object.keys(productsInSession),
    );

    // productsInCart = new Cart();
    // newProd.setName(body.name);
    // let productsInCart1;
    const productsInCart1 = [await this.latestCarService.findById(id)];
    for (let i = 0; i < productsInCart1.length; i++) {
      await this.cartService.create(productsInCart1[i]);
    }
    console.log('<<<<<<<<<<', productsInCart1);
    productsInCart1[0].id = body.quantity;
    console.log('>>>>>', productsInCart1[0].id);
    const qty = productsInCart1[0].id;
    console.log('qty', qty);
    function sum() {
      const total = productsInCart1[0].getPrice() * qty;
      console.log('total', total);
    }
    sum();
  }

  @Post('/delete/:id')
  @Redirect('/cart/')
  async delete(@Req() req, @Param('id') id: number, @Body() body) {
    this.cartService.remove(id);
    // let productsInSession = req.session.LatestCar;
    // if (!productsInSession) {
    //   productsInSession = {};
    // }
    // productsInSession[id] = body.quantity;
    // req.session.LatestCar = productsInSession;
    // req.session.LatestCar = null;
  }

  @Get('/deleteAll')
  @Redirect('/cart/')
  deleteAll(@Req() req) {
    console.log('session3', req.session.LatestCar);
    console.log('sess', req.session.LatestCar);
    req.session.LatestCar = null;
    this.cartService.delete();
  }

  @Post('/pay')
  purchase() {
    return;
  }
}
