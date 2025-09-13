import { Link } from 'react-router-dom';
import { Facebook, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/schoolpay' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/schoolpay' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/schoolpay' },
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'API Documentation', path: '/docs' },
        { name: 'Pricing', path: '/pricing' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contacts' },
        { name: 'Status Page', path: '/status' },
        { name: 'Tutorials', path: '/tutorials' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Data Protection', path: '/data-protection' },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <span className="text-lg font-bold text-white">SP</span>
              </div>
              <h3 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                SchoolPay
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Modern school payment management system with real-time analytics, 
              secure transactions, and comprehensive reporting tools.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@schoolpay.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Education Ave, Learning City, LC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} SchoolPay Dashboard. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}