import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  CreditCard,
  School,
  TrendingUp,
  Users,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/dashboard/StatsCard';
import DemoModal from '@/components/ui/demo-modal';

const features = [
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Enterprise-grade security with encrypted transactions and compliance standards.',
    gradient: 'gradient-primary',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Live dashboards with detailed insights and customizable reporting tools.',
    gradient: 'gradient-accent',
  },
  {
    icon: School,
    title: 'Multi-School Support',
    description: 'Manage payments across multiple educational institutions from one platform.',
    gradient: 'gradient-success',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Lightning-fast payment processing with instant confirmations and notifications.',
    gradient: 'bg-warning',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Finance Director',
    school: 'Springfield Elementary',
    content: 'SchoolPay has transformed how we handle payments. The 3D visualizations make data analysis incredibly intuitive.',
    avatar: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'IT Administrator',
    school: 'Oakwood High School',
    content: 'The real-time dashboard and automated reporting have saved us countless hours every month.',
    avatar: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Principal',
    school: 'Riverside Academy',
    content: 'Parents love the transparent payment tracking, and we appreciate the detailed analytics.',
    avatar: 'ER',
  },
];

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoType, setDemoType] = useState<'video' | 'schedule'>('video');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleWatchDemo = () => {
    setDemoType('video');
    setDemoModalOpen(true);
  };

  const handleScheduleDemo = () => {
    setDemoType('schedule');
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5" />
        
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-primary bg-clip-text text-transparent">
                Modern School
              </span>
              <br />
              <span className="text-foreground">Payment Management</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Streamline your educational institution's payment processes with our 
              cutting-edge dashboard featuring real-time analytics, 3D visualizations, 
              and enterprise-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="gradient-primary text-white hover:shadow-glow transition-all duration-300"
              >
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 hover:bg-muted/50"
                onClick={handleWatchDemo}
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="card-3d p-4 w-48"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">$12,450</p>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-32 right-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="card-3d p-4 w-48"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">+24%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Educational Institutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of schools already using SchoolPay to manage their payments efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Schools Served"
              value="2,500+"
              change="Growing daily"
              changeType="positive"
              icon={School}
              gradient="gradient-primary"
              index={0}
            />
            <StatsCard
              title="Monthly Transactions"
              value="45K+"
              change="+18% this quarter"
              changeType="positive"
              icon={CreditCard}
              gradient="gradient-accent"
              index={1}
            />
            <StatsCard
              title="Success Rate"
              value="99.8%"
              change="Industry leading"
              changeType="positive"
              icon={CheckCircle}
              gradient="gradient-success"
              index={2}
            />
            <StatsCard
              title="Students Helped"
              value="1M+"
              change="Across all institutions"
              changeType="positive"
              icon={Users}
              gradient="bg-warning"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Schools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage school payments efficiently with cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-3d p-8 group"
                >
                  <div className={`w-12 h-12 ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Educators Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from the educational professionals who use SchoolPay every day.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card-3d p-8 text-center"
            >
              <blockquote className="text-lg mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].school}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-3d p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your School Payments?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using SchoolPay 
              to streamline their payment processes and enhance their financial operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="gradient-primary text-white hover:shadow-glow transition-all duration-300"
              >
                <Link to="/dashboard">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2"
                onClick={handleScheduleDemo}
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)} 
        type={demoType}
      />
    </div>
  );
}