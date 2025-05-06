import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2025-10-15T09:00:00"); // Target date and time

  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft | null = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <div className="text-center text-xl font-semibold text-hetero">The Event has started!</div>;
  }

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="flex justify-center space-x-4 sm:space-x-6 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center p-3 sm:p-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-md w-16 sm:w-20">
          <span className="text-2xl sm:text-3xl font-bold text-hetero dark:text-hetero-light tabular-nums">
            {formatTime(value)}
          </span>
          <span className="text-xs sm:text-sm uppercase text-gray-600 dark:text-gray-400">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer; 