# 🏫 School Payment Management System

A comprehensive full-stack application for managing school payments, transactions, and analytics. This project consists of a modern React frontend dashboard and a robust NestJS backend API with MongoDB integration.

## 🌟 Project Overview

This system provides a complete solution for schools to manage their payment processes, including:

- **Payment Processing** - Create and manage payment requests
- **Transaction Monitoring** - Real-time transaction tracking and status updates
- **Analytics Dashboard** - Comprehensive insights and reporting
- **User Management** - Secure authentication and authorization
- **Webhook Integration** - Real-time payment status updates

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Frontend (React)  │    │   Backend (NestJS)  │    │   Database (MongoDB)│
│                     │    │                     │    │                     │
│  • Dashboard UI     │◄──►│  • REST API         │◄──►│  • Orders           │
│  • Analytics        │    │  • Authentication   │    │  • Order Status     │
│  • Transaction Mgmt │    │  • Payment Gateway  │    │  • Users            │
│  • Real-time Updates│    │  • Webhook Handler  │    │  • Webhook Logs     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd school-payment-system
```

### 2. Backend Setup
```bash
cd school-payment-backend
npm install
cp .env.example .env
# Configure your .env file with MongoDB URI and API keys
npm run start:dev
```

### 3. Frontend Setup
```bash
cd ../lumina-pay-dashboard
npm install
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:8081
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 📁 Project Structure

```
school-payment-system/
├── school-payment-backend/          # NestJS Backend API
│   ├── src/
│   │   ├── auth/                   # Authentication module
│   │   ├── payment/                # Payment processing
│   │   ├── webhook/                # Webhook handling
│   │   ├── schemas/                # MongoDB schemas
│   │   └── scripts/                # Database seeding scripts
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── README.md
├── lumina-pay-dashboard/           # React Frontend
│   ├── src/
│   │   ├── components/             # UI components
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom hooks
│   │   ├── lib/                    # Utilities and API client
│   │   └── types/                  # TypeScript definitions
│   ├── package.json
│   └── README.md
└── README.md                       # This file
```

## 🛠️ Technology Stack

### **Backend (NestJS)**
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator & class-transformer
- **API**: RESTful API with Swagger documentation

### **Frontend (React)**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### **Database (MongoDB)**
- **Cloud**: MongoDB Atlas
- **Schemas**: Order, OrderStatus, User, WebhookLogs
- **Indexing**: Optimized for performance
- **Aggregation**: Complex queries for analytics

## 🔌 API Endpoints

### **Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### **Payments**
- `POST /payment/create-payment` - Create payment request
- `GET /payment/transactions` - Get all transactions
- `GET /payment/transactions/school/:id` - Get school transactions
- `GET /payment/transaction-status/:id` - Get transaction status

### **Webhooks**
- `POST /webhook` - Process payment webhooks
- `GET /webhook/logs` - Get webhook logs

## 📊 Features

### **Dashboard Features**
- ✅ **Real-time Transaction Monitoring**
- ✅ **Interactive Analytics Charts**
- ✅ **Transaction Status Distribution**
- ✅ **Revenue Trends Visualization**
- ✅ **Responsive Design**
- ✅ **Dark/Light Theme Support**

### **Backend Features**
- ✅ **JWT Authentication**
- ✅ **Payment Gateway Integration**
- ✅ **Webhook Processing**
- ✅ **Data Validation**
- ✅ **Error Handling**
- ✅ **Pagination & Sorting**
- ✅ **MongoDB Aggregation**

### **Security Features**
- ✅ **Password Hashing (bcrypt)**
- ✅ **JWT Token Management**
- ✅ **Input Validation**
- ✅ **CORS Configuration**
- ✅ **Environment Variable Protection**

## 🧪 Testing

### **Backend Testing**
```bash
cd school-payment-backend
npm run test
npm run test:e2e
npm run test:cov
```

### **Frontend Testing**
```bash
cd lumina-pay-dashboard
npm run test
npm run test:coverage
```

### **API Testing with Postman**
Import the provided Postman collection:
```bash
# Collection file: school-payment-backend/postman-collection.json
```

## 🚀 Deployment

### **Backend Deployment**
```bash
cd school-payment-backend
npm run build
npm run start:prod
```

### **Frontend Deployment**
```bash
cd lumina-pay-dashboard
npm run build
# Deploy dist/ folder to your hosting service
```

### **Environment Variables**
```env
# Backend (.env)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PAYMENT_API_KEY=your-payment-api-key

# Frontend (.env.local)
VITE_API_BASE_URL=https://your-api-domain.com
```

## 📈 Performance & Scalability

### **Backend Optimizations**
- MongoDB indexing on frequently queried fields
- Pagination for large datasets
- Efficient aggregation pipelines
- Connection pooling
- Caching strategies

### **Frontend Optimizations**
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Memoization for expensive calculations
- Virtual scrolling for large lists

## 🔒 Security Considerations

### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Password strength requirements
- Session management

### **Data Protection**
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting

### **API Security**
- HTTPS enforcement
- CORS configuration
- Request validation
- Error message sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Follow the existing code style
- Use conventional commit messages

## 📝 Documentation

- **Backend API**: [Backend README](school-payment-backend/README.md)
- **Frontend UI**: [Frontend README](lumina-pay-dashboard/README.md)
- **API Documentation**: Available at `/api` when backend is running
- **Postman Collection**: [postman-collection.json](school-payment-backend/postman-collection.json)

## 🐛 Troubleshooting

### **Common Issues**

#### **Backend Issues**
```bash
# MongoDB connection issues
# Check MONGODB_URI in .env file
# Ensure MongoDB Atlas IP whitelist includes your IP

# Port already in use
npx kill-port 3000
```

#### **Frontend Issues**
```bash
# Port already in use
npx kill-port 8081

# API connection issues
# Check VITE_API_BASE_URL in .env.local
# Ensure backend is running on correct port
```

#### **Database Issues**
```bash
# Reset database with seed data
cd school-payment-backend
npm run seed

# Add more test data
npm run add-transactions
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### **Getting Help**
- Create an issue in the repository
- Check the troubleshooting section
- Review the documentation
- Contact the development team

### **Useful Links**
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🎉 Acknowledgments

- **NestJS Team** - For the amazing backend framework
- **React Team** - For the powerful frontend library
- **MongoDB** - For the flexible database solution
- **shadcn/ui** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework

---

**Built with ❤️ for modern school payment management**

*This project demonstrates a complete full-stack application with modern technologies, best practices, and comprehensive documentation.*
