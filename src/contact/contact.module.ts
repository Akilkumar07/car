import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { AppController } from 'src/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController, AppController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
