# 🏫 Lumina Pay Dashboard

A modern, responsive school payment management dashboard built with React, TypeScript, and Tailwind CSS. This frontend application provides a comprehensive interface for managing school payments, viewing transaction analytics, and monitoring payment performance.

## 🌟 Features

### 📊 **Dashboard Overview**
- **Real-time Transaction Monitoring** - Live updates of payment transactions
- **Interactive Statistics Cards** - Key metrics with animated counters
- **Transaction Table** - Sortable, filterable table with pagination
- **Status Distribution Charts** - Visual representation of payment statuses
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 📈 **Analytics & Reporting**
- **Transaction Status Distribution** - Pie charts showing success/failure rates
- **Revenue Trends** - Area charts displaying financial performance
- **Performance Insights** - Peak hours, top gateways, and response times
- **Real-time Data Integration** - Live data from MongoDB backend

### 🔧 **User Experience**
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Dark/Light Theme Support** - Toggle between themes
- **Interactive Components** - Hover effects, loading states, and transitions
- **Toast Notifications** - User feedback for all actions
- **Modal Dialogs** - Detailed transaction information popups

### 🛡️ **Security & Performance**
- **JWT Authentication** - Secure user authentication
- **API Integration** - RESTful API communication with backend
- **Error Handling** - Comprehensive error management
- **Loading States** - Smooth loading indicators
- **Data Validation** - Client-side form validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumina-pay-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8081` (or the port shown in terminal)

## 🏗️ Project Structure

```
lumina-pay-dashboard/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components (Header, Sidebar, Footer)
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and API client
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   └── main.tsx            # Application entry point
├── public/                  # Static assets
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Technology Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

### **UI & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons

### **Data Visualization**
- **Recharts** - Composable charting library
- **Chart.js Integration** - Advanced charting capabilities

### **State Management**
- **React Hooks** - Built-in state management
- **Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic

## 📱 Pages & Features

### 🏠 **Dashboard Page**
- **Transaction Overview** - Recent transactions with status indicators
- **Statistics Cards** - Total transactions, amounts, success rates
- **Interactive Table** - Sortable columns, pagination, filtering
- **Quick Actions** - View details, copy order IDs, export data

### 📊 **Analytics Page**
- **Status Distribution** - Pie chart showing transaction statuses
- **Revenue Trends** - Area chart with monthly revenue data
- **Performance Metrics** - Key performance indicators
- **Real-time Updates** - Live data from backend API

### ⚙️ **Settings Page**
- **User Preferences** - Theme selection, notification settings
- **API Configuration** - Backend endpoint configuration
- **Data Management** - Export/import functionality

## 🔌 API Integration

### **Backend Communication**
```typescript
// API client configuration
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### **Available Endpoints**
- `GET /payment/transactions` - Fetch all transactions
- `GET /payment/transactions/school/:id` - School-specific transactions
- `GET /payment/transaction-status/:id` - Transaction status check
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration

### **Data Flow**
1. **API Calls** - Axios-based HTTP client
2. **Data Transformation** - Convert backend data to frontend format
3. **State Management** - React hooks for state management
4. **UI Updates** - Real-time UI updates with loading states

## 🎯 Key Components

### **TransactionTable**
```typescript
interface TransactionTableProps {
  data: Transaction[];
  isLoading?: boolean;
}
```
- Sortable columns (Date, Amount, Status, etc.)
- Pagination with customizable page sizes
- Search and filter functionality
- Action buttons (View, Copy, Export)

### **TransactionDetailsModal**
```typescript
interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}
```
- Detailed transaction information
- Payment method and gateway details
- Student and school information
- Copy-to-clipboard functionality

### **StatsCard**
```typescript
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType;
  color: 'primary' | 'success' | 'warning' | 'destructive';
}
```
- Animated counters
- Trend indicators
- Icon integration
- Responsive design

## 🎨 Styling & Theming

### **Tailwind CSS Configuration**
```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // ... custom color palette
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### **Custom CSS Classes**
- **Gradient Backgrounds** - `gradient-primary`, `gradient-success`
- **3D Card Effects** - `card-3d` with shadow and depth
- **Animation Classes** - Smooth transitions and hover effects
- **Responsive Utilities** - Mobile-first responsive design

## 🔧 Development

### **Available Scripts**
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### **Environment Variables**
```env
# .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Lumina Pay Dashboard
VITE_APP_VERSION=1.0.0
```

### **Code Quality**
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks for quality assurance

## 📦 Dependencies

### **Core Dependencies**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
```

### **UI & Styling**
```json
{
  "tailwindcss": "^3.3.0",
  "@radix-ui/react-*": "^1.0.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.300.0"
}
```

### **Data & Charts**
```json
{
  "recharts": "^2.8.0",
  "axios": "^1.6.0",
  "@tanstack/react-table": "^8.0.0"
}
```

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Deploy to Netlify**
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### **Environment Configuration**
```env
# Production environment variables
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=Lumina Pay Dashboard
```

## 🧪 Testing

### **Component Testing**
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### **E2E Testing**
```bash
# Run E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### **Documentation**
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### **Getting Help**
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section below

## 🔧 Troubleshooting

### **Common Issues**

#### **Port Already in Use**
```bash
# Kill process on port 8081
npx kill-port 8081

# Or use a different port
npm run dev -- --port 3001
```

#### **API Connection Issues**
- Ensure backend is running on `http://localhost:3000`
- Check CORS configuration in backend
- Verify API endpoints are correct

#### **Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

## 🎉 Acknowledgments

- **shadcn/ui** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Recharts** - For data visualization
- **React Team** - For the amazing React framework

---

**Built with ❤️ for modern school payment management**