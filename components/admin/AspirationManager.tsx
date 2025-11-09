import React, { useState } from 'react';
import { AspirationPost, AspirationStatus } from '../../types';
import Card from '../common/Card';
import AspirationResponseModal from './AspirationResponseModal';

interface AspirationManagerProps {
    aspirations: AspirationPost[];
    onUpdate: (aspirationId: number, newStatus: AspirationStatus, responseText?: string) => void;
}

const statusStyles: { [key in AspirationStatus]: string } = {
  'Pending': 'bg-gray-500/20 text-gray-300',
  'Reviewed': 'bg-blue-500/20 text-blue-300',
  'In Progress': 'bg-yellow-500/20 text-yellow-300',
  'Resolved': 'bg-green-500/20 text-green-300',
  'Rejected': 'bg-red-500/20 text-red-300',
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

const AspirationManager: React.FC<AspirationManagerProps> = ({ aspirations, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAspiration, setSelectedAspiration] = useState<AspirationPost | null>(null);

    const handleOpenResponseModal = (aspiration: AspirationPost) => {
        setSelectedAspiration(aspiration);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAspiration(null);
    };

    const handleUpdate = (status: AspirationStatus, responseText: string) => {
        if (selectedAspiration) {
            onUpdate(selectedAspiration.id, status, responseText);
            handleCloseModal();
        }
    };
    
    // Sort aspirations so that pending ones are at the top
    const sortedAspirations = [...aspirations].sort((a, b) => {
        const statusOrder: { [key in AspirationStatus]: number } = { 'Pending': 1, 'Reviewed': 2, 'In Progress': 3, 'Resolved': 4, 'Rejected': 5 };
        if (statusOrder[a.status] === statusOrder[b.status]) {
            return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        }
        return statusOrder[a.status] - statusOrder[b.status];
    });

    return (
        <>
            <Card className="p-6">
                 <h2 className="text-2xl font-bold text-white mb-1">Manajemen Aspirasi Siswa</h2>
                 <p className="text-gray-400 mb-6">Tinjau dan berikan tanggapan resmi untuk setiap aspirasi yang masuk.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-slate-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Judul Aspirasi</th>
                                <th scope="col" className="px-6 py-3">Pengirim</th>
                                <th scope="col" className="px-6 py-3">Tanggal</th>
                                <th scope="col" className="px-6 py-3">Upvotes</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAspirations.map(aspiration => (
                                <tr key={aspiration.id} className="border-b border-glass-border hover:bg-slate-800/30">
                                    <td className="px-6 py-4 font-medium text-white max-w-xs truncate" title={aspiration.title}>{aspiration.title}</td>
                                    <td className="px-6 py-4">{aspiration.author}</td>
                                    <td className="px-6 py-4">{formatDate(aspiration.submittedDate)}</td>
                                    <td className="px-6 py-4 font-semibold">{aspiration.upvotes}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${statusStyles[aspiration.status]}`}>{aspiration.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleOpenResponseModal(aspiration)} 
                                            className="font-medium text-blue-400 hover:underline disabled:text-gray-500 disabled:no-underline"
                                            disabled={aspiration.status === 'Rejected'}
                                        >
                                            {aspiration.response ? 'Edit Tanggapan' : 'Tanggapi'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedAspiration && (
                <AspirationResponseModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    aspiration={selectedAspiration}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    );
};

export default AspirationManager;