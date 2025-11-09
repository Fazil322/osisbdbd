import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransparencyPortal from './components/TransparencyPortal';
import AspirationsPortal from './components/AspirationsPortal';
import MediaPortal from './components/MediaPortal';
import VotingPortal from './components/voting/VotingPortal';
import AdminPortal from './components/admin/AdminPortal';
import { 
  View, NavigationItem, DashboardData, WorkProgram, AspirationPost, MediaItem, Election, PollOption, ElectionResult, AspirationResponse, AspirationStatus 
} from './types';

// MOCK DATA (In a real app, this would come from an API)
const MOCK_DASHBOARD_DATA: DashboardData = {
  countdownEvent: { title: "Ujian Akhir Semester", date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() },
  news: [
    { id: 1, title: "Tim Basket Sekolah Juarai Kompetisi Tingkat Kota", summary: "Kemenangan gemilang diraih oleh tim basket kebanggaan kita dalam final yang menegangkan melawan SMA Bintang Harapan.", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop", publishedDate: "2024-07-21" }
  ],
  poll: {
    id: 1,
    question: "Destinasi study tour favorit tahun ini?",
    options: [
      { text: "Yogyakarta", votes: 128 },
      { text: "Bandung", votes: 92 },
      { text: "Bali", votes: 215 },
    ]
  },
  answeredAspiration: {
    title: "Perlunya Area Baca di Taman Sekolah",
    response: "Terima kasih atas idenya yang cemerlang! Usulan ini sudah kami terima dan akan menjadi bahan diskusi utama dalam rapat OSIS berikutnya. Kami setuju area baca akan sangat bermanfaat."
  },
  calendarEvents: [
    { title: "Class Meeting - Lomba Futsal", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), category: "Olahraga" },
    { title: "Pentas Seni & Musik", date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), category: "Seni" },
    { title: "Ujian Tengah Semester", date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), category: "Akademik" }
  ]
};

const MOCK_WORK_PROGRAMS: WorkProgram[] = [
    { id: 1, title: "Festival Seni Tahunan", description: "Mengadakan festival seni untuk menampilkan bakat siswa dalam musik, tari, dan teater.", pic: "Divisi Seni & Budaya", status: "Completed", budgetApproved: 25000000, budgetRealized: 23500000 },
    { id: 2, title: "Program 'Go Green' Sekolah", description: "Kampanye penghijauan dan pengelolaan sampah di lingkungan sekolah.", pic: "Divisi Lingkungan Hidup", status: "In Progress", budgetApproved: 7500000, budgetRealized: 4000000 },
    { id: 3, title: "Olimpiade Sains Internal", description: "Kompetisi internal untuk menjaring siswa berprestasi di bidang sains.", pic: "Divisi Akademik", status: "Planned", budgetApproved: 12000000, budgetRealized: 0 },
    { id: 4, title: "Renovasi Ruang OSIS", description: "Memperbarui dan menata ulang ruang OSIS agar lebih nyaman dan fungsional.", pic: "Sekretaris & Bendahara", status: "Planned", budgetApproved: 5000000, budgetRealized: 0 },
    { id: 5, title: "Bakti Sosial Panti Asuhan", description: "Kegiatan sosial mengunjungi dan memberikan donasi ke panti asuhan terdekat.", pic: "Divisi Sosial", status: "Cancelled", budgetApproved: 10000000, budgetRealized: 1500000 },
];

