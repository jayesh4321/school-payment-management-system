import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Transaction, TransactionStats } from '@/types';
import { transactionAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo
const mockTransactions: Transaction[] = [
  {
    collect_id: '1',
    school_id: 'SPR-001',
    gateway: 'stripe',
    order_amount: 150.00,
    transaction_amount: 145.50,
    status: 'Success',
    custom_order_id: 'ORD-12345',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    student_name: 'John Doe',
  },
  {
    collect_id: '2',
    school_id: 'SPR-002',
    gateway: 'paypal',
    order_amount: 200.00,
    transaction_amount: 195.00,
    status: 'Pending',
    custom_order_id: 'ORD-12346',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    student_name: 'Jane Smith',
  },
  {
    collect_id: '3',
    school_id: 'SPR-001',
    gateway: 'stripe',
    order_amount: 75.00,
    transaction_amount: 72.50,
    status: 'Failed',
    custom_order_id: 'ORD-12347',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    student_name: 'Mike Johnson',
  },
];

const chartData = [
  { date: '2024-01', success: 450, failed: 45, pending: 30 },
  { date: '2024-02', success: 520, failed: 32, pending: 25 },
  { date: '2024-03', success: 680, failed: 28, pending: 35 },
  { date: '2024-04', success: 750, failed: 22, pending: 28 },
  { date: '2024-05', success: 820, failed: 18, pending: 32 },
  { date: '2024-06', success: 900, failed: 15, pending: 20 },
];

const chartConfig = {
  success: {
    label: 'Success',
    color: 'hsl(var(--success))',
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--destructive))',
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--warning))',
  },
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch real data from API
        const transactionsRes = await transactionAPI.getAllTransactions({ limit: 10 });
        
        // Transform the API data to match the expected format
        const apiTransactions = transactionsRes.data.transactions.map((tx: any) => ({
          collect_id: tx.collect_id,
          school_id: tx.school_id,
          gateway: tx.gateway,
          order_amount: tx.order_amount,
          transaction_amount: tx.transaction_amount,
          status: tx.status === 'success' ? 'Success' : tx.status === 'failed' ? 'Failed' : 'Pending',
          custom_order_id: tx.custom_order_id,
          created_at: tx.payment_time,
          updated_at: tx.payment_time,
          student_name: tx.student_info?.name || 'Unknown',
          payment_method: tx.payment_mode || 'Unknown',
          description: `Payment via ${tx.gateway} for ${tx.student_info?.name || 'Student'}`,
        }));
        
        setTransactions(apiTransactions);
        
        // Calculate stats from real data
        const totalAmount = apiTransactions.reduce((sum: number, tx: any) => sum + (tx.transaction_amount || 0), 0);
        const successCount = apiTransactions.filter((tx: any) => tx.status === 'Success').length;
        const pendingCount = apiTransactions.filter((tx: any) => tx.status === 'Pending').length;
        const failedCount = apiTransactions.filter((tx: any) => tx.status === 'Failed').length;
        const successRate = apiTransactions.length > 0 ? (successCount / apiTransactions.length) * 100 : 0;
        
        setStats({
          total_transactions: apiTransactions.length,
          total_amount: totalAmount,
          success_rate: Math.round(successRate * 10) / 10,
          pending_count: pendingCount,
          failed_count: failedCount,
          monthly_growth: 12.5, // This would come from a separate API call
          top_schools: [
            { school_id: 'SPR-001', school_name: 'Springfield Elementary', transaction_count: 145, total_amount: 15420 },
            { school_id: 'SPR-002', school_name: 'Oakwood High School', transaction_count: 132, total_amount: 18650 },
          ],
        });
        
        toast({
          title: 'Dashboard loaded',
          description: `Loaded ${apiTransactions.length} transactions from MongoDB successfully.`,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        
        // Fallback to mock data if API fails
        setTransactions(mockTransactions);
        setStats({
          total_transactions: 1247,
          total_amount: 52847.50,
          success_rate: 94.2,
          pending_count: 23,
          failed_count: 18,
          monthly_growth: 12.5,
          top_schools: [
            { school_id: 'SPR-001', school_name: 'Springfield Elementary', transaction_count: 145, total_amount: 15420 },
            { school_id: 'SPR-002', school_name: 'Oakwood High School', transaction_count: 132, total_amount: 18650 },
          ],
        });
        
        toast({
          title: 'Using fallback data',
          description: 'API connection failed. Using mock data for demonstration.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.total_amount.toLocaleString() || '0'}`,
      change: `+${stats?.monthly_growth || 0}% from last month`,
      changeType: 'positive' as const,
      icon: DollarSign,
      gradient: 'gradient-primary',
    },
    {
      title: 'Total Transactions',
      value: stats?.total_transactions.toLocaleString() || '0',
      change: '+8.2% from last month',
      changeType: 'positive' as const,
      icon: CreditCard,
      gradient: 'gradient-accent',
    },
    {
      title: 'Success Rate',
      value: `${stats?.success_rate || 0}%`,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: CheckCircle,
      gradient: 'gradient-success',
    },
    {
      title: 'Pending Payments',
      value: stats?.pending_count.toString() || '0',
      change: '-5 from yesterday',
      changeType: 'positive' as const,
      icon: Clock,
      gradient: 'bg-warning',
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your school payments today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard
            key={card.title}
            {...card}
            index={index}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-3d rounded-xl p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Transaction Trends</h3>
            <p className="text-sm text-muted-foreground">
              Monthly transaction volume by status
            </p>
          </div>
          
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs fill-muted-foreground"
              />
              <YAxis className="text-xs fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="success"
                stroke="var(--color-success)"
                strokeWidth={3}
                dot={{ fill: "var(--color-success)", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="var(--color-failed)"
                strokeWidth={2}
                dot={{ fill: "var(--color-failed)", strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="var(--color-pending)"
                strokeWidth={2}
                dot={{ fill: "var(--color-pending)", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </motion.div>

        {/* Top Schools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card-3d rounded-xl p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Top Schools</h3>
            <p className="text-sm text-muted-foreground">
              Highest revenue generating schools
            </p>
          </div>

          <div className="space-y-4">
            {stats?.top_schools.map((school, index) => (
              <div
                key={school.school_id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 interactive-hover"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary text-white font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{school.school_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {school.transaction_count} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    ${school.total_amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <TransactionTable 
        data={transactions} 
        isLoading={isLoading}
      />
    </div>
  );
}