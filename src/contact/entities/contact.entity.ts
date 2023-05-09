import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contactUsers')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  subject: string;

  @Column()
  content: string;

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setSubject(subject: string) {
    this.subject = subject;
  }

  setContent(content: string) {
    this.content = content;
  }
}
