import React, { useState } from 'react';
import { VotingCandidate } from '../../types';
import Card from '../common/Card';
import Modal from '../common/Modal';

interface CandidateCardProps {
  candidate: VotingCandidate;
  onVote: (candidateId: number) => void;
  onViewDetails: () => void;
  style?: React.CSSProperties;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onVote, onViewDetails, style }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleVoteClick = () => {
    setIsConfirming(true);
  };

  const handleConfirmVote = () => {
    onVote(candidate.id);
    setIsConfirming(false);
  };

  return (
    <>
      <Card className="p-0 overflow-hidden text-center flex flex-col group animate-fade-in-up" style={style}>
        <div className="relative">
            <img 
                src={candidate.photoUrl} 
                alt={candidate.name} 
                className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute top-4 left-4 w-14 h-14 bg-glass-bg border-2 border-glass-border rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-3xl font-extrabold text-white">{candidate.number}</span>
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white">{candidate.name}</h3>
            <p className="text-gray-400 italic mt-1 flex-grow">"{candidate.slogan}"</p>
            <div className="mt-6 space-y-3">
                 <button
                    onClick={onViewDetails}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/70 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Lihat Visi & Misi
                </button>
                <button
                    onClick={handleVoteClick}
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    Pilih Kandidat Ini
                </button>
            </div>
        </div>
      </Card>

      <Modal isOpen={isConfirming} onClose={() => setIsConfirming(false)} title="Konfirmasi Pilihan">
        <div className="text-center">
            <p className="text-lg text-gray-300 mb-2">Apakah Anda yakin ingin memilih:</p>
            <p className="text-2xl font-bold text-white mb-8">{candidate.name}?</p>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => setIsConfirming(false)}
                    className="px-8 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold"
                >
                    Batal
                </button>
                <button 
                    onClick={handleConfirmVote}
                    className="px-8 py-3 bg-brand-primary hover:bg-brand-secondary rounded-lg font-bold"
                >
                    Ya, Saya Yakin
                </button>
            </div>
        </div>
      </Modal>
    </>
  );
};

export default CandidateCard;
