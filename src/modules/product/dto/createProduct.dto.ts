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

  @IsNumber()
  price: number;

  @IsString()
  category: string;

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
