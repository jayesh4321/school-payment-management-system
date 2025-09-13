import { IsString, IsNumber, IsObject, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class OrderInfoDto {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsNumber()
  @IsNotEmpty()
  order_amount: number;

  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  @IsString()
  @IsNotEmpty()
  gateway: string;

  @IsString()
  @IsNotEmpty()
  bank_reference: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  payment_mode: string;

  @IsString()
  @IsNotEmpty()
  payemnt_details: string;

  @IsString()
  @IsNotEmpty()
  Payment_message: string;

  @IsDateString()
  @IsNotEmpty()
  payment_time: string;

  @IsString()
  @IsOptional()
  error_message?: string;
}

export class WebhookDto {
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @IsObject()
  @IsNotEmpty()
  order_info: OrderInfoDto;
}
