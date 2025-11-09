import React from 'react';
import Card from '../common/Card';
import { Event } from '../../types';

interface CalendarWidgetProps {
  events: Event[];
}

const categoryColors: { [key: string]: string } = {
  'Akademik': 'bg-blue-500',
  'Olahraga': 'bg-green-500',
  'Seni': 'bg-purple-500',
  'Lainnya': 'bg-gray-500',
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
        day: date.toLocaleDateString('id-ID', { day: '2-digit' }),
        month: date.toLocaleDateString('id-ID', { month: 'short' }),
    }
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events }) => {
  return (
    <Card className="p-6 h-full flex flex-col animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h3 className="font-bold text-lg text-white mb-4">Kalender Acara</h3>
      <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
        {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="text-center w-12 flex-shrink-0">
                <p className="text-sm text-gray-400">{formatDate(event.date).month}</p>
                <p className="text-2xl font-bold text-white">{formatDate(event.date).day}</p>
            </div>
            <div className={`w-1 flex-shrink-0 h-10 rounded-full ${categoryColors[event.category] || categoryColors['Lainnya']}`}></div>
            <div>
              <p className="font-semibold text-gray-200">{event.title}</p>
              <p className="text-xs text-gray-400">{event.category}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CalendarWidget;
