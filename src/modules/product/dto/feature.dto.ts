import { IsString, IsOptional } from 'class-validator';

export class FeatureDTO {
  @IsString()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsOptional()
  productId: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  protection?: string;

  @IsString()
  @IsOptional()
  storage?: string;

  @IsString()
  @IsOptional()
  battery?: string;

  @IsString()
  @IsOptional()
  processor?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  resolution?: string;

  @IsString()
  @IsOptional()
  network?: string;

  @IsString()
  @IsOptional()
  operatingSystem?: string;

  @IsString()
  @IsOptional()
  screenSize?: string;

  @IsString()
  @IsOptional()
  mainCamera?: string;

  @IsString()
  @IsOptional()
  frontCamera?: string;

  @IsString()
  @IsOptional()
  refreshRate?: string;

  @IsString()
  @IsOptional()
  ingressProtection?: string;

  @IsString()
  @IsOptional()
  chargingSpeed?: string;

  @IsString()
  @IsOptional()
  simSupport?: string;
}
