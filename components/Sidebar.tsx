import React, { useState, useEffect } from 'react';
import { View, NavigationItem } from '../types';

// --- Icon Components (as before) ---
const DashboardIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const TransparencyIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const AspirationIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const MediaIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const VotingIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AdminIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// --- Icon Map ---
const iconMap: { [key: string]: React.ReactElement } = {
  dashboard: <DashboardIcon />,
  transparency: <TransparencyIcon />,
  aspirations: <AspirationIcon />,
  media: <MediaIcon />,
  voting: <VotingIcon />,
  admin: <AdminIcon />,
};

// --- Component Interfaces ---
interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  navigationItems: NavigationItem[];
  projectName: string;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface NavItemProps {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// --- Components ---
const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-brand-primary text-white shadow-lg'
        : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
    }`}
  >
    {React.cloneElement(icon, { className: "w-6 h-6 mr-4"})}
    <span className="font-semibold">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, navigationItems, projectName, isAdmin, setIsAdmin }) => {
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    if (logoClicks > 0) {
      const timer = setTimeout(() => setLogoClicks(0), 3000); // Reset after 3 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  const handleLogoClick = () => {
    if (isAdmin) {
      // Logout logic
      if (window.confirm('Apakah Anda yakin ingin keluar dari Panel Admin?')) {
        setIsAdmin(false);
        setActiveView('dashboard');
      }
    } else {
      // Login logic
      const newClicks = logoClicks + 1;
      setLogoClicks(newClicks);

      if (newClicks >= 5) {
        const password = window.prompt('Masukkan password admin:');
        if (password === 'adminOSIS2024') {
          window.alert('Akses admin diberikan!');
          setIsAdmin(true);
          setActiveView('admin');
        } else if (password !== null) { // Check for null to avoid alert on cancel
          window.alert('Password salah.');
        }
        setLogoClicks(0); // Reset counter after attempt
      }
    }
  };


  return (
    <aside className="w-64 bg-glass-bg backdrop-blur-2xl border-r border-glass-border p-6 flex-shrink-0 hidden md:flex flex-col">
      <div 
        className="flex items-center mb-12 cursor-pointer group"
        onClick={handleLogoClick}
        title={isAdmin ? "Klik untuk logout" : "Admin Access"}
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-lg mr-3 shadow-lg transition-transform duration-300 group-hover:scale-110"></div>
        <h1 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-primary">{projectName}</h1>
      </div>
      <nav className="space-y-3">
        {navigationItems.map(item => (
          <NavItem 
            key={item.id}
            label={item.label}
            icon={iconMap[item.icon]}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id)}
          />
        ))}
        {isAdmin && (
            <div className="pt-4 mt-4 border-t border-glass-border">
                <NavItem
                    label="Admin Panel"
                    icon={iconMap['admin']}
                    isActive={activeView === 'admin'}
                    onClick={() => setActiveView('admin')}
                />
            </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
