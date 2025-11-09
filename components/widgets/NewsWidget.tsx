import React from 'react';
import Card from '../common/Card';
import { NewsArticle } from '../../types';

interface NewsWidgetProps {
  news: NewsArticle[];
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ news }) => {
  const latestNews = news[0]; // Assuming the first one is the latest

  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col group animate-fade-in-up" style={{ animationDelay: '50ms' }}>
      <div className="relative h-40">
        <img src={latestNews.imageUrl} alt={latestNews.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-bold text-lg text-white leading-tight">{latestNews.title}</h3>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-sm text-gray-400 flex-grow">{latestNews.summary}</p>
        <button className="text-sm font-semibold text-brand-primary hover:text-brand-secondary self-start mt-3">
          Baca Selengkapnya →
        </button>
      </div>
    </Card>
  );
};

export default NewsWidget;
