import React, { useState } from 'react';
import Modal from './common/Modal';

interface AspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newAspiration: { title: string, content: string, isAnonymous: boolean }) => void;
}

const AspirationModal: React.FC<AspirationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setIsAnonymous(false);
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setIsSubmitted(true);
    
    // Simulate API call delay
    setTimeout(() => {
        onSubmit({ title, content, isAnonymous });
        handleClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sampaikan Aspirasimu">
      {isSubmitted ? (
        <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
          <h3 className="text-xl font-bold text-white">Aspirasi Terkirim!</h3>
          <p className="text-gray-400 mt-2">Terima kasih atas kontribusimu untuk sekolah.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Judul Aspirasi</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="cth: Pengadaan Loker Siswa"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">Detail Aspirasi</label>
            <textarea
              id="content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full bg-slate-900/70 border border-glass-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Jelaskan idemu secara rinci di sini..."
            />
          </div>
          <div className="flex items-center">
            <input
              id="anonymous"
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-brand-primary focus:ring-brand-secondary"
            />
            <label htmlFor="anonymous" className="ml-3 text-sm text-gray-300">
              Kirim sebagai Anonim
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors disabled:bg-slate-600"
            disabled={!title || !content}
          >
            Kirim
          </button>
        </form>
      )}
    </Modal>
  );
};

export default AspirationModal;