import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ContactModule } from 'src/contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { AppController } from 'src/app.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mail]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.elasticemail.com',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'kumarakil88@gmail.com',
          pass: '3EB10BE5CC796C89013784E3226631DADA1C',
        },
      },
    }),
  ],
  controllers: [MailController, AppController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
