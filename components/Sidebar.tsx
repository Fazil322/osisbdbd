import React from 'react';
import { View, NavigationItem } from '../types';

// --- Icon Components (as before) ---
const DashboardIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const TransparencyIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const AspirationIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const MediaIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const VotingIcon = ({className = "w-6 h-6"}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// --- Icon Map ---
const iconMap: { [key: string]: React.ReactElement } = {
  dashboard: <DashboardIcon />,
  transparency: <TransparencyIcon />,
  aspirations: <AspirationIcon />,
  media: <MediaIcon />,
  voting: <VotingIcon />,
};

// --- Component Interfaces ---
interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  navigationItems: NavigationItem[];
  projectName: string;
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

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, navigationItems, projectName }) => {
  return (
    <aside className="w-64 bg-glass-bg backdrop-blur-2xl border-r border-glass-border p-6 flex-shrink-0 hidden md:flex flex-col">
      <div className="flex items-center mb-12">
        <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-lg mr-3 shadow-lg"></div>
        <h1 className="text-xl font-bold text-white">{projectName}</h1>
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
      </nav>
    </aside>
  );
};

export default Sidebar;