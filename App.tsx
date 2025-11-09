import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransparencyPortal from './components/TransparencyPortal';
import AspirationsPortal from './components/AspirationsPortal';
import MediaPortal from './components/MediaPortal';
import VotingPortal from './components/voting/VotingPortal';
import { View, NavigationItem, DashboardData, WorkProgram, AspirationPost, MediaItem, Election } from './types';

// Mock Data
const mockDashboardData: DashboardData = {
  countdownEvent: { title: "Ujian Akhir Semester", date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() },
  news: [
    { id: 1, title: "Tim Basket Sekolah Juarai Kompetisi Regional", summary: "Tim basket kebanggaan kita berhasil merebut piala utama dalam turnamen antar sekolah se-provinsi.", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Juara+Basket", publishedDate: "2023-10-26" },
  ],
  poll: {
    id: 1,
    question: "Kantin sekolah butuh menu baru apa?",
    options: [{ text: "Nasi Goreng Spesial", votes: 25 }, { text: "Aneka Pasta", votes: 40 }, { text: "Salad Buah Segar", votes: 15 }],
  },
  answeredAspiration: { title: "Perlunya Area Baca di Taman Sekolah", response: "Terima kasih atas idenya! Kami setuju dan sedang merencanakan pembuatan 'Pojok Literasi' yang nyaman untuk semua." },
  calendarEvents: [
    { title: "Lomba Cerdas Cermat", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), category: "Akademik" },
    { title: "Pentas Seni Akhir Tahun", date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), category: "Seni" },
    { title: "Class Meeting: Futsal", date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), category: "Olahraga" },
  ],
};

const mockWorkPrograms: WorkProgram[] = [
  { title: "Pekan Olahraga Sekolah (PORSENI)", description: "Mengadakan kompetisi olahraga dan seni antar kelas.", pic: "Seksi Olahraga & Seni", status: 'In Progress', budgetApproved: 15000000, budgetRealized: 7500000 },
  { title: "Bakti Sosial ke Panti Asuhan", description: "Kegiatan sosial untuk membantu masyarakat sekitar.", pic: "Seksi Sosial", status: 'Completed', budgetApproved: 5000000, budgetRealized: 4800000 },
  { title: "Seminar Karir & Universitas", description: "Membantu siswa kelas 12 mempersiapkan masa depan.", pic: "Seksi Pendidikan", status: 'Planned', budgetApproved: 8000000, budgetRealized: 0 },
  { title: "Lomba Kebersihan Kelas", description: "Meningkatkan kesadaran akan kebersihan lingkungan sekolah.", pic: "Seksi Kebersihan", status: 'Cancelled', budgetApproved: 2000000, budgetRealized: 100000 },
];

const mockAspirations: AspirationPost[] = [
    { id: 1, author: "Siswa Kreatif", title: "Pengadaan Loker untuk Siswa", content: "Akan sangat membantu jika sekolah menyediakan loker agar kami tidak perlu membawa semua buku setiap hari. Ini bisa mengurangi beban tas.", upvotes: 128, submittedDate: "2023-10-20T10:00:00Z", status: "In Progress", response: { responder: "Wakil Kepala Sekolah", responseText: "Ide yang bagus. Kami sedang melakukan survey vendor untuk pengadaan loker. Update akan segera kami berikan." } },
    { id: 2, author: "Pecinta Musik", title: "Jamming Session di Kantin saat Istirahat", content: "Bagaimana jika ada panggung kecil di kantin untuk siswa yang ingin tampil akustik saat jam istirahat? Bisa jadi hiburan yang asik.", upvotes: 95, submittedDate: "2023-10-18T14:30:00Z", status: "Reviewed" },
    { id: 3, author: "Anonim", title: "Perbaikan Toilet Siswa", content: "Beberapa fasilitas di toilet siswa, terutama di lantai 2, sudah mulai rusak dan perlu perbaikan segera.", upvotes: 210, submittedDate: "2023-10-22T08:00:00Z", status: "Resolved", response: { responder: "Kepala Sarana Prasarana", responseText: "Perbaikan telah selesai dilakukan pada tanggal 25 Oktober. Terima kasih atas laporannya." } },
];

const mockMediaItems: MediaItem[] = [
  { id: 1, type: 'photo', title: 'Juara 1 Lomba Cerdas Cermat', description: 'Tim cerdas cermat sekolah berhasil membawa pulang piala emas.', thumbnailUrl: 'https://placehold.co/400x300/1e293b/ffffff?text=LCC', url: 'https://placehold.co/1280x720/1e293b/ffffff?text=LCC', author: 'Tim Jurnalistik', date: '2023-10-15', likes: 150, comments: [{user: "Kepala Sekolah", text: "Membanggakan!"}] },
  { id: 2, type: 'video', title: 'Highlight Pentas Seni 2023', description: 'Kompilasi penampilan terbaik dari acara pentas seni tahun ini.', thumbnailUrl: 'https://placehold.co/400x300/1e293b/ffffff?text=Pensi', url: 'https://placehold.co/1280x720/1e293b/ffffff?text=Pensi', author: 'Tim Dokumentasi', date: '2023-09-20', likes: 230, comments: [] },
  { id: 3, type: 'photo', title: 'Kegiatan Bakti Sosial', description: 'Berbagi kebahagiaan dengan teman-teman di panti asuhan.', thumbnailUrl: 'https://placehold.co/400x300/1e293b/ffffff?text=Baksos', url: 'https://placehold.co/1280x720/1e293b/ffffff?text=Baksos', author: 'Seksi Sosial', date: '2023-10-05', likes: 180, comments: [] },
];

