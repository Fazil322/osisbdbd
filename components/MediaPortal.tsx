import React, { useState } from 'react';
import { MediaItem } from '../types';
import MediaCard from './MediaCard';
import MediaDetailView from './MediaDetailView';

interface MediaPortalProps {
  mediaItems: MediaItem[];
}

const MediaPortal: React.FC<MediaPortalProps> = ({ mediaItems }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
  };

  const handleCloseDetail = () => {
    setSelectedMedia(null);
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        <header>
          <h1 className="text-4xl font-extrabold text-white">Galeri Kegiatan</h1>
          <p className="text-lg text-gray-400">Momen-momen terbaik dari setiap acara sekolah.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaItems.map((item, index) => (
            <MediaCard 
              key={item.id} 
              item={item} 
              onClick={() => handleMediaClick(item)} 
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
      </div>
      {selectedMedia && (
        <MediaDetailView 
          item={selectedMedia} 
          onClose={handleCloseDetail} 
        />
      )}
    </>
  );
};

export default MediaPortal;
