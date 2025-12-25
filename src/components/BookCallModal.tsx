import { useState } from 'react';
import { Calendar, Clock, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface BookCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export const BookCallModal = ({ open, onOpenChange }: BookCallModalProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !name || !email) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to book a call.",
        variant: "destructive"
      });
      return;
    }

    // Generate Google Meet link (opens Google Calendar with Meet enabled)
    const startTime = new Date(`${selectedDate}T${convertTo24Hour(selectedTime)}`);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 min duration

    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.set('text', `Discovery Call with ${name}`);
    googleCalendarUrl.searchParams.set('dates', `${formatGoogleDate(startTime)}/${formatGoogleDate(endTime)}`);
    googleCalendarUrl.searchParams.set('details', `Topic: ${topic || 'Project Discussion'}\n\nAttendee: ${name}\nEmail: ${email}\n\n[Google Meet link will be added automatically]`);
    googleCalendarUrl.searchParams.set('add', email);
    googleCalendarUrl.searchParams.set('crm', 'AVAILABLE');
    googleCalendarUrl.searchParams.set('trp', 'true'); // Enable video conferencing

    window.open(googleCalendarUrl.toString(), '_blank');

    toast({
      title: "Opening Google Calendar",
      description: "Complete the event creation to get your Google Meet link.",
    });

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setEmail('');
    setTopic('');
    onOpenChange(false);
  };

  const convertTo24Hour = (time: string) => {
    const [hourMin, period] = time.split(' ');
    let [hours, minutes] = hourMin.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
  };

  // Get next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates.slice(0, 5);
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50 p-0 overflow-hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header */}
              <motion.div 
                className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-xl font-display">
                    <motion.div 
                      className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Video className="w-5 h-5 text-primary" />
                    </motion.div>
                    Book a Call
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm mt-2">
                    Schedule a 30-minute discovery call via Google Meet
                  </p>
                </DialogHeader>
              </motion.div>

              <motion.form 
                onSubmit={handleBookCall} 
                className="p-6 space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Name & Email */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                placeholder="your@email.com"
                required
              />
            </div>
                </motion.div>

                {/* Date Selection */}
                <motion.div variants={itemVariants}>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Select Date
            </label>
            <div className="flex gap-2 flex-wrap">
              {getAvailableDates().map((date) => (
                <motion.button
                  key={formatDateValue(date)}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDate(formatDateValue(date))}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedDate === formatDateValue(date)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 border border-border/50 hover:border-primary/50'
                  }`}
                >
                  {formatDateDisplay(date)}
                </motion.button>
              ))}
            </div>
                </motion.div>

                {/* Time Selection */}
                <motion.div variants={itemVariants}>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-muted-foreground">
              <Clock className="w-4 h-4" />
              Select Time (IST)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 border border-border/50 hover:border-primary/50'
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
                </motion.div>

                {/* Topic */}
                <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Topic (Optional)</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
              placeholder="What would you like to discuss?"
            />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full" size="lg">
                    Schedule with Google Meet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
