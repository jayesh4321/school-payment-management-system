import { motion } from 'framer-motion';
import { X, Play, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'video' | 'schedule';
}

export default function DemoModal({ isOpen, onClose, type }: DemoModalProps) {
  const { toast } = useToast();

  const handleScheduleDemo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Scheduled!",
      description: "We'll send you a confirmation email with the meeting details.",
    });
    onClose();
  };

  if (type === 'video') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Demo Video</h3>
                <p className="text-white/80">
                  Watch how SchoolPay transforms payment management for educational institutions
                </p>
                <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-sm">
                    🎥 Complete platform walkthrough<br />
                    📊 Live dashboard demonstration<br />
                    💳 Payment processing showcase<br />
                    📈 Analytics and reporting features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Schedule a Demo
          </DialogTitle>
          <DialogDescription>
            Book a personalized demo with our team to see how SchoolPay can help your institution.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleScheduleDemo} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name</label>
              <Input placeholder="John" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name</label>
              <Input placeholder="Doe" required />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input type="email" placeholder="john.doe@school.edu" required />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Institution Name</label>
            <Input placeholder="Springfield Elementary School" required />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Role</label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrator">School Administrator</SelectItem>
                <SelectItem value="finance">Finance Director</SelectItem>
                <SelectItem value="it">IT Manager</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Preferred Time</label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
            <Textarea 
              placeholder="Tell us about your specific needs or questions..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gradient-primary text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}