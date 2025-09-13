import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  BarChart3,
  CreditCard,
  School,
  Users,
  Settings,
  TrendingUp,
  Search,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
    description: 'Dashboard Overview',
  },
  {
    name: 'Transactions',
    path: '/dashboard',
    icon: CreditCard,
    description: 'All Payments',
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: TrendingUp,
    description: 'Reports & Charts',
  },
  {
    name: 'Contacts',
    path: '/contacts',
    icon: Users,
    description: 'Support & Help',
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
    description: 'Preferences',
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 panel-float border-r border-border/50',
          'md:sticky md:translate-x-0 md:z-30',
          !isOpen && 'md:w-16'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <span className="text-sm font-bold text-white">SP</span>
              </div>
              {isOpen && (
                <span className="text-lg font-semibold">SchoolPay</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 768 && onClose()}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    'interactive-hover',
                    isActive
                      ? 'gradient-primary text-white shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className={cn(
                        'text-xs',
                        isActive ? 'text-white/80' : 'text-muted-foreground'
                      )}>
                        {item.description}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <div className={cn(
              'card-3d rounded-lg p-3',
              !isOpen && 'hidden'
            )}>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-lg font-bold text-primary">$52,847</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}