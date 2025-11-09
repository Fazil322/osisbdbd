import React from 'react';
import Card from '../common/Card';
import { Aspiration } from '../../types';

interface AspirationWidgetProps {
  aspiration: Aspiration;
}

const AspirationWidget: React.FC<AspirationWidgetProps> = ({ aspiration }) => {
  return (
    <Card className="md:col-span-2 xl:col-span-3 p-6 h-full animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <div>
                 <h3 className="font-bold text-lg text-white">Aspirasi Terjawab</h3>
                 <p className="text-sm text-gray-400">Suara siswa yang kami dengar dan tindaklanjuti.</p>
            </div>
        </div>

      <div className="space-y-3">
        <p className="font-semibold text-gray-200">"{aspiration.title}"</p>
        <div className="border-l-4 border-brand-primary pl-4">
            <p className="text-gray-400 text-sm italic">{aspiration.response}</p>
        </div>
      </div>
    </Card>
  );
};

export default AspirationWidget;
