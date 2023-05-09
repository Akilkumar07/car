import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emailSubscribers')
export class Mail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  setEmail(email: string) {
    this.email = email;
  }
}
