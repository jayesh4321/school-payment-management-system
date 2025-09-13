import { motion } from 'framer-motion';
import { Shield, Zap, Users, Globe, Award, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-6">
          About SchoolPay
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We're revolutionizing how educational institutions handle payments. Our platform provides 
          secure, efficient, and user-friendly payment solutions that help schools focus on what 
          matters most - education.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-3d border-0 h-full">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To simplify financial transactions for educational institutions worldwide, 
                enabling seamless payment experiences that support the educational journey 
                of every student.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-3d border-0 h-full">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg gradient-accent flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading payment platform for educational institutions, 
                fostering financial transparency and efficiency in schools across the globe.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Why Choose SchoolPay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Bank-Level Security',
              description: 'End-to-end encryption and PCI DSS compliance ensure your data is always protected.',
              color: 'primary'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Process payments in seconds with our optimized payment gateway integrations.',
              color: 'accent'
            },
            {
              icon: Users,
              title: 'User Friendly',
              description: 'Intuitive interface designed for educators, students, and parents alike.',
              color: 'success'
            },
            {
              icon: Globe,
              title: 'Global Reach',
              description: 'Support for multiple currencies and payment methods worldwide.',
              color: 'warning'
            },
            {
              icon: Award,
              title: '99.9% Uptime',
              description: 'Reliable service with enterprise-grade infrastructure and monitoring.',
              color: 'primary'
            },
            {
              icon: Target,
              title: 'Smart Analytics',
              description: 'Comprehensive reporting and insights to optimize your payment operations.',
              color: 'accent'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="card-3d border-0 h-full">
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg gradient-${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Company Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card-3d rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-8">SchoolPay by the Numbers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: '2,500+', label: 'Schools Served' },
            { number: '$150M+', label: 'Payments Processed' },
            { number: '1M+', label: 'Students Served' },
            { number: '99.9%', label: 'Uptime' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="text-center space-y-6"
      >
        <h2 className="text-2xl font-bold">Built by Education Technology Experts</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our team combines decades of experience in fintech, education technology, and 
          user experience design to create the most intuitive payment platform for schools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { role: 'Product Development', team: 'Engineering Team', description: 'Building secure, scalable solutions' },
            { role: 'Customer Success', team: 'Support Team', description: 'Ensuring client satisfaction' },
            { role: 'Security & Compliance', team: 'Security Team', description: 'Protecting your data' }
          ].map((team, index) => (
            <div key={team.role} className="p-6 rounded-lg bg-muted/20 interactive-hover">
              <h3 className="font-semibold mb-2">{team.team}</h3>
              <p className="text-sm text-primary font-medium mb-1">{team.role}</p>
              <p className="text-xs text-muted-foreground">{team.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}