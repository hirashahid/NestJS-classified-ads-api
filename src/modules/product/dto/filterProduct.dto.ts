import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class FilterProductFilterDTO {
  @IsOptional()
  @IsString()
  search?: string;
}

export class FilterProductDTO {
  // paginate
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  paginate?: number;

  // page
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => FilterProductFilterDTO)
  filter?: FilterProductFilterDTO;

  @IsOptional()
  sort?: string;
}