const mockElection: Election = {
    id: 1,
    title: "Pemilihan Ketua OSIS Periode 2024/2025",
    description: "Gunakan hak suaramu untuk memilih pemimpin OSIS yang akan membawa perubahan positif bagi sekolah kita. Pilihanmu menentukan masa depan.",
    startDate: "2023-11-01",
    endDate: "2023-11-05",
    candidates: [
        { id: 1, number: 1, name: "Aditya Pratama", slogan: "Bersama Berkarya, Maju Bersama.", photoUrl: "https://placehold.co/400x400/1e293b/ffffff?text=Aditya", vision: "Menjadikan OSIS sebagai wadah aspirasi yang aktif, kreatif, dan inovatif bagi seluruh siswa.", mission: ["Meningkatkan kualitas acara sekolah.", "Membuka forum diskusi rutin antara siswa dan OSIS.", "Mengadakan lebih banyak workshop pengembangan diri."] },
        { id: 2, number: 2, name: "Cantika Putri", slogan: "Inovasi, Kolaborasi, Prestasi.", photoUrl: "https://placehold.co/400x400/1e293b/ffffff?text=Cantika", vision: "Mewujudkan OSIS yang modern, transparan, dan mampu membawa nama baik sekolah ke jenjang yang lebih tinggi.", mission: ["Digitalisasi program kerja OSIS.", "Menjalin kerjasama dengan sekolah lain.", "Membuat program 'Student of the Month' untuk mengapresiasi prestasi siswa."] },
    ],
};


const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'transparency', label: 'Transparansi', icon: 'transparency' },
  { id: 'aspirations', label: 'Aspirasi', icon: 'aspirations' },
  { id: 'media', label: 'Galeri', icon: 'media' },
  { id: 'voting', label: 'E-Voting', icon: 'voting' },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  
  // State management for mock data to allow interactivity
  const [dashboardData, setDashboardData] = useState<DashboardData>(mockDashboardData);
  const [workPrograms] = useState<WorkProgram[]>(mockWorkPrograms);
  const [aspirations, setAspirations] = useState<AspirationPost[]>(mockAspirations);
  const [mediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [election] = useState<Election>(mockElection);
  const [userVotedOption, setUserVotedOption] = useState<string | null>(null);
  const [votedCandidateId, setVotedCandidateId] = useState<number | null>(null);

  const handlePollVote = (option: string) => {
    const newPoll = { ...dashboardData.poll };
    const votedOption = newPoll.options.find(o => o.text === option);
    if (votedOption) {
      votedOption.votes += 1;
      setDashboardData({ ...dashboardData, poll: newPoll });
      setUserVotedOption(option);
    }
  };

  const handleAspirationUpvote = (id: number, isCurrentlyUpvoted: boolean) => {
    setAspirations(prev => prev.map(a => 
      a.id === id ? { ...a, upvotes: a.upvotes + (isCurrentlyUpvoted ? -1 : 1) } : a
    ));
  };
  
  const handleAspirationSubmit = (newAspiration: { title: string; content: string; isAnonymous: boolean }) => {
    const newPost: AspirationPost = {
      id: Date.now(),
      title: newAspiration.title,
      content: newAspiration.content,
      author: newAspiration.isAnonymous ? 'Anonim' : 'Siswa Peduli', // Placeholder for real user name
      upvotes: 0,
      submittedDate: new Date().toISOString(),
      status: 'Pending',
    };
    setAspirations(prev => [newPost, ...prev]);
  };

  const handleCandidateVote = (candidateId: number) => {
    setVotedCandidateId(candidateId);
    // In a real app, you would also update the candidate's vote count in the backend.
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard data={dashboardData} handlePollVote={handlePollVote} userVotedOption={userVotedOption} />;
      case 'transparency':
        return <TransparencyPortal programs={workPrograms} />;
      case 'aspirations':
        return <AspirationsPortal aspirations={aspirations} onUpvote={handleAspirationUpvote} onSubmit={handleAspirationSubmit} />;
      case 'media':
        return <MediaPortal mediaItems={mediaItems} />;
      case 'voting':
        return <VotingPortal election={election} onVote={handleCandidateVote} votedCandidateId={votedCandidateId} />;
      default:
        return <Dashboard data={dashboardData} handlePollVote={handlePollVote} userVotedOption={userVotedOption} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex font-sans bg-grid">
       <style>{`
      .bg-grid {
        background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 2rem 2rem;
      }
      .bg-glass-bg {
        background-color: rgba(30, 41, 59, 0.6); /* slate-800 with opacity */
      }
      .border-glass-border {
        border-color: rgba(71, 85, 105, 0.6); /* slate-600 with opacity */
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.5s ease-out forwards;
      }
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      `}</style>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black/50 z-[-1]"></div>
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        navigationItems={navigationItems}
        projectName="OSIS Dashboard"
      />
      <main className="flex-grow p-6 md:p-8 lg:p-10 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
