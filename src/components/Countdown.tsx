import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Bell, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC = () => {
  // Target: October 30, 2026 at 4:00 PM (Cairo Time, UTC+2)
  const targetDate = new Date('2026-10-30T16:00:00+02:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Rania & Omar's Wedding");
    const details = encodeURIComponent(
      "A celebration of love: Join Rania & Omar as they exchange vows at the JW Marriott Terrace, Cairo, Egypt."
    );
    const location = encodeURIComponent(
      'JW Marriott Hotel Cairo, Ring Road, Mirage City, Heliopolis, Cairo, Egypt'
    );
    // 2026-10-30T16:00:00+02:00 is 14:00:00 UTC
    // 2026-10-30T23:00:00+02:00 is 21:00:00 UTC
    const dates = '20261030T140000Z/20261030T210000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download iCal (.ics file)
  const downloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EverAfter//Rania and Omar Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-rania-omar-20261030@everafter.invites',
      'DTSTAMP:20261010T000000Z',
      'DTSTART:20261030T140000Z',
      'DTEND:20261030T210000Z',
      'SUMMARY:Rania & Omar Wedding',
      'DESCRIPTION:Celebration of love for Rania & Omar at JW Marriott Terrace Cairo.',
      'LOCATION:JW Marriott Hotel Cairo, Ring Road, Mirage City, Heliopolis, Cairo, Egypt',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rania_Omar_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C8A85D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-3 inline-flex items-center gap-2 text-[#C8A85D]"
        >
          <Clock className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            The Countdown
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-4"
        >
          Counting Down Every Second
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-md mx-auto mb-12"
        >
          Until we gather under the Cairo twilight to celebrate our new beginning.
        </motion.p>

        {/* Timer Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mb-10">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-md border border-[#C8A85D]/30 shadow-lg hover:border-[#C8A85D] hover:shadow-xl transition-all duration-300 group"
            >
              {/* Gold Corner Accent */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C8A85D]/40 group-hover:bg-[#C8A85D] transition-colors" />

              <div className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#2C2C2C] tracking-tight mb-2">
                {String(unit.value).padStart(2, '0')}
              </div>

              <div className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C8A85D] font-semibold">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save to Calendar Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2C2C2C] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-300 shadow-md cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#C8A85D] group-hover:text-[#1C1815] transition-colors" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={downloadICS}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-[#C8A85D]/40 text-[#2C2C2C] font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#FAF7F2] hover:border-[#C8A85D] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Bell className="w-4 h-4 text-[#C8A85D]" />
            <span>Download Calendar Event (.ics)</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
