import { IsString, IsOptional } from 'class-validator';

export class FeatureDTO {
  @IsString()
  @IsOptional()
  productId: string;

  @IsString()
  @IsOptional()
  simSupport?: string;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  operatingSystem?: string;

  @IsString()
  @IsOptional()
  screenSize?: string;

  @IsString()
  @IsOptional()
  screenResolution?: string;

  @IsString()
  @IsOptional()
  screenType?: string;

  @IsString()
  @IsOptional()
  screenProtection?: string;

  @IsString()
  @IsOptional()
  memory?: string;

  @IsString()
  @IsOptional()
  ram?: string;

  @IsString()
  @IsOptional()
  processor?: string;

  @IsString()
  @IsOptional()
  gpu?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  frontCamera?: string;

  @IsString()
  @IsOptional()
  frontFlashLight?: string;

  @IsString()
  @IsOptional()
  frontVideoRecording?: string;

  @IsString()
  @IsOptional()
  backFlashLight?: string;

  @IsString()
  @IsOptional()
  backCamera?: string;

  @IsString()
  @IsOptional()
  backVideoRecording?: string;

  @IsString()
  @IsOptional()
  bluetooth?: string;

  @IsString()
  @IsOptional()
  network?: string;

  @IsString()
  @IsOptional()
  radio?: string;

  @IsString()
  @IsOptional()
  wifi?: string;

  @IsString()
  @IsOptional()
  nfc?: string;

  @IsString()
  @IsOptional()
  battery?: string;

  @IsString()
  @IsOptional()
  refreshRate?: string;

  @IsString()
  @IsOptional()
  ingressProtection?: string;

  @IsString()
  @IsOptional()
  chargingSpeed?: string;

  @IsOptional()
  ptaApproved?: boolean;
}
