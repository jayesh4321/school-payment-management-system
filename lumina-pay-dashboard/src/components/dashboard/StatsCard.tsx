import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient?: string;
  index?: number;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient = 'gradient-primary',
  index = 0,
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-3d rounded-xl p-6 group"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={cn('text-xs font-medium flex items-center gap-1', getChangeColor())}>
            {change}
          </p>
        </div>
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg',
          gradient,
          'group-hover:shadow-glow transition-all duration-300'
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}