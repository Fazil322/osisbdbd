import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Spinner from '../common/Spinner';
import { AspirationPost, AspirationStatus } from '../../types';
import { generateAspirationResponse } from '../../services/geminiService';

interface AspirationResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  aspiration: AspirationPost;
  onUpdate: (status: AspirationStatus, responseText: string) => void;
}

const STATUS_OPTIONS: AspirationStatus[] = ['Pending', 'Reviewed', 'In Progress', 'Resolved', 'Rejected'];

const AspirationResponseModal: React.FC<AspirationResponseModalProps> = ({ isOpen, onClose, aspiration, onUpdate }) => {
  const [responseText, setResponseText] = useState('');
  const [status, setStatus] = useState<AspirationStatus>('Pending');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (aspiration) {
      setResponseText(aspiration.response?.responseText || '');
      setStatus(aspiration.status);
    }
  }, [aspiration]);

  const handleGenerateResponse = async () => {
    setIsLoading(true);
    try {
      const draft = await generateAspirationResponse(aspiration.title, aspiration.content);
      setResponseText(draft);
    } catch (error) {
      console.error("Failed to generate AI response:", error);
      setResponseText("Terjadi kesalahan saat membuat draf. Mohon tulis tanggapan secara manual.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    onUpdate(status, responseText);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kelola Aspirasi">
      <div className="space-y-6">
        <div className="p-4 bg-slate-800/50 border border-glass-border rounded-lg">
          <h4 className="font-bold text-white mb-1">{aspiration.title}</h4>
          <p className="text-sm text-gray-400 italic">"{aspiration.content}"</p>
          <p className="text-xs text-right text-gray-500 mt-2">
            - {aspiration.author}, {new Date(aspiration.submittedDate).toLocaleDateString('id-ID')}
          </p>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">Ubah Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as AspirationStatus)}
            className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="response" className="block text-sm font-medium text-gray-300 mb-2">Tanggapan Resmi OSIS (Opsional)</label>
          <div className="relative">
            <textarea
              id="response"
              rows={6}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Tulis tanggapan Anda di sini..."
              disabled={isLoading}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                    <Spinner />
                </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
           <button
            onClick={handleGenerateResponse}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors disabled:opacity-50"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
            Buatkan Draf dengan AI
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold">Batal</button>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-brand-primary hover:bg-brand-secondary rounded-lg font-bold disabled:bg-slate-600"
            >
                Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AspirationResponseModal;