import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { OrderStatus, OrderStatusDocument } from '../schemas/order-status.schema';
import { WebhookLogs, WebhookLogsDocument } from '../schemas/webhook-logs.schema';
import { WebhookDto } from '../dto/webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatusDocument>,
    @InjectModel(WebhookLogs.name) private webhookLogsModel: Model<WebhookLogsDocument>,
  ) {}

  async processWebhook(webhookDto: WebhookDto) {
    try {
      // Log webhook payload
      const webhookLog = new this.webhookLogsModel({
        order_id: webhookDto.order_info.order_id,
        order_amount: webhookDto.order_info.order_amount,
        transaction_amount: webhookDto.order_info.transaction_amount,
        gateway: webhookDto.order_info.gateway,
        bank_reference: webhookDto.order_info.bank_reference,
        status: webhookDto.order_info.status,
        payment_mode: webhookDto.order_info.payment_mode,
        payment_details: webhookDto.order_info.payemnt_details,
        payment_message: webhookDto.order_info.Payment_message,
        payment_time: new Date(webhookDto.order_info.payment_time),
        error_message: webhookDto.order_info.error_message || '',
        webhook_payload: webhookDto,
        processed: false,
      });

      await webhookLog.save();

      // Find the order by custom_order_id
      const order = await this.orderModel.findOne({ 
        custom_order_id: webhookDto.order_info.order_id 
      });

      if (!order) {
        webhookLog.processed = false;
        webhookLog.error_message = 'Order not found';
        await webhookLog.save();
        throw new BadRequestException('Order not found');
      }

      // Update or create order status
      const orderStatus = await this.orderStatusModel.findOne({ collect_id: order._id });
      
      if (orderStatus) {
        // Update existing order status
        orderStatus.order_amount = webhookDto.order_info.order_amount;
        orderStatus.transaction_amount = webhookDto.order_info.transaction_amount;
        orderStatus.payment_mode = webhookDto.order_info.payment_mode;
        orderStatus.payment_details = webhookDto.order_info.payemnt_details;
        orderStatus.bank_reference = webhookDto.order_info.bank_reference;
        orderStatus.payment_message = webhookDto.order_info.Payment_message;
        orderStatus.status = webhookDto.order_info.status;
        orderStatus.error_message = webhookDto.order_info.error_message || '';
        orderStatus.payment_time = new Date(webhookDto.order_info.payment_time);
        
        await orderStatus.save();
      } else {
        // Create new order status
        const newOrderStatus = new this.orderStatusModel({
          collect_id: order._id,
          order_amount: webhookDto.order_info.order_amount,
          transaction_amount: webhookDto.order_info.transaction_amount,
          payment_mode: webhookDto.order_info.payment_mode,
          payment_details: webhookDto.order_info.payemnt_details,
          bank_reference: webhookDto.order_info.bank_reference,
          payment_message: webhookDto.order_info.Payment_message,
          status: webhookDto.order_info.status,
          error_message: webhookDto.order_info.error_message || '',
          payment_time: new Date(webhookDto.order_info.payment_time),
        });

        await newOrderStatus.save();
      }

      // Mark webhook as processed
      webhookLog.processed = true;
      await webhookLog.save();

      return {
        success: true,
        message: 'Webhook processed successfully',
        order_id: webhookDto.order_info.order_id,
        status: webhookDto.order_info.status,
      };
    } catch (error) {
      throw new BadRequestException(`Webhook processing failed: ${error.message}`);
    }
  }

  async getWebhookLogs(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const logs = await this.webhookLogsModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.webhookLogsModel.countDocuments();

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}
