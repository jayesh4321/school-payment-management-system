import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated: December 13, 2024
        </p>
      </motion.div>

      <div className="space-y-8">
        {[
          {
            icon: Shield,
            title: "Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, make payments, or contact us for support. This includes names, email addresses, payment information, and transaction details."
          },
          {
            icon: Eye,
            title: "How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and comply with legal obligations."
          },
          {
            icon: Lock,
            title: "Information Security",
            content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
          },
          {
            icon: FileText,
            title: "Data Retention",
            content: "We retain your information for as long as necessary to provide our services and comply with legal obligations. Transaction records are kept for regulatory compliance purposes."
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