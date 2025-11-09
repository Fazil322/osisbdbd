import React from 'react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: () => void;
  style?: React.CSSProperties;
}

const PhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>;

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, style }) => {
  return (
    <div 
      className="bg-glass-bg border border-glass-border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-brand-primary/20 hover:border-brand-primary/50 cursor-pointer group animate-fade-in-up"
      onClick={onClick}
      style={style}
    >
      <div className="relative">
        <img src={item.thumbnailUrl} alt={item.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white">
          {item.type === 'photo' ? <PhotoIcon /> : <VideoIcon />}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <h3 className="absolute bottom-2 left-3 text-white font-bold">{item.title}</h3>
      </div>
    </div>
  );
};

export default MediaCard;
