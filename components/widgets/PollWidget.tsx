import React, { useState, useMemo } from 'react';
import Card from '../common/Card';
import { Poll } from '../../types';

interface PollWidgetProps {
  poll: Poll;
  onVote: (option: string) => void;
  votedOption: string | null;
}

const PollWidget: React.FC<PollWidgetProps> = ({ poll, onVote, votedOption }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  const totalVotes = useMemo(() => {
    if (!votedOption) return 0;
    return poll.options.reduce((sum, option) => sum + option.votes, 0);
  }, [poll.options, votedOption]);
  
  const results = useMemo(() => {
    return poll.options.map(opt => ({
      ...opt,
      percentage: totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0,
    }));
  }, [poll.options, totalVotes]);

  return (
    <Card className="p-6 h-full flex flex-col animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <h3 className="font-bold text-lg text-white mb-3">Polling Cepat</h3>
      <p className="text-gray-300 mb-4">{poll.question}</p>
      
      {!votedOption ? (
        <div className="space-y-3 flex-grow">
          {poll.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option.text)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                selectedOption === option.text
                  ? 'bg-brand-primary/50 border-brand-primary'
                  : 'bg-slate-700/50 border-transparent hover:border-slate-600'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3 flex-grow">
            {results.map(({text, percentage}) => (
                <div key={text}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-200">{text}</span>
                        <span className="text-gray-400">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-brand-secondary h-2 rounded-full" style={{width: `${percentage}%`}}></div>
                    </div>
                </div>
            ))}
        </div>
      )}

      <button
        onClick={handleVote}
        disabled={!selectedOption || !!votedOption}
        className="w-full mt-4 p-3 rounded-lg font-semibold text-white bg-brand-primary disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-brand-secondary transition-colors"
      >
        {votedOption ? 'Terima Kasih!' : 'Kirim Jawaban'}
      </button>
    </Card>
  );
};

export default PollWidget;