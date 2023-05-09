import { PartialType } from '@nestjs/mapped-types';
import { CreateLatestCarDto } from './create-latest-car.dto';

export class UpdateLatestCarDto extends PartialType(CreateLatestCarDto) {}
