import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, DollarSign } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { transactionAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const revenueData = [
  { month: 'Jan', revenue: 45000, transactions: 320 },
  { month: 'Feb', revenue: 52000, transactions: 380 },
  { month: 'Mar', revenue: 48000, transactions: 340 },
  { month: 'Apr', revenue: 61000, transactions: 420 },
  { month: 'May', revenue: 55000, transactions: 390 },
  { month: 'Jun', revenue: 67000, transactions: 450 },
];

// Default status data (fallback)
const defaultStatusData = [
  { name: 'Success', value: 85, color: 'hsl(var(--success))' },
  { name: 'Pending', value: 10, color: 'hsl(var(--warning))' },
  { name: 'Failed', value: 5, color: 'hsl(var(--destructive))' },
];

const chartConfig = {
  revenue: { label: 'Revenue', color: 'hsl(var(--primary))' },
  transactions: { label: 'Transactions', color: 'hsl(var(--accent))' },
};

export default function Analytics() {
  const [statusData, setStatusData] = useState(defaultStatusData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all transactions to calculate status distribution
        const response = await transactionAPI.getAllTransactions({ limit: 1000 });
        const transactions = response.data.transactions || [];
        
        if (transactions.length > 0) {
          // Calculate status distribution
          const statusCounts = transactions.reduce((acc: any, tx: any) => {
            const status = tx.status === 'success' ? 'Success' : 
                          tx.status === 'failed' ? 'Failed' : 'Pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          }, {});

          const total = transactions.length;
          const newStatusData = [
            { 
              name: 'Success', 
              value: Math.round((statusCounts.Success || 0) / total * 100), 
              color: 'hsl(var(--success))' 
            },
            { 
              name: 'Pending', 
              value: Math.round((statusCounts.Pending || 0) / total * 100), 
              color: 'hsl(var(--warning))' 
            },
            { 
              name: 'Failed', 
              value: Math.round((statusCounts.Failed || 0) / total * 100), 
              color: 'hsl(var(--destructive))' 
            },
          ];

          setStatusData(newStatusData);
          
          toast({
            title: 'Analytics loaded',
            description: `Loaded status distribution from ${total} transactions.`,
          });
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        toast({
          title: 'Using fallback data',
          description: 'Could not load real analytics data. Using sample data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [toast]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into your payment performance and trends.
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$328,000', change: '+12.5%', icon: DollarSign, color: 'primary' },
          { title: 'Avg Transaction Value', value: '$145.50', change: '+8.2%', icon: TrendingUp, color: 'accent' },
          { title: 'Success Rate', value: '94.2%', change: '+2.1%', icon: Activity, color: 'success' },
          { title: 'Monthly Growth', value: '15.8%', change: '+3.4%', icon: BarChart3, color: 'warning' },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-3d rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-lg gradient-${metric.color} flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-success font-medium">{metric.change}</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
            <p className="text-sm text-muted-foreground">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-3d rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
          <ChartContainer config={chartConfig} className="h-80">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
              <YAxis className="text-xs fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                fill="var(--color-revenue)"
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </AreaChart>
          </ChartContainer>
        </motion.div>

        {/* Transaction Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-3d rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Transaction Status Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <PieChart width={300} height={300}>
                <Pie
                  data={statusData}
                  cx={150}
                  cy={150}
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  nameKey="name"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            )}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card-3d rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <PieChartIcon className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Peak Hours</h4>
            <p className="text-sm text-muted-foreground">2PM - 4PM</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <BarChart3 className="h-8 w-8 text-accent mx-auto mb-2" />
            <h4 className="font-semibold">Top Gateway</h4>
            <p className="text-sm text-muted-foreground">Stripe (68%)</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/20">
            <Activity className="h-8 w-8 text-success mx-auto mb-2" />
            <h4 className="font-semibold">Response Time</h4>
            <p className="text-sm text-muted-foreground">1.2s avg</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}