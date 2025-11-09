import React, { useState } from 'react';
import { Election, VotingCandidate } from '../../types';
import CandidateCard from './CandidateCard';
import CandidateDetailModal from './CandidateDetailModal';

interface VotingPortalProps {
  election: Election;
  onVote: (candidateId: number) => void;
  votedCandidateId: number | null;
}

const VotingPortal: React.FC<VotingPortalProps> = ({ election, onVote, votedCandidateId }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<VotingCandidate | null>(null);

  const votedCandidate = votedCandidateId ? election.candidates.find(c => c.id === votedCandidateId) : null;

  if (votedCandidate) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white">Terima Kasih!</h1>
            <p className="text-lg text-gray-400 mt-2">Suara Anda telah direkam untuk kandidat:</p>
            <p className="text-2xl font-bold text-brand-primary mt-4">{votedCandidate.name}</p>
            <p className="text-gray-500 mt-8">Partisipasimu menentukan masa depan OSIS yang lebih baik.</p>
        </div>
    );
  }

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-white">{election.title}</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-2">{election.description}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {election.candidates.map((candidate, index) => (
            <CandidateCard 
                key={candidate.id} 
                candidate={candidate}
                onVote={onVote}
                onViewDetails={() => setSelectedCandidate(candidate)}
                style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
      {selectedCandidate && (
        <CandidateDetailModal
            isOpen={!!selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            candidate={selectedCandidate}
            onVote={onVote}
        />
      )}
    </>
  );
};

export default VotingPortal;
