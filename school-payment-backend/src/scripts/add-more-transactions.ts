import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { OrderStatus } from '../schemas/order-status.schema';

async function addMoreTransactions() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const orderModel = app.get<Model<Order>>(getModelToken(Order.name));
  const orderStatusModel = app.get<Model<OrderStatus>>(getModelToken(OrderStatus.name));

  try {
    // Create more dummy orders
    const additionalOrders = [
      {
        school_id: '65b0e6293e9f76a9694d84b4',
        trustee_id: '65b0e6293e9f76a9694d84b9',
        student_info: {
          name: 'Sarah Wilson',
          id: 'STU004',
          email: 'sarah@example.com',
        },
        gateway_name: 'PhonePe',
        custom_order_id: 'ORDER_004',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b5',
        trustee_id: '65b0e6293e9f76a9694d84ba',
        student_info: {
          name: 'David Brown',
          id: 'STU005',
          email: 'david@example.com',
        },
        gateway_name: 'Razorpay',
        custom_order_id: 'ORDER_005',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b6',
        trustee_id: '65b0e6293e9f76a9694d84bb',
        student_info: {
          name: 'Emily Davis',
          id: 'STU006',
          email: 'emily@example.com',
        },
        gateway_name: 'PayU',
        custom_order_id: 'ORDER_006',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b4',
        trustee_id: '65b0e6293e9f76a9694d84bc',
        student_info: {
          name: 'Michael Garcia',
          id: 'STU007',
          email: 'michael@example.com',
        },
        gateway_name: 'PhonePe',
        custom_order_id: 'ORDER_007',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b7',
        trustee_id: '65b0e6293e9f76a9694d84bd',
        student_info: {
          name: 'Lisa Martinez',
          id: 'STU008',
          email: 'lisa@example.com',
        },
        gateway_name: 'Razorpay',
        custom_order_id: 'ORDER_008',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b5',
        trustee_id: '65b0e6293e9f76a9694d84be',
        student_info: {
          name: 'James Anderson',
          id: 'STU009',
          email: 'james@example.com',
        },
        gateway_name: 'PayU',
        custom_order_id: 'ORDER_009',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b6',
        trustee_id: '65b0e6293e9f76a9694d84bf',
        student_info: {
          name: 'Jennifer Taylor',
          id: 'STU010',
          email: 'jennifer@example.com',
        },
        gateway_name: 'PhonePe',
        custom_order_id: 'ORDER_010',
      },
    ];

    const createdOrders = await orderModel.insertMany(additionalOrders);

    // Create corresponding order statuses
    const additionalOrderStatuses = [
      {
        collect_id: createdOrders[0]._id,
        order_amount: 2500,
        transaction_amount: 2750,
        payment_mode: 'upi',
        payment_details: 'success@ybl',
        bank_reference: 'HDFC002',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-16T09:15:00Z'),
      },
      {
        collect_id: createdOrders[1]._id,
        order_amount: 1800,
        transaction_amount: 1980,
        payment_mode: 'card',
        payment_details: 'VISA****5678',
        bank_reference: 'ICICI003',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-16T10:30:00Z'),
      },
      {
        collect_id: createdOrders[2]._id,
        order_amount: 3200,
        transaction_amount: 0,
        payment_mode: 'failed',
        payment_details: 'Payment failed',
        bank_reference: 'N/A',
        payment_message: 'Payment failed',
        status: 'failed',
        error_message: 'Card declined',
        payment_time: new Date('2025-01-16T11:45:00Z'),
      },
      {
        collect_id: createdOrders[3]._id,
        order_amount: 1500,
        transaction_amount: 1650,
        payment_mode: 'upi',
        payment_details: 'success@paytm',
        bank_reference: 'SBI004',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-16T14:20:00Z'),
      },
      {
        collect_id: createdOrders[4]._id,
        order_amount: 2800,
        transaction_amount: 3080,
        payment_mode: 'card',
        payment_details: 'MASTERCARD****1234',
        bank_reference: 'AXIS005',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-16T15:10:00Z'),
      },
      {
        collect_id: createdOrders[5]._id,
        order_amount: 2200,
        transaction_amount: 0,
        payment_mode: 'failed',
        payment_details: 'Payment failed',
        bank_reference: 'N/A',
        payment_message: 'Payment failed',
        status: 'failed',
        error_message: 'Insufficient funds',
        payment_time: new Date('2025-01-16T16:30:00Z'),
      },
      {
        collect_id: createdOrders[6]._id,
        order_amount: 1900,
        transaction_amount: 2090,
        payment_mode: 'upi',
        payment_details: 'success@googlepay',
        bank_reference: 'KOTAK006',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-16T17:45:00Z'),
      },
    ];

    await orderStatusModel.insertMany(additionalOrderStatuses);

    console.log('✅ Additional transactions created successfully!');
    console.log('📊 Added:');
    console.log(`   - ${createdOrders.length} new orders`);
    console.log(`   - ${additionalOrderStatuses.length} new order statuses`);
    
    const totalOrders = await orderModel.countDocuments();
    const totalStatuses = await orderStatusModel.countDocuments();
    
    console.log(`\n📈 Total in database:`);
    console.log(`   - ${totalOrders} orders`);
    console.log(`   - ${totalStatuses} order statuses`);
    
  } catch (error) {
    console.error('❌ Error adding transactions:', error);
  } finally {
    await app.close();
  }
}

addMoreTransactions();
