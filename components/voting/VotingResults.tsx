import React from 'react';
import { Election } from '../../types';
import Card from '../common/Card';

interface VotingResultsProps {
  election: Election;
}

const VotingResults: React.FC<VotingResultsProps> = ({ election }) => {
  if (!election.results) return null;

  const totalVotes = election.results.reduce((sum, result) => sum + result.votes, 0);

  const resultsWithDetails = election.candidates
    .map(candidate => {
      const result = election.results!.find(r => r.candidateId === candidate.id);
      const votes = result ? result.votes : 0;
      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
      return {
        ...candidate,
        votes,
        percentage,
      };
    })
    .sort((a, b) => b.votes - a.votes);

  const winner = resultsWithDetails[0];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-white">Hasil Resmi {election.title}</h1>
        <p className="text-lg text-gray-400 mt-2">
          Total suara masuk: <span className="font-bold text-white">{totalVotes}</span>
        </p>
      </header>

      <div className="space-y-6 max-w-4xl mx-auto">
        {resultsWithDetails.map((candidate, index) => (
          <Card 
            key={candidate.id} 
            className={`p-6 transition-all duration-300 ${candidate.id === winner.id ? 'border-brand-primary/80 shadow-brand-primary/20' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-center">
                <img src={candidate.photoUrl} alt={candidate.name} className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-slate-600" />
                {candidate.id === winner.id && (
                    <span className="mt-2 inline-block bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 text-xs font-bold px-3 py-1 rounded-full">
                        PEMENANG
                    </span>
                )}
              </div>
              <div className="w-full">
                <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-bold text-white">{candidate.name}</h3>
                    <p className="text-xl font-semibold text-gray-300">{candidate.votes.toLocaleString('id-ID')} Suara</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 relative overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-brand-secondary to-brand-primary h-4 rounded-full"
                        style={{ width: `${candidate.percentage}%` }}
                    ></div>
                </div>
                <p className="text-right text-lg font-bold text-brand-primary mt-1">{candidate.percentage.toFixed(1)}%</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VotingResults;
