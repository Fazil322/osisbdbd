import React from 'react';
import { WorkProgram } from '../types';
import WorkProgramCard from './WorkProgramCard';

interface TransparencyPortalProps {
  programs: WorkProgram[];
}

const TransparencyPortal: React.FC<TransparencyPortalProps> = ({ programs }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <header>
        <h1 className="text-4xl font-extrabold text-white">OpenBook</h1>
        <p className="text-lg text-gray-400">Transparansi total program kerja dan anggaran OSIS.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <WorkProgramCard key={index} program={program} style={{ animationDelay: `${index * 50}ms` }}/>
        ))}
      </div>
    </div>
  );
};

export default TransparencyPortal;
