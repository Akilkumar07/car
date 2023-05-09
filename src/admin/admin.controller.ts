import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Render, UseInterceptors, Redirect, UploadedFile } from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { LatestCar } from 'src/latest-cars/entities/latest-car.entity';
import { LatestCarsService } from 'src/latest-cars/latest-cars.service';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly latestCarService: LatestCarsService) {}

  @Get('/new')
  @Render('create')
  findAll() {
    return;
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', { dest: './public/image' }))
  @Render('create')
  async post(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log('name', body.name);
    const newCar = new LatestCar();
    newCar.setName(body.name);
    newCar.setSlug(body.slug);
    newCar.setPrice(body.price);
    newCar.setDescription(body.description);
    newCar.setEngine(body.engine);
    newCar.setFuel(body.fuel);
    newCar.setImage(file.filename);
    newCar.setMilage(body.milage);
    newCar.setSeats(body.seats);
    newCar.setVersion(body.version);
    console.log('<', newCar);
    await this.latestCarService.create(newCar);
  }

  @Get('/manageProd')
  @Render('manageProd')
  async find() {
    const data = await this.latestCarService.findAll();
    return { data: data };
  }

  @Post('/:id')
  @Redirect('manageProd')
  delete(@Param('id') id: number) {
    this.latestCarService.remove(id);
  }

  @Get('/:slug')
  @Render('edit')
  async update(@Param() params) {
    const data = await this.latestCarService.findOne(params.slug);
    return { data: data };
  }

  @Post('/edit/:slug')
  @Render('manageProd')
  // @Redirect('/manageProd')
  @UseInterceptors(FileInterceptor('image', { dest: './public/image' }))
  async edit(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('slug') slug: string,
    @Param() params,
  ) {
    console.log('<<<<<');
    const updateProd = await this.latestCarService.findOne(params.slug);
    updateProd.setName(body.name);
    updateProd.setSlug(body.slug);
    updateProd.setPrice(body.price);
    updateProd.setDescription(body.description);
    updateProd.setEngine(body.engine);
    updateProd.setFuel(body.fuel);
    if (file) {
      updateProd.setImage(file.filename);
    }
    updateProd.setMilage(body.milage);
    updateProd.setSeats(body.seats);
    updateProd.setVersion(body.version);
    console.log('updateProd', updateProd);
    await this.latestCarService.create(updateProd);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update1() {
    return;
  }

  @Delete(':id')
  remove() {
    return;
  }
}
