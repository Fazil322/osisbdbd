import React, { useState, useEffect } from 'react';
import { Election, ElectionResult } from '../../types';
import Card from '../common/Card';

interface ElectionManagerProps {
    election: Election;
    onUpdateResults: (newResults: ElectionResult[]) => void;
}

const ElectionManager: React.FC<ElectionManagerProps> = ({ election, onUpdateResults }) => {
    const [votes, setVotes] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        // Initialize state with current results
        const initialVotes = election.results?.reduce((acc, result) => {
            acc[result.candidateId] = result.votes;
            return acc;
        }, {} as { [key: number]: number }) || {};
        election.candidates.forEach(c => {
            if (initialVotes[c.id] === undefined) {
                initialVotes[c.id] = 0;
            }
        });
        setVotes(initialVotes);
    }, [election]);

    const handleVoteChange = (candidateId: number, value: string) => {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setVotes(prev => ({ ...prev, [candidateId]: numericValue }));
        } else if (value === '') {
            setVotes(prev => ({ ...prev, [candidateId]: 0 }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newResults: ElectionResult[] = Object.entries(votes).map(([candidateId, voteCount]) => ({
            candidateId: parseInt(candidateId, 10),
            votes: voteCount,
        }));
        onUpdateResults(newResults);
        // In a real app, this would be an API call:
        // await api.elections.updateResults(election.id, newResults);
    };

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold text-white mb-1">Manajemen Hasil Pemilu</h2>
            <p className="text-gray-400 mb-6">Perbarui jumlah suara akhir untuk setiap kandidat di sini.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {election.candidates.map(candidate => (
                    <div key={candidate.id} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                        <img src={candidate.photoUrl} alt={candidate.name} className="w-16 h-16 rounded-full object-cover"/>
                        <div className="flex-grow">
                             <label htmlFor={`votes-${candidate.id}`} className="block text-lg font-semibold text-gray-200">{candidate.name}</label>
                             <p className="text-sm text-gray-400">Kandidat No. {candidate.number}</p>
                        </div>
                        <input
                            type="number"
                            id={`votes-${candidate.id}`}
                            value={votes[candidate.id] || 0}
                            onChange={(e) => handleVoteChange(candidate.id, e.target.value)}
                            className="w-40 bg-slate-900/70 border border-glass-border rounded-lg px-4 py-2 text-white text-xl font-bold text-right focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                ))}
                
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        Simpan Hasil
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default ElectionManager;