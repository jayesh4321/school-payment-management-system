import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookLogsDocument = WebhookLogs & Document;

@Schema({ timestamps: true })
export class WebhookLogs {
  @Prop({ required: true })
  order_id: string;

  @Prop({ required: true })
  order_amount: number;

  @Prop({ required: true })
  transaction_amount: number;

  @Prop({ required: true })
  gateway: string;

  @Prop({ required: true })
  bank_reference: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  payment_mode: string;

  @Prop({ required: true })
  payment_details: string;

  @Prop({ required: true })
  payment_message: string;

  @Prop({ required: true })
  payment_time: Date;

  @Prop({ default: '' })
  error_message: string;

  @Prop({ type: Object, required: true })
  webhook_payload: object;

  @Prop({ required: true })
  processed: boolean;
}

export const WebhookLogsSchema = SchemaFactory.createForClass(WebhookLogs);
