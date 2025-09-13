# School Payment Backend - Setup Guide

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Payment Gateway API credentials

### 2. Installation Steps

```bash
# 1. Navigate to the project directory
cd school-payment-backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Edit .env with your actual credentials

# 4. Build the project
npm run build

# 5. Seed the database with dummy data
npm run seed

# 6. Start the development server
npm run start:dev
```

### 3. Environment Configuration

Update the `.env` file with your actual credentials:

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

### 4. Testing the API

#### Using Postman:
1. Import the `postman-collection.json` file
2. Set the `base_url` variable to `http://localhost:3000`
3. Start with the authentication endpoints

#### Using curl:

```bash
# 1. Register a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "admin"
  }'

# 2. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123"
  }'

# 3. Create a payment (replace YOUR_JWT_TOKEN with actual token)
curl -X POST http://localhost:3000/payment/create-payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "school_id": "65b0e6293e9f76a9694d84b4",
    "trustee_id": "65b0e6293e9f76a9694d84b5",
    "student_name": "John Doe",
    "student_id": "STU001",
    "student_email": "john@example.com",
    "gateway_name": "PhonePe",
    "order_amount": 2000
  }'
```

### 5. API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/profile` | Get user profile | Yes |
| POST | `/payment/create-payment` | Create payment request | Yes |
| GET | `/payment/transactions` | Get all transactions | Yes |
| GET | `/payment/transactions/school/:schoolId` | Get school transactions | Yes |
| GET | `/payment/transaction-status/:customOrderId` | Get transaction status | Yes |
| POST | `/webhook` | Process payment webhook | No |
| GET | `/webhook/logs` | Get webhook logs | Yes |

### 6. Database Collections

After running the seed script, you'll have:
- **users**: Admin and test users
- **orders**: Sample payment orders
- **orderstatuses**: Payment status records
- **webhooklogs**: Webhook processing logs

### 7. Troubleshooting

#### Common Issues:

1. **MongoDB Connection Error**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted
   - Verify database credentials

2. **JWT Token Issues**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration time
   - Verify token format in Authorization header

3. **Payment API Errors**
   - Verify PAYMENT_API_KEY is correct
   - Check PG_KEY and SCHOOL_ID values
   - Ensure payment API URL is accessible

4. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript version compatibility
   - Clear node_modules and reinstall if needed

### 8. Development Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Run linting
npm run lint

# Seed database
npm run seed
```

### 9. Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use a production MongoDB instance
3. Set strong JWT secrets
4. Configure proper CORS settings
5. Use HTTPS in production
6. Set up proper logging and monitoring

### 10. Next Steps

- Integrate with your frontend application
- Set up webhook endpoints with payment gateway
- Configure monitoring and logging
- Add rate limiting and security measures
- Set up automated testing
