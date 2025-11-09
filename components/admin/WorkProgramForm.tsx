import React, { useState, useEffect } from 'react';
import { WorkProgram, WorkProgramStatus } from '../../types';

interface WorkProgramFormProps {
    program: WorkProgram | null;
    onSave: (program: Omit<WorkProgram, 'id'> | WorkProgram) => void;
    onCancel: () => void;
}

const STATUS_OPTIONS: WorkProgramStatus[] = ['Planned', 'In Progress', 'Completed', 'Cancelled'];

const WorkProgramForm: React.FC<WorkProgramFormProps> = ({ program, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pic: '',
        status: 'Planned' as WorkProgramStatus,
        budgetApproved: 0,
        budgetRealized: 0,
    });

    useEffect(() => {
        if (program) {
            setFormData({
                title: program.title,
                description: program.description,
                pic: program.pic,
                status: program.status,
                budgetApproved: program.budgetApproved,
                budgetRealized: program.budgetRealized,
            });
        } else {
            // Reset for new entry
            setFormData({
                title: '',
                description: '',
                pic: '',
                status: 'Planned',
                budgetApproved: 0,
                budgetRealized: 0,
            });
        }
    }, [program]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name.startsWith('budget') ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (program) {
            onSave({ ...program, ...formData });
        } else {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Judul Program</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Deskripsi</label>
                <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} required className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="pic" className="block text-sm font-medium text-gray-300 mb-1">Penanggung Jawab (PIC)</label>
                    <input type="text" name="pic" id="pic" value={formData.pic} onChange={handleChange} required className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="budgetApproved" className="block text-sm font-medium text-gray-300 mb-1">Anggaran Disetujui (Rp)</label>
                    <input type="number" name="budgetApproved" id="budgetApproved" value={formData.budgetApproved} onChange={handleChange} required className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
                <div>
                    <label htmlFor="budgetRealized" className="block text-sm font-medium text-gray-300 mb-1">Realisasi Anggaran (Rp)</label>
                    <input type="number" name="budgetRealized" id="budgetRealized" value={formData.budgetRealized} onChange={handleChange} required className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold">Batal</button>
                <button type="submit" className="px-6 py-2 bg-brand-primary hover:bg-brand-secondary rounded-lg font-bold">Simpan</button>
            </div>
        </form>
    );
};

export default WorkProgramForm;
