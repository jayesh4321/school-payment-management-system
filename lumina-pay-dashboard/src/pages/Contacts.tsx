import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Contacts() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
          Contact Us
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Need help with your school payment system? Our support team is here to assist you 
          with any questions or technical issues.
        </p>
      </motion.div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Mail,
            title: 'Email Support',
            description: 'Get help via email',
            contact: 'support@schoolpay.com',
            action: 'Send Email',
            color: 'primary'
          },
          {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak with our team',
            contact: '+1 (555) 123-4567',
            action: 'Call Now',
            color: 'accent'
          },
          {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Chat with us live',
            contact: 'Available 9AM-6PM EST',
            action: 'Start Chat',
            color: 'success'
          }
        ].map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-3d border-0 h-full">
              <CardHeader className="text-center">
                <div className={`h-16 w-16 rounded-xl gradient-${method.color} flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle>{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-medium mb-4">{method.contact}</p>
                <Button className="w-full" variant="outline">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contact Form & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-3d border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2 text-primary" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="john.doe@school.edu" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">School Name</label>
                <Input placeholder="Springfield Elementary" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="Payment Integration Question" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Please describe your question or issue in detail..."
                  rows={5}
                />
              </div>
              <Button className="w-full gradient-primary text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Office Information */}
          <Card className="card-3d border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Office Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="font-medium">SchoolPay Headquarters</p>
                <p className="text-muted-foreground">
                  123 Education Avenue<br />
                  Learning District, Suite 400<br />
                  Education City, EC 12345<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support Hours */}
          <Card className="card-3d border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Emergency support available 24/7 for critical payment system issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card className="card-3d border-0">
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Payment Gateway Setup',
                  'Transaction Troubleshooting',
                  'API Documentation',
                  'Security & Compliance'
                ].map((item) => (
                  <Button key={item} variant="ghost" className="w-full justify-start" size="sm">
                    {item}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}