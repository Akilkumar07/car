import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
  UseFilters,
  Req,
} from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  // @Get('/login')
  // @Render('login')
  // index(@Request() req): { message: string } {
  //   return { message: req.flash('loginError') };
  // }

  // @UseGuards(LoginGuard)
  // @Post('/login')
  // login(@Res() res: Response) {
  //   res.render('index');
  // }

  @Get('/')
  @Render('home')
  getHome() {
    return;
  }

  @Get('/reg')
  @Render('register')
  getReg() {
    return;
  }
  // @UseGuards(AuthenticatedGuard)
  // @Get('/index')
  // @Render('index')
  // getIndex1() {
  //   return;
  // }
  // @UseGuards(AuthenticatedGuard)
  @Get('/contact')
  // @Render('contact')
  getContact(@Req() req, @Res() res) {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('contact');
  }

  // @UseGuards(AuthenticatedGuard)
  // @Get('/profile')
  // @Render('profile')
  // getProfile(@Request() req) {
  //   return { user: req.user };
  // }

  // @UseGuards(AuthenticatedGuard)
  // @Get('/')
  // @Render('car')
  // getCar() {
  //   return;
  // }

  // @UseGuards(AuthenticatedGuard)
  // @Get('/car-portal')
  // @Render('index')
  // getCar() {
  //   return;
  // }

  // @Get('/logout')
  // logout(@Request() req, @Res() res: Response) {
  //   req.logout(() => {
  //     res.redirect('/');
  //   });
  // }

  // @Get('logout')
  // public async logout(@Request() request: any, @Res() response): Promise<void> {
  //   request.session.destroy(() => {
  //     response.redirect('/');
  //   });
  // }

  // @Get('logout')
  // public async logout(
  //   @Request() request: any,
  //   @Res() response,
  //   res: Response,
  // ): Promise<void> {
  //   request.session.destroy(() => {
  //     response.redirect('/');
  //   });
  // }

  // @Get('/latest-cars')
  // @Render('newcar')
  // getcars() {
  //   // const data = [];
  //   // data['car'] = await this.latestCarsService.findAll();
  //   return;
  //   // console.log('<', data);
  // }
}
