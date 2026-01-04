import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface BookCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TIME_STEP_MINUTES = 30;

export const BookCallModal = ({ open, onOpenChange }: BookCallModalProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const pad2 = (n: number) => n.toString().padStart(2, "0");

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatTimeLabel = (hours24: number, minutes: number) => {
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${pad2(hours12)}:${pad2(minutes)} ${period}`;
  };

  const generateTimeSlots = (startMinutes: number, endMinutes: number) => {
    const slots: string[] = [];
    for (
      let minutes = startMinutes;
      minutes < endMinutes;
      minutes += TIME_STEP_MINUTES
    ) {
      const hours24 = Math.floor(minutes / 60);
      const mins = minutes % 60;
      slots.push(formatTimeLabel(hours24, mins));
    }
    return slots;
  };

  const getTimeSlotsForDate = (dateValue: string) => {
    if (!dateValue) return [];
    const date = new Date(`${dateValue}T00:00:00`);
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;

    const baseSlots = isWeekend
      ? generateTimeSlots(0, 24 * 60)
      : [
          ...generateTimeSlots(9 * 60, 11 * 60),
          ...generateTimeSlots(18 * 60, 21 * 60),
        ];

    const now = new Date();
    const todayOrFutureSlots = baseSlots.filter((slot) => {
      const startTime = new Date(`${dateValue}T${convertTo24Hour(slot)}`);
      return startTime.getTime() > now.getTime();
    });

    // If selecting a future date, keep all allowed slots.
    // If selecting today, keep only future times.
    return isSameDate(date, now) ? todayOrFutureSlots : baseSlots;
  };

  const handleBookCall = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBooking) return;

    const now = new Date();
    const selectedDay = selectedDate
      ? new Date(`${selectedDate}T00:00:00`)
      : undefined;
    if (selectedDay) {
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      if (selectedDay.getTime() < startOfToday.getTime()) {
        toast({
          title: "Please select a future date",
          description: "You can only book after the current date and time.",
          variant: "destructive",
        });
        return;
      }
    }

    const availableSlots = getTimeSlotsForDate(selectedDate);
    if (
      selectedDate &&
      selectedTime &&
      !availableSlots.includes(selectedTime)
    ) {
      toast({
        title: "Please select an available time",
        description: "Selected time is not available for that date.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedTime || !name || !email) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to book a call.",
        variant: "destructive",
      });
      return;
    }

    const startTimeCheck = new Date(
      `${selectedDate}T${convertTo24Hour(selectedTime)}`
    );
    if (startTimeCheck.getTime() <= now.getTime()) {
      toast({
        title: "Please select a future time",
        description: "You can only book after the current date and time.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          topic,
          selectedDate,
          selectedTime,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        throw new Error('Booking failed');
      }

      const meetLink: string | null = data.meetLink ?? null;
      const eventLink: string | null = data.eventLink ?? null;

      toast({
        title: 'Meeting booked',
        description: meetLink ? 'Google Meet link created. Opening…' : 'Calendar event created. Opening…',
      });

      const toOpen = meetLink || eventLink;
      if (toOpen) {
        window.open(toOpen, '_blank');
      }

      setSelectedDate('');
      setSelectedTime('');
      setName('');
      setEmail('');
      setTopic('');
      onOpenChange(false);
    } catch {
      toast({
        title: 'Failed to book meeting',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsBooking(false);
    }
  };

  const convertTo24Hour = (time: string) => {
    const [hourMin, period] = time.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  // Get next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Include today + future days. Weekends are allowed.
      dates.push(date);
    }
    return dates;
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateValue = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg md:max-w-2xl bg-card border-border/50 p-0 max-h-[90vh] overflow-y-auto">
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
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
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
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Name
                    </label>
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
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Email
                    </label>
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
                    <CalendarIcon className="w-4 h-4" />
                    Select Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      value={selectedDate}
                      min={formatDateValue(new Date())}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTime("");
                      }}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Weekdays: 09:00–11:00 and 18:00–21:00 • Sat/Sun: all day
                  </p>
                </motion.div>

                {/* Time Selection */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Select Time (IST)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {getTimeSlotsForDate(selectedDate).map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedTime === time
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 border border-border/50 hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                  {selectedDate &&
                    getTimeSlotsForDate(selectedDate).length === 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        No slots left for this date. Please choose another date.
                      </p>
                    )}
                </motion.div>

                {/* Topic */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Topic (Optional)
                  </label>
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
                    {isBooking ? 'Booking…' : 'Book Meeting'}
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
