import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  Req,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { request, response } from 'express';
// import flash = require('connect-flash');

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @Render('login')
  index() {
    return;
  }

  // @Get('/car-portal')
  // @Render('index')
  // car1() {
  //   return;
  // }

  @Post('/store')
  // @Redirect('/login')
  async store(@Body() body, @Res() res, @Req() req) {
    console.log('RegUser', body.email, body.password);
    // const toValidate: string[] = ['name', 'password', 'email'];
    // const errors: string[] = UserValidator.validate(body, toValidate);
    const errors = [];
    console.log('err', errors);
    if (!body.name) {
      errors.push('name is required');
      req.session.flashErrors = errors;
    }
    if (!body.password) {
      errors.push('password is required');
      req.session.flashErrors = errors;
    }
    if (body.password.length < 6) {
      errors.push('password must be atleast 6 char');
      req.session.flashErrors = errors;
    }
    if (!body.email) {
      errors.push('email is required');
      req.session.flashErrors = errors;
    }
    if (errors.length > 0) {
      req.session.flashErrors = errors;
      res.redirect('/reg');
    } else {
      const newUser = new Auth();
      newUser.setName(body.name);
      newUser.setEmail(body.email);
      const hash = await bcrypt.hash(body.password, 10);
      newUser.setPassword(hash);
      console.log('new User', newUser);
      await this.authService.create(newUser);
      res.redirect('/login');
    }
    console.log('error', req.session.flashErrors);
    // res.redirect('/login');
  }

  @Post('/login')
  async connect(@Body() body, @Res() res, @Req() req) {
    const email = body.email;
    const password = body.password;
    console.log('user', email, password);
    const user = await this.authService.login(email, password, req);
    if (user) {
      req.session.user = {
        // id: user.getId(),
        // name: user.getName(),
        email: user.getemail(),
      };
      console.log('user', req.session.user);
      return res.redirect('/car-portal');
    } else {
      return res.redirect('/login');
    }
  }

  @Get('/car-portal')
  @Render('index')
  async index1(@Req() req, @Res() res) {
    if (!req.session.user) {
      res.redirect('/login');
    }
    return;
  }

  @Get('/logout')
  async logout(@Req() req: any, @Res() res) {
    req.session.destroy(() => {
      res.clearCookie('user');
      res.redirect('/login');
    });
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
