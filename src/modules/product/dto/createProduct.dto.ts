import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsObject,
} from 'class-validator';
import { FeatureDTO } from '@app/modules/product/dto/feature.dto';

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsArray()
  tags: string[];

  @IsString()
  @IsOptional()
  userId: string;

  @IsObject()
  features: {
    create: FeatureDTO;
  };
}
