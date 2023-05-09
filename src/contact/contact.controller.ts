import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // @Post()
  // create(@Body() createContactDto: CreateContactDto) {
  //   return this.contactService.create(createContactDto);
  // }

  @Post('/create')
  @Redirect('/contact')
  async createContact(@Body() body) {
    const contactUser = new Contact();
    contactUser.setName(body.name);
    contactUser.setEmail(body.email);
    contactUser.setSubject(body.subject);
    contactUser.setContent(body.content);
    console.log('contactUser', contactUser);
    await this.contactService.create(contactUser);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contactService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
