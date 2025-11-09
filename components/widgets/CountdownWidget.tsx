import React, { useState, useEffect } from 'react';
import Card from '../common/Card';

interface CountdownWidgetProps {
  event: {
    title: string;
    date: string;
  };
}

const CountdownWidget: React.FC<CountdownWidgetProps> = ({ event }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(event.date) - +new Date();
    let timeLeft = {};

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: {label: string, value: number}[] = Object.entries(timeLeft)
    .map(([interval, value]) => ({ label: interval, value: value as number}));

  return (
    <Card className="md:col-span-2 xl:col-span-1 p-6 flex flex-col justify-between h-full animate-fade-in-up">
      <div>
        <h3 className="text-gray-400 font-medium">Coming Up Next</h3>
        <p className="text-2xl font-bold text-white mt-1">{event.title}</p>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center mt-4">
        {timerComponents.length ? (
          timerComponents.map(component => (
            <div key={component.label} className="bg-slate-900/50 p-3 rounded-lg">
              <span className="text-3xl font-extrabold text-brand-primary tracking-tighter">{component.value.toString().padStart(2, '0')}</span>
              <span className="block text-xs text-gray-400 uppercase">{component.label}</span>
            </div>
          ))
        ) : (
          <span className="col-span-4 text-lg font-semibold text-green-400">Event is happening now!</span>
        )}
      </div>
    </Card>
  );
};

export default CountdownWidget;
