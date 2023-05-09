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
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LatestCarsService } from './latest-cars.service';
import { CreateLatestCarDto } from './dto/create-latest-car.dto';
import { UpdateLatestCarDto } from './dto/update-latest-car.dto';
import { LatestCar } from './entities/latest-car.entity';
// import { query } from 'express';
// @UseGuards(AuthenticatedGuard)
@Controller('latest-cars')
export class LatestCarsController {
  constructor(private readonly latestCarsService: LatestCarsService) {}

  @Post()
  create() {
    return;
  }

  // @Get()
  // findAll() {
  //   return this.latestCarsService.findAll();
  // }

  @Get('/prod')
  @Render('prod')
  async getcars() {
    // const data = [];
    // data['car'] = await this.latestCarsService.findAll();
    // const data = await this.latestCarsService.findAll();
    const data = await this.latestCarsService.findAll();

    // return {
    //   data: data,
    // };
    return data;
    // console.log('<', data);
  }

  @Get('/pagination')
  @Render('demo')
  async getcars1(@Request() req, @Res() res, @Param() params, @Query() query) {
    // const data = [];
    // const data = await this.latestCarsService.findAll();
    const builder = await this.latestCarsService.querybulider('car');
    const data = await builder.getMany();
    const page = query.page || 1;
    console.log('page', page);
    const resultPerPage = 4;
    const toatlPage = data.length / resultPerPage;
    console.log('total', toatlPage);
    if (query.page || 1) {
      builder.offset((page - 1) * resultPerPage).limit(resultPerPage);
    }
    // if (query.page > toatlPage) {
    //   res.send('this page is not contain results');
    // }
    if (query.s) {
      builder.where('car.name LIKE :s', { s: `%${query.s}%` });
      // res.render('cardetails');
    }
    const find = req.body.search;
    console.log('f', find);

    return { data: await builder.getMany(), page: page, builder: builder };
    // console.log('<', data);
  }

  @Get('/search')
  @Render('latest')
  async getcars2(@Request() req, @Res() res, @Param() params, @Query() query) {
    // const data = [];
    // const data = await this.latestCarsService.findAll();
    const builder = await this.latestCarsService.querybulider('car');
    const data = await builder.getMany();
    const page = query.page || 1;
    console.log('page', page);
    const resultPerPage = 4;
    if (query.page || 1) {
      builder.offset((page - 1) * resultPerPage).limit(resultPerPage);
    }
    if (query.s) {
      builder.where('car.name LIKE :s', { s: `%${query.s}%` });
      // res.render('cardetails');
    }
    const find = query.s;
    console.log('f', find);

    return {
      data: await builder.getMany(),
      page: page,
      builder: builder,
      s: query.s,
    };
    // console.log('<', data);
  }

  @Get('/brand')
  @Render('category')
  brand() {
    // let arr = 0;
    // let val = 0;
    // let data;
    // for (let i = 0; i < 3; i++) {
    //   val++;
    //   console.log('<<<', val);
    //   data = val;
    //   // arr.push(val + val);
    // }
    // console.log('val', data);
    return;
  }

  // @Get('/:id')
  // findOne(@Param('id') id: string) {
  //   return this.latestCarsService.findOne(id);
  // }

  @Get('/:slug')
  @Render('carDetails')
  async findOne(@Param() params, @Res() res) {
    const latestcar = await this.latestCarsService.findOne(params.slug);
    const data = [];
    data['prod'] = latestcar;
    // console.log('prod', data);
    return {
      data: data,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLatestCarDto: UpdateLatestCarDto,
  ) {
    return this.latestCarsService.update(+id, updateLatestCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.latestCarsService.remove(+id);
  }
}
