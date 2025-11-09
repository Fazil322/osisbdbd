import React from 'react';
import { MediaItem } from '../types';

interface MediaDetailViewProps {
  item: MediaItem;
  onClose: () => void;
}

const MediaDetailView: React.FC<MediaDetailViewProps> = ({ item, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close media view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-shrink-0 bg-black flex items-center justify-center">
          {item.type === 'photo' ? (
            <img src={item.url} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />
          ) : (
            <video src={item.url} controls autoPlay className="max-w-full max-h-[70vh]"></video>
          )}
        </div>
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
          <p className="text-sm text-gray-400 mb-4">
            Diunggah oleh <span className="font-semibold text-gray-300">{item.author}</span> pada {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-gray-300">{item.description}</p>
          {/* A simple comment section placeholder */}
          <div className="mt-6 border-t border-glass-border pt-4">
            <h3 className="font-semibold text-white mb-2">Komentar ({item.comments.length})</h3>
            <div className="space-y-3">
              {item.comments.map((comment, index) => (
                <div key={index} className="text-sm">
                  <span className="font-bold text-gray-300">{comment.user}: </span>
                  <span className="text-gray-400">{comment.text}</span>
                </div>
              ))}
              {item.comments.length === 0 && <p className="text-sm text-gray-500">Belum ada komentar.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailView;
