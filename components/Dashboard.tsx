import React from 'react';
import { DashboardData } from '../types';
import Card from './common/Card';
import CountdownWidget from './widgets/CountdownWidget';
import NewsWidget from './widgets/NewsWidget';
import PollWidget from './widgets/PollWidget';
import AspirationWidget from './widgets/AspirationWidget';
import CalendarWidget from './widgets/CalendarWidget';

interface DashboardProps {
  data: DashboardData;
  handlePollVote: (option: string) => void;
  userVotedOption: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ data, handlePollVote, userVotedOption }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <header>
        <h1 className="text-4xl font-extrabold text-white">The Pulse</h1>
        <p className="text-lg text-gray-400">Denyut nadi aktivitas sekolahmu, secara real-time.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="lg:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <CountdownWidget event={data.countdownEvent} />
                <NewsWidget news={data.news} />
                <PollWidget 
                  poll={data.poll} 
                  onVote={handlePollVote} 
                  votedOption={userVotedOption}
                />
                <AspirationWidget aspiration={data.answeredAspiration} />
            </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-1">
             <CalendarWidget events={data.calendarEvents} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;