import React from 'react';
import { WorkProgram, WorkProgramStatus } from '../types';
import Card from './common/Card';

interface WorkProgramCardProps {
  program: WorkProgram;
  style?: React.CSSProperties;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const statusStyles: { [key in WorkProgramStatus]: string } = {
  'Planned': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  'Completed': 'bg-green-500/20 text-green-300 border-green-500/50',
  'Cancelled': 'bg-red-500/20 text-red-300 border-red-500/50',
};

const WorkProgramCard: React.FC<WorkProgramCardProps> = ({ program, style }) => {
  const budgetProgress = program.budgetApproved > 0 ? (program.budgetRealized / program.budgetApproved) * 100 : 0;

  return (
    <Card className="flex flex-col h-full p-6 animate-fade-in-up" style={style}>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white pr-4">{program.title}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[program.status]}`}>{program.status}</span>
        </div>
        <p className="text-sm text-gray-400 mb-4">{program.description}</p>
        <p className="text-sm text-gray-500 mb-4">Penanggung Jawab: <span className="font-semibold text-gray-300">{program.pic}</span></p>
      </div>

      <div className="mt-auto space-y-3">
        <div>
            <div className="flex justify-between text-sm mb-1 text-gray-400">
                <span>Anggaran Disetujui</span>
                <span className="font-semibold text-white">{formatCurrency(program.budgetApproved)}</span>
            </div>
             <div className="flex justify-between text-sm text-gray-400">
                <span>Realisasi</span>
                <span className="font-semibold text-white">{formatCurrency(program.budgetRealized)}</span>
            </div>
        </div>
        
        <div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-brand-secondary to-brand-primary h-2.5 rounded-full"
              style={{ width: `${budgetProgress}%` }}
            ></div>
          </div>
          <p className="text-right text-xs mt-1 text-gray-400">{Math.round(budgetProgress)}% Terpakai</p>
        </div>
      </div>
    </Card>
  );
};

export default WorkProgramCard;
