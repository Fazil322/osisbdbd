import React, { useState } from 'react';
import { AspirationPost, AspirationStatus } from '../types';
import AspirationCard from './AspirationCard';
import AspirationModal from './AspirationModal';

interface AspirationsPortalProps {
  aspirations: AspirationPost[];
  onUpvote: (id: number, isUpvoted: boolean) => void;
  onSubmit: (newAspiration: { title: string, content: string, isAnonymous: boolean }) => void;
}

const TABS: AspirationStatus[] = ['Pending', 'Reviewed', 'In Progress', 'Resolved'];

const AspirationsPortal: React.FC<AspirationsPortalProps> = ({ aspirations, onUpvote, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<AspirationStatus | 'Semua'>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAspirations = aspirations
    .filter(a => activeTab === 'Semua' || a.status === activeTab)
    .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());

  const handleSubmit = (newAspiration: { title: string, content: string, isAnonymous: boolean }) => {
    onSubmit(newAspiration);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Suara Siswa</h1>
            <p className="text-lg text-gray-400">Saluran aspirasimu untuk sekolah yang lebih baik.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Sampaikan Aspirasi
          </button>
        </header>

        <div className="flex space-x-2 border-b border-glass-border pb-2 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('Semua')}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Semua' ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-slate-700/50'}`}>
                Semua
            </button>
          {TABS.map(tab => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-slate-700/50'}`}>
                {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAspirations.map((aspiration, index) => (
            <AspirationCard 
              key={aspiration.id} 
              aspiration={aspiration}
              onUpvote={onUpvote} 
              style={{ animationDelay: `${index * 50}ms` }} 
            />
          ))}
        </div>
      </div>
      <AspirationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AspirationsPortal;