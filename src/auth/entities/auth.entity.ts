import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getemail() {
    return this.email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }
}
