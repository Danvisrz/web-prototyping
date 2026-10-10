import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const eventDate = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft(null);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Jika targetDate tidak diisi atau waktu sudah lewat, timer tidak akan tampil
  if (!targetDate || !timeLeft) return null;

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E1D5] p-2 my-2 text-center">
      <span className="text-[9px] tracking-[0.2em] uppercase text-[#B88E4C] font-semibold block mb-1">
        Pelaksanaan Dalam
      </span>
      <div className="flex justify-center gap-2 text-[11px] font-mono text-[#2C2A29] font-bold">
        <span>{timeLeft.days}h</span>:
        <span>{timeLeft.hours}j</span>:
        <span>{timeLeft.minutes}m</span>:
        <span>{timeLeft.seconds}d</span>
      </div>
    </div>
  );
}