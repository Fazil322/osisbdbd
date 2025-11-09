import React, { useState } from 'react';
import { AspirationPost, AspirationStatus } from '../types';
import Card from './common/Card';

interface AspirationCardProps {
  aspiration: AspirationPost;
  onUpvote: (id: number, isUpvoted: boolean) => void;
  style?: React.CSSProperties;
}

const statusStyles: { [key in AspirationStatus]: string } = {
  'Pending': 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  'Reviewed': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  'Resolved': 'bg-green-500/20 text-green-300 border-green-500/50',
  'Rejected': 'bg-red-500/20 text-red-300 border-red-500/50',
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const AspirationCard: React.FC<AspirationCardProps> = ({ aspiration, onUpvote, style }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = () => {
    onUpvote(aspiration.id, isUpvoted);
    setIsUpvoted(!isUpvoted);
  };

  return (
    <Card className="flex flex-col h-full p-6 animate-fade-in-up" style={style}>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm text-gray-400">
            Oleh: <span className="font-semibold text-gray-300">{aspiration.author}</span>
          </p>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[aspiration.status]}`}>
            {aspiration.status}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{aspiration.title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{aspiration.content}</p>
      </div>

      {aspiration.response && (
        <div className="mb-4 mt-2 border-l-4 border-brand-primary/50 pl-4 py-2 bg-slate-800/50 rounded-r-md">
            <p className="text-xs font-bold text-green-300">Tanggapan dari {aspiration.response.responder}:</p>
            <p className="text-sm text-gray-300 italic">"{aspiration.response.responseText}"</p>
        </div>
      )}

      <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
        <button
          onClick={handleUpvote}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${isUpvoted ? 'bg-brand-primary/20 text-brand-primary' : 'hover:bg-slate-700/50'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isUpvoted ? 'text-brand-primary' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333V17a1 1 0 001 1h6.364a1 1 0 00.942-.67l2.716-6.453A1 1 0 0016 9.5H13V5.5a1.5 1.5 0 00-3 0v5.833H6z" />
          </svg>
          <span className="font-semibold">{aspiration.upvotes}</span>
        </button>
        <span>{formatDate(aspiration.submittedDate)}</span>
      </div>
    </Card>
  );
};

export default AspirationCard;