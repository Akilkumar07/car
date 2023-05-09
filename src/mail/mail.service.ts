import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Mail } from './entities/mail.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail) private readonly mailRepo: Repository<Mail>,
  ) {}
  create(mail: Mail) {
    return this.mailRepo.save(mail);
  }

  findAll() {
    return this.mailRepo.find();
  }

  findOne(email: string): Promise<Mail> {
    return this.mailRepo.findOne({ where: { email: email } });
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
