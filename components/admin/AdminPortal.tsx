import React, { useState } from 'react';
import { WorkProgram, AspirationPost, Election, ElectionResult, AspirationStatus } from '../../types';
import Card from '../common/Card';
import WorkProgramManager from './WorkProgramManager';
import AspirationManager from './AspirationManager';
import ElectionManager from './ElectionManager';

type AdminTab = 'programs' | 'aspirations' | 'election';

interface AdminPortalProps {
    workPrograms: WorkProgram[];
    onAddWorkProgram: (program: Omit<WorkProgram, 'id'>) => void;
    onUpdateWorkProgram: (program: WorkProgram) => void;
    onDeleteWorkProgram: (programId: number) => void;
    aspirations: AspirationPost[];
    onUpdateAspiration: (aspirationId: number, newStatus: AspirationStatus, responseText?: string) => void;
    election: Election;
    onUpdateElectionResults: (newResults: ElectionResult[]) => void;
}

const AdminPortal: React.FC<AdminPortalProps> = (props) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('programs');

    const renderContent = () => {
        switch (activeTab) {
            case 'programs':
                return <WorkProgramManager 
                            programs={props.workPrograms}
                            onAdd={props.onAddWorkProgram}
                            onUpdate={props.onUpdateWorkProgram}
                            onDelete={props.onDeleteWorkProgram}
                        />;
            case 'aspirations':
                return <AspirationManager 
                            aspirations={props.aspirations}
                            onUpdate={props.onUpdateAspiration}
                        />;
            case 'election':
                return <ElectionManager 
                            election={props.election}
                            onUpdateResults={props.onUpdateElectionResults}
                        />;
            default:
                return null;
        }
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-4xl font-extrabold text-white">Admin Panel</h1>
                <p className="text-lg text-gray-400">Pusat kontrol untuk mengelola konten dan data aplikasi.</p>
            </header>

            <div className="flex space-x-2 border-b border-glass-border">
                <TabButton label="Program Kerja" isActive={activeTab === 'programs'} onClick={() => setActiveTab('programs')} />
                <TabButton label="Aspirasi Siswa" isActive={activeTab === 'aspirations'} onClick={() => setActiveTab('aspirations')} />
                <TabButton label="Hasil Pemilu" isActive={activeTab === 'election'} onClick={() => setActiveTab('election')} />
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${isActive ? 'border-brand-primary text-white' : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'}`}>
        {label}
    </button>
);

export default AdminPortal;