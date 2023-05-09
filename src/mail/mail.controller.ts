import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { MailService } from './mail.service';
// import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactService } from 'src/contact/contact.service';
import { Mail } from './entities/mail.entity';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('/setemail')
  @Redirect('/car-portal')
  async subscribers(@Body() body) {
    const email = new Mail();
    console.log('email2', body.email);
    email.setEmail(body.email);
    await this.mailService.create(email);
    console.log('email', email);
  }

  @Get('/manageSubs')
  @Render('manageSubscribers')
  find1() {
    return;
  }

  @Post('/send')
  async email(@Query('toEmail') toEmail, @Body() body) {
    console.log('data', body.from, body.to, body.subject, body.text);

    if (body.to) {
      await this.mailerService.sendMail({
        // to: body.to,
        to: body.to,
        from: body.from,
        subject: body.subject,
        text: body.text,
      });
      return 'success';
    }

    if (!body.to) {
      const data = await this.mailService.findAll();

      const arr = [];
      data.forEach((res) => {
        console.log('<<<<<<<<', res.email);
        arr.push(res.email);
      });
      await this.mailerService.sendMail({
        // to: body.to,
        to: arr,
        from: body.from,
        subject: body.subject,
        text: body.text,
      });
      return 'success';
    }
  }
  //   await this.mailerService.sendMail({
  //     // to: body.to,
  //     to: body.to,
  //     from: body.from,
  //     subject: body.subject,
  //     text: body.text,
  //   });
  //   return 'success';
  // }

  // @Post()
  // create(@Body() createMailDto: CreateMailDto) {
  //   return this.mailService.create(createMailDto);
  // }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mailService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
