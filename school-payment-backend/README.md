# School Payment and Dashboard Backend

A comprehensive microservice backend for managing school payments and transactions built with NestJS, MongoDB, and JWT authentication.

## 🚀 Features

- **JWT Authentication** - Secure user authentication and authorization
- **Payment Gateway Integration** - Create payment requests and handle responses
- **Webhook Processing** - Real-time payment status updates
- **Transaction Management** - Complete CRUD operations for transactions
- **MongoDB Integration** - Scalable database with proper indexing
- **Data Validation** - Comprehensive input validation using class-validator
- **Error Handling** - Consistent error responses across all endpoints
- **Pagination & Sorting** - Efficient data retrieval with pagination and sorting
- **Security** - CORS enabled, input sanitization, and JWT protection

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Payment Gateway API credentials

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-payment-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/school-payment?retryWrites=true&w=majority

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=24h

   # Payment Gateway Configuration
   PG_KEY=edvtest01
   PAYMENT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVlSWQiOiI2NWIwZTU1MmRkMzE5NTBhOWI0MWM1YmEiLCJJbmRleE9mQXBpS2V5Ijo2fQ.IJWTYCOurGCFdRM2xyKtw6TEcuwXxGnmINrXFfsAdt0
   SCHOOL_ID=65b0e6293e9f76a9694d84b4

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Payment API Base URL
   PAYMENT_API_BASE_URL=https://api.payment-gateway.com
   ```

4. **Start the application**
```bash
   # Development
   npm run start:dev

   # Production
   npm run start:prod
   ```

## 📊 Database Schemas

### Order Schema
```typescript
{
  _id: ObjectId,
  school_id: ObjectId,
  trustee_id: ObjectId,
  student_info: {
    name: string,
    id: string,
    email: string
  },
  gateway_name: string,
  custom_order_id: string
}
```

### Order Status Schema
```typescript
{
  _id: ObjectId,
  collect_id: ObjectId (Reference to Order),
  order_amount: number,
  transaction_amount: number,
  payment_mode: string,
  payment_details: string,
  bank_reference: string,
  payment_message: string,
  status: string,
  error_message: string,
  payment_time: Date
}
```

### Webhook Logs Schema
```typescript
{
  _id: ObjectId,
  order_id: string,
  order_amount: number,
  transaction_amount: number,
  gateway: string,
  bank_reference: string,
  status: string,
  payment_mode: string,
  payment_details: string,
  payment_message: string,
  payment_time: Date,
  error_message: string,
  webhook_payload: object,
  processed: boolean
}
```

### User Schema
```typescript
{
  _id: ObjectId,
  email: string,
  password: string,
  name: string,
  role: string,
  school_id: string,
  trustee_id: string,
  isActive: boolean
}
```

## 🔌 API Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "admin",
  "school_id": "optional",
  "trustee_id": "optional"
}
```

#### POST /auth/login
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /auth/profile
Get user profile (requires JWT token)

### Payment Endpoints

#### POST /payment/create-payment
Create a new payment request
```json
{
  "school_id": "65b0e6293e9f76a9694d84b4",
  "trustee_id": "65b0e6293e9f76a9694d84b5",
  "student_name": "John Doe",
  "student_id": "STU001",
  "student_email": "john@example.com",
  "gateway_name": "PhonePe",
  "order_amount": 2000,
  "custom_order_id": "ORDER_123"
}
```

#### GET /payment/transactions
Get all transactions with pagination and sorting
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Field to sort by (default: payment_time)
- `order`: Sort order - 'asc' or 'desc' (default: desc)

#### GET /payment/transactions/school/:schoolId
Get transactions for a specific school
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### GET /payment/transaction-status/:customOrderId
Get status of a specific transaction

### Webhook Endpoints

#### POST /webhook
Process payment webhook updates
```json
{
  "status": 200,
  "order_info": {
    "order_id": "ORDER_123",
    "order_amount": 2000,
    "transaction_amount": 2200,
    "gateway": "PhonePe",
    "bank_reference": "YESBNK222",
    "status": "success",
    "payment_mode": "upi",
    "payemnt_details": "success@ybl",
    "Payment_message": "payment success",
    "payment_time": "2025-04-23T08:14:21.945+00:00",
    "error_message": "NA"
  }
}
```

#### GET /webhook/logs
Get webhook processing logs
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🧪 Testing with Postman

### 1. Register a User
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "admin123",
  "name": "Admin User",
  "role": "admin"
}
```

### 2. Login
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "admin123"
}
```

### 3. Create Payment (use token from login)
```http
POST http://localhost:3000/payment/create-payment
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "school_id": "65b0e6293e9f76a9694d84b4",
  "trustee_id": "65b0e6293e9f76a9694d84b5",
  "student_name": "John Doe",
  "student_id": "STU001",
  "student_email": "john@example.com",
  "gateway_name": "PhonePe",
  "order_amount": 2000
}
```

### 4. Test Webhook
```http
POST http://localhost:3000/webhook
Content-Type: application/json

{
  "status": 200,
  "order_info": {
    "order_id": "ORDER_123",
    "order_amount": 2000,
    "transaction_amount": 2200,
    "gateway": "PhonePe",
    "bank_reference": "YESBNK222",
    "status": "success",
    "payment_mode": "upi",
    "payemnt_details": "success@ybl",
    "Payment_message": "payment success",
    "payment_time": "2025-04-23T08:14:21.945+00:00",
    "error_message": "NA"
  }
}
```

## 📈 Performance & Scalability

- **Pagination**: All list endpoints support pagination
- **Sorting**: Configurable sorting on all list endpoints
- **Indexing**: MongoDB indexes on frequently queried fields
- **Caching**: Ready for Redis integration
- **Rate Limiting**: Can be easily added with @nestjs/throttler

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Error message sanitization

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PAYMENT_API_KEY=your-production-payment-api-key
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 📝 Development

### Running in Development Mode
```bash
npm run start:dev
```

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.