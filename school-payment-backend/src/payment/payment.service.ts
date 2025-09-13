import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { Order, OrderDocument } from '../schemas/order.schema';
import { OrderStatus, OrderStatusDocument } from '../schemas/order-status.schema';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatusDocument>,
    private configService: ConfigService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    try {
      // Create order
      const order = new this.orderModel({
        school_id: createPaymentDto.school_id,
        trustee_id: createPaymentDto.trustee_id,
        student_info: {
          name: createPaymentDto.student_name,
          id: createPaymentDto.student_id,
          email: createPaymentDto.student_email,
        },
        gateway_name: createPaymentDto.gateway_name,
        custom_order_id: createPaymentDto.custom_order_id || `ORDER_${Date.now()}`,
      });

      await order.save();

      // Create JWT payload for payment API
      const payload = {
        school_id: this.configService.get<string>('SCHOOL_ID'),
        pg_key: this.configService.get<string>('PG_KEY'),
        order_id: order.custom_order_id,
        order_amount: createPaymentDto.order_amount,
        student_info: order.student_info,
        gateway: createPaymentDto.gateway_name,
      };

      const token = jwt.sign(payload, this.configService.get<string>('JWT_SECRET') || 'default-secret', {
        expiresIn: '1h',
      });

      // Call payment API
      const paymentApiUrl = 'https://api.payment-gateway.com/create-collect-request';
      const response = await axios.post(paymentApiUrl, {
        token,
        order_id: order.custom_order_id,
        amount: createPaymentDto.order_amount,
        gateway: createPaymentDto.gateway_name,
      }, {
        headers: {
          'Authorization': `Bearer ${this.configService.get<string>('PAYMENT_API_KEY')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        // Create initial order status
        const orderStatus = new this.orderStatusModel({
          collect_id: order._id,
          order_amount: createPaymentDto.order_amount,
          transaction_amount: 0,
          payment_mode: '',
          payment_details: '',
          bank_reference: '',
          payment_message: 'Payment initiated',
          status: 'pending',
          error_message: '',
          payment_time: new Date(),
        });

        await orderStatus.save();

        return {
          success: true,
          order_id: order.custom_order_id,
          payment_url: response.data.payment_url,
          message: 'Payment initiated successfully',
        };
      } else {
        throw new BadRequestException('Payment initiation failed');
      }
    } catch (error) {
      throw new BadRequestException(`Payment creation failed: ${error.message}`);
    }
  }

  async getAllTransactions(page: number = 1, limit: number = 10, sortBy: string = 'payment_time', order: string = 'desc') {
    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    const pipeline: any[] = [
      {
        $lookup: {
          from: 'orderstatuses',
          localField: '_id',
          foreignField: 'collect_id',
          as: 'orderStatus'
        }
      },
      {
        $unwind: {
          path: '$orderStatus',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          collect_id: '$_id',
          school_id: '$school_id',
          gateway: '$gateway_name',
          order_amount: '$orderStatus.order_amount',
          transaction_amount: '$orderStatus.transaction_amount',
          status: '$orderStatus.status',
          custom_order_id: '$custom_order_id',
          payment_time: '$orderStatus.payment_time',
          student_info: '$student_info'
        }
      },
      {
        $sort: { [sortBy]: sortOrder }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ];

    const transactions = await this.orderModel.aggregate(pipeline);
    const total = await this.orderModel.countDocuments();

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getTransactionsBySchool(schoolId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const pipeline: any[] = [
      {
        $match: { school_id: schoolId }
      },
      {
        $lookup: {
          from: 'orderstatuses',
          localField: '_id',
          foreignField: 'collect_id',
          as: 'orderStatus'
        }
      },
      {
        $unwind: {
          path: '$orderStatus',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          collect_id: '$_id',
          school_id: '$school_id',
          gateway: '$gateway_name',
          order_amount: '$orderStatus.order_amount',
          transaction_amount: '$orderStatus.transaction_amount',
          status: '$orderStatus.status',
          custom_order_id: '$custom_order_id',
          payment_time: '$orderStatus.payment_time',
          student_info: '$student_info'
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ];

    const transactions = await this.orderModel.aggregate(pipeline);
    const total = await this.orderModel.countDocuments({ school_id: schoolId });

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getTransactionStatus(customOrderId: string) {
    const order = await this.orderModel.findOne({ custom_order_id: customOrderId });
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const orderStatus = await this.orderStatusModel.findOne({ collect_id: order._id });
    if (!orderStatus) {
      throw new BadRequestException('Order status not found');
    }

    return {
      custom_order_id: customOrderId,
      status: orderStatus.status,
      order_amount: orderStatus.order_amount,
      transaction_amount: orderStatus.transaction_amount,
      payment_mode: orderStatus.payment_mode,
      payment_message: orderStatus.payment_message,
      payment_time: orderStatus.payment_time,
      error_message: orderStatus.error_message,
    };
  }
}