const MOCK_ASPIRATIONS: AspirationPost[] = [
    { id: 1, author: "Siswa Kreatif", title: "Pengadaan Loker Siswa di Setiap Koridor", content: "Saya rasa sekolah perlu menyediakan loker agar kami tidak perlu membawa buku yang berat setiap hari. Ini juga bisa mengurangi risiko buku hilang atau rusak.", upvotes: 128, submittedDate: "2024-07-20", status: 'Resolved', response: { responder: 'Wakil Kepala Sekolah', responseText: 'Ide bagus! Kami telah menyetujui anggaran untuk pengadaan loker secara bertahap mulai semester depan.'} },
    { id: 2, author: "Pecinta Buku", title: "Jam Kunjung Perpustakaan Diperpanjang", content: "Banyak dari kami yang ingin meminjam atau membaca buku setelah jam sekolah selesai, tapi perpustakaan sudah tutup. Mohon dipertimbangkan untuk memperpanjang jam bukanya.", upvotes: 95, submittedDate: "2024-07-18", status: 'In Progress' },
    { id: 3, author: "Anonim", title: "Perbaikan Toilet Siswa di Lantai 2", content: "Kondisi toilet di lantai 2 sudah kurang layak, beberapa pintu rusak dan keran air sering mati. Mohon segera diperbaiki demi kenyamanan bersama.", upvotes: 210, submittedDate: "2024-07-21", status: 'Pending' },
    { id: 4, author: "Atlet Sekolah", title: "Penambahan Fasilitas di Lapangan Olahraga", content: "Kami membutuhkan beberapa alat olahraga tambahan seperti bola basket dan net voli yang baru untuk menunjang kegiatan ekstrakurikuler.", upvotes: 78, submittedDate: "2024-07-15", status: 'Reviewed' },
];

