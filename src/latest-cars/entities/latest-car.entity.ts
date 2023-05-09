import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cars')
export class LatestCar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column({ type: 'timestamp', default: (): string => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: (): string => 'CURRENT_TIMESTAMP' })
  updatedOn: Date;

  @Column()
  milage: string;

  @Column()
  engine: string;

  @Column()
  fuel: string;

  @Column()
  version: number;

  @Column()
  transmission: string;

  @Column()
  seats: number;

  @Column()
  slug: string;

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

  setName(name: string) {
    this.name = name;
  }

  getName(name: string) {
    return this.name;
  }

  setSlug(slug: string) {
    this.slug = slug;
  }

  getSlug(): string {
    return this.slug;
  }

  setPrice(price: number) {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getDescription(): string {
    return this.description;
  }

  setImage(image: string) {
    this.image = image;
  }

  getImage(): string {
    return this.image;
  }

  setMilage(milage: string) {
    this.milage = milage;
  }

  getMilage(): string {
    return this.milage;
  }

  setEngine(engine: string) {
    this.engine = engine;
  }

  getEngine(): string {
    return this.engine;
  }

  setFuel(fuel: string) {
    this.fuel = fuel;
  }

  getFuel(): string {
    return this.fuel;
  }

  setSeats(seats: number) {
    this.seats = seats;
  }

  getSeats(): number {
    return this.seats;
  }

  setVersion(version: number) {
    this.version = version;
  }

  getVersion(): number {
    return this.version;
  }

  static sumPricesByQuantities(
    LatestCar: LatestCar[],
    productsInSession,
  ): number {
    let total = 0;
    for (let i = 0; i < LatestCar.length; i++) {
      total =
        total +
        LatestCar[i].getPrice() * productsInSession[LatestCar[i].getId()];
      console.log('<<<', productsInSession[LatestCar[i].getId()]);
      console.log('Latest', LatestCar[i].getPrice());
    }
    return total;
  }
}
