import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { OrderStatus } from '../schemas/order-status.schema';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const orderModel = app.get<Model<Order>>(getModelToken(Order.name));
  const orderStatusModel = app.get<Model<OrderStatus>>(getModelToken(OrderStatus.name));
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  try {
    // Clear existing data
    await orderModel.deleteMany({});
    await orderStatusModel.deleteMany({});
    await userModel.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new userModel({
      email: 'admin@school.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    });
    await adminUser.save();

    // Create school admin user
    const schoolAdminUser = new userModel({
      email: 'school@example.com',
      password: hashedPassword,
      name: 'School Admin',
      role: 'school_admin',
      school_id: '65b0e6293e9f76a9694d84b4',
      isActive: true,
    });
    await schoolAdminUser.save();

    // Create dummy orders
    const orders = [
      {
        school_id: '65b0e6293e9f76a9694d84b4',
        trustee_id: '65b0e6293e9f76a9694d84b5',
        student_info: {
          name: 'John Doe',
          id: 'STU001',
          email: 'john@example.com',
        },
        gateway_name: 'PhonePe',
        custom_order_id: 'ORDER_001',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b4',
        trustee_id: '65b0e6293e9f76a9694d84b6',
        student_info: {
          name: 'Jane Smith',
          id: 'STU002',
          email: 'jane@example.com',
        },
        gateway_name: 'Razorpay',
        custom_order_id: 'ORDER_002',
      },
      {
        school_id: '65b0e6293e9f76a9694d84b7',
        trustee_id: '65b0e6293e9f76a9694d84b8',
        student_info: {
          name: 'Mike Johnson',
          id: 'STU003',
          email: 'mike@example.com',
        },
        gateway_name: 'PayU',
        custom_order_id: 'ORDER_003',
      },
    ];

    const createdOrders = await orderModel.insertMany(orders);

    // Create dummy order statuses
    const orderStatuses = [
      {
        collect_id: createdOrders[0]._id,
        order_amount: 2000,
        transaction_amount: 2200,
        payment_mode: 'upi',
        payment_details: 'success@ybl',
        bank_reference: 'YESBNK001',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-15T10:30:00Z'),
      },
      {
        collect_id: createdOrders[1]._id,
        order_amount: 1500,
        transaction_amount: 1650,
        payment_mode: 'card',
        payment_details: 'VISA****1234',
        bank_reference: 'HDFC001',
        payment_message: 'Payment successful',
        status: 'success',
        error_message: '',
        payment_time: new Date('2025-01-15T11:45:00Z'),
      },
      {
        collect_id: createdOrders[2]._id,
        order_amount: 3000,
        transaction_amount: 0,
        payment_mode: 'failed',
        payment_details: 'Payment failed',
        bank_reference: 'N/A',
        payment_message: 'Payment failed',
        status: 'failed',
        error_message: 'Insufficient funds',
        payment_time: new Date('2025-01-15T12:15:00Z'),
      },
    ];

    await orderStatusModel.insertMany(orderStatuses);

    console.log('✅ Seed data created successfully!');
    console.log('📊 Created:');
    console.log(`   - ${await userModel.countDocuments()} users`);
    console.log(`   - ${await orderModel.countDocuments()} orders`);
    console.log(`   - ${await orderStatusModel.countDocuments()} order statuses`);
    
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@school.com / admin123');
    console.log('   School Admin: school@example.com / admin123');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await app.close();
  }
}

seed();
