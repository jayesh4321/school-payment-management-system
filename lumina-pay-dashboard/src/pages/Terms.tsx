import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
          Terms of Service
        </h1>
        <p className="text-muted-foreground">
          Last updated: December 13, 2024
        </p>
      </motion.div>

      <div className="space-y-8">
        {[
          {
            icon: CheckCircle,
            title: "Acceptance of Terms",
            content: "By accessing and using SchoolPay, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
          },
          {
            icon: FileText,
            title: "Use License",
            content: "Permission is granted to temporarily use SchoolPay for educational payment processing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials."
          },
          {
            icon: AlertTriangle,
            title: "Disclaimer",
            content: "The materials on SchoolPay are provided on an 'as is' basis. SchoolPay makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability."
          },
          {
            icon: Scale,
            title: "Limitations",
            content: "In no event shall SchoolPay or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use SchoolPay materials."
          }
        ].map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-3d border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className="h-6 w-6 mr-3 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}