const MOCK_MEDIA: MediaItem[] = [
    { id: 1, type: 'photo', title: 'Juara 1 Lomba Cerdas Cermat', description: 'Tim cerdas cermat sekolah berhasil meraih juara pertama dalam kompetisi tingkat provinsi.', thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', author: 'OSIS Dokumentasi', date: '2024-07-19', likes: 256, comments: [{user: 'Andi', text: 'Keren banget! Selamat ya!'}] },
    { id: 2, type: 'video', title: 'Keseruan Class Meeting', description: 'Kompilasi momen-momen seru selama kegiatan class meeting semester ini.', thumbnailUrl: 'https://images.unsplash.com/photo-1527525443983-6e60c7535228?q=80&w=1974&auto=format&fit=crop', url: 'video.mp4', author: 'OSIS Dokumentasi', date: '2024-06-25', likes: 412, comments: [] },
    // ... add more media items
];

const MOCK_ELECTION: Election = {
    id: 1, title: "Pemilihan Ketua OSIS 2024/2025", description: "Gunakan hak pilihmu untuk menentukan pemimpin OSIS periode mendatang. Pilihanmu menentukan arah organisasi kita!", startDate: "2024-08-01", endDate: "2024-08-05",
    candidates: [
        { id: 1, number: 1, name: "Ahmad Zulkarnain", slogan: "Bersama Membangun Prestasi", photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', vision: "Menjadikan OSIS sebagai wadah aspirasi yang aktif dan inovatif.", mission: ["Meningkatkan kualitas ekstrakurikuler.", "Mengadakan acara yang edukatif dan menghibur."] },
        { id: 2, number: 2, name: "Citra Lestari", slogan: "Inovasi, Kolaborasi, Aksi", photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop', vision: "Mewujudkan lingkungan sekolah yang kreatif, suportif, dan berprestasi.", mission: ["Membuat program mentoring antar siswa.", "Memperbanyak kerjasama dengan sekolah lain."] },
    ],
    results: [
        { candidateId: 1, votes: 482 },
        { candidateId: 2, votes: 531 },
    ]
};


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [dashboardData, setDashboardData] = useState<DashboardData>(MOCK_DASHBOARD_DATA);
  const [workPrograms, setWorkPrograms] = useState<WorkProgram[]>(MOCK_WORK_PROGRAMS);
  const [aspirations, setAspirations] = useState<AspirationPost[]>(MOCK_ASPIRATIONS);
  const [mediaItems] = useState<MediaItem[]>(MOCK_MEDIA);
  const [election, setElection] = useState<Election>(MOCK_ELECTION);
  const [userVotedOption, setUserVotedOption] = useState<string | null>(null);
  const [votedCandidateId, setVotedCandidateId] = useState<number | null>(null);

  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'transparency', label: 'Transparansi', icon: 'transparency' },
    { id: 'aspirations', label: 'Aspirasi', icon: 'aspirations' },
    { id: 'media', label: 'Galeri', icon: 'media' },
    { id: 'voting', label: 'E-Voting', icon: 'voting' },
  ];

  const handlePollVote = (optionText: string) => {
    if (userVotedOption) return; // Prevent re-voting

    setDashboardData(prevData => {
      const newOptions = prevData.poll.options.map(opt => {
        if (opt.text === optionText) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      return { ...prevData, poll: { ...prevData.poll, options: newOptions } };
    });
    setUserVotedOption(optionText);
  };
  
  const handleAspirationUpvote = (id: number, isUpvoted: boolean) => {
    setAspirations(prev => prev.map(a => a.id === id ? { ...a, upvotes: a.upvotes + (isUpvoted ? -1 : 1) } : a));
  };
  
  const handleAspirationSubmit = (newAspiration: { title: string, content: string, isAnonymous: boolean }) => {
    const newPost: AspirationPost = {
      id: Date.now(),
      author: newAspiration.isAnonymous ? 'Anonim' : 'Siswa', // In real app, get user name
      title: newAspiration.title,
      content: newAspiration.content,
      upvotes: 0,
      submittedDate: new Date().toISOString(),
      status: 'Pending',
    };
    setAspirations(prev => [newPost, ...prev]);
  };
  
  const handleVote = (candidateId: number) => {
    if(votedCandidateId) return; // Prevent re-voting
    setVotedCandidateId(candidateId);
    // In a real app, an API call would be made here to securely record the vote.
  };

  const handleUpdateWorkProgram = (program: WorkProgram) => {
      setWorkPrograms(prev => prev.map(p => p.id === program.id ? program : p));
  };

  const handleAddWorkProgram = (program: Omit<WorkProgram, 'id'>) => {
      const newProgram: WorkProgram = { ...program, id: Date.now() };
      setWorkPrograms(prev => [newProgram, ...prev]);
  };

  const handleDeleteWorkProgram = (programId: number) => {
      setWorkPrograms(prev => prev.filter(p => p.id !== programId));
  };

  const handleUpdateAspiration = (aspirationId: number, newStatus: AspirationStatus, responseText?: string) => {
    setAspirations(prev => prev.map(a => {
        if (a.id === aspirationId) {
            // Only update response if responseText is provided and not empty
            const newResponse = (responseText && responseText.trim()) 
                ? { responder: 'Admin OSIS', responseText: responseText.trim() } 
                : a.response;
            return { ...a, status: newStatus, response: newResponse };
        }
        return a;
    }));
  };

  const handleUpdateElectionResults = (newResults: ElectionResult[]) => {
      setElection(prev => ({ ...prev, results: newResults }));
  };


  const renderView = () => {
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
        return <VotingPortal election={election} onVote={handleVote} votedCandidateId={votedCandidateId} />;
      case 'admin':
        return <AdminPortal 
                  workPrograms={workPrograms} 
                  onAddWorkProgram={handleAddWorkProgram}
                  onUpdateWorkProgram={handleUpdateWorkProgram}
                  onDeleteWorkProgram={handleDeleteWorkProgram}
                  aspirations={aspirations}
                  onUpdateAspiration={handleUpdateAspiration}
                  election={election}
                  onUpdateElectionResults={handleUpdateElectionResults}
                />;
      default:
        return <Dashboard data={dashboardData} handlePollVote={handlePollVote} userVotedOption={userVotedOption} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans bg-cover bg-center" style={{ backgroundImage: "url('/background-grid.svg')" }}>
      <div className="flex">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          navigationItems={navigationItems}
          projectName="OSIS-HUB"
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
        <main className="flex-1 p-8 overflow-y-auto h-screen">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
