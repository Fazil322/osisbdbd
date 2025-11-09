import React from 'react';
import Modal from '../common/Modal';
import { VotingCandidate } from '../../types';

interface CandidateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: VotingCandidate;
  onVote: (candidateId: number) => void;
}

const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({ isOpen, onClose, candidate, onVote }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={candidate.name}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-2">Visi</h3>
          <p className="text-gray-300">{candidate.vision}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-2">Misi</h3>
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            {candidate.mission.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <button
            onClick={() => {
                onVote(candidate.id);
                onClose();
            }}
            className="w-full mt-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
        >
            Pilih {candidate.name}
        </button>
      </div>
    </Modal>
  );
};

export default CandidateDetailModal;
