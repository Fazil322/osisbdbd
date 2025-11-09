import React, { useState } from 'react';
import { WorkProgram } from '../../types';
import Card from '../common/Card';
import Modal from '../common/Modal';
import WorkProgramForm from './WorkProgramForm';

interface WorkProgramManagerProps {
    programs: WorkProgram[];
    onAdd: (program: Omit<WorkProgram, 'id'>) => void;
    onUpdate: (program: WorkProgram) => void;
    onDelete: (programId: number) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const WorkProgramManager: React.FC<WorkProgramManagerProps> = ({ programs, onAdd, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState<WorkProgram | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleAddNew = () => {
        setEditingProgram(null);
        setIsModalOpen(true);
    };

    const handleEdit = (program: WorkProgram) => {
        setEditingProgram(program);
        setIsModalOpen(true);
    };
    
    const handleSave = (program: Omit<WorkProgram, 'id'> | WorkProgram) => {
        if ('id' in program) {
            onUpdate(program);
        } else {
            onAdd(program);
        }
        setIsModalOpen(false);
        setEditingProgram(null);
    };
    
    const handleDeleteConfirm = () => {
        if (deletingId) {
            onDelete(deletingId);
            setDeletingId(null);
        }
    }

    return (
        <>
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Manajemen Program Kerja</h2>
                        <p className="text-gray-400">Tambah, edit, atau hapus program kerja OSIS.</p>
                    </div>
                    <button onClick={handleAddNew} className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        + Tambah Program
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-slate-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Judul Program</th>
                                <th scope="col" className="px-6 py-3">PIC</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Anggaran</th>
                                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map(program => (
                                <tr key={program.id} className="border-b border-glass-border hover:bg-slate-800/30">
                                    <td className="px-6 py-4 font-medium text-white">{program.title}</td>
                                    <td className="px-6 py-4">{program.pic}</td>
                                    <td className="px-6 py-4">{program.status}</td>
                                    <td className="px-6 py-4">{formatCurrency(program.budgetApproved)}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleEdit(program)} className="font-medium text-blue-400 hover:underline">Edit</button>
                                        <button onClick={() => setDeletingId(program.id)} className="font-medium text-red-400 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProgram ? 'Edit Program Kerja' : 'Tambah Program Kerja Baru'}>
                <WorkProgramForm 
                    program={editingProgram} 
                    onSave={handleSave} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            </Modal>
            
            <Modal isOpen={!!deletingId} onClose={() => setDeletingId(null)} title="Konfirmasi Penghapusan">
                <div className="text-center">
                    <p className="text-lg text-gray-300 mb-8">Apakah Anda yakin ingin menghapus program kerja ini?</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setDeletingId(null)} className="px-8 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold">
                            Batal
                        </button>
                        <button onClick={handleDeleteConfirm} className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold">
                            Ya, Hapus
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default WorkProgramManager;
