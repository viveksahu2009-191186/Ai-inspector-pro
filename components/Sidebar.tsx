
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isCollapsed, setIsCollapsed }) => {
  const items = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: AppView.LAB, label: 'Scenario Lab', icon: 'fa-flask' },
    { id: AppView.INSPECTOR, label: 'Audit Engine', icon: 'fa-clipboard-check' },
    { id: AppView.COMPLIANCE, label: 'Risk & Ethics', icon: 'fa-shield-halved' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-slate-900 h-full fixed left-0 top-0 flex flex-col border-r border-slate-800 transition-all duration-300 z-40`}>
      <div className="p-6 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg shrink-0">
            <i className="fas fa-microscope text-white text-xl"></i>
          </div>
          {!isCollapsed && (
            <span className="text-white font-bold text-xl tracking-tight whitespace-nowrap animate-in fade-in duration-500">
              AI Inspector
            </span>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-500 hover:text-white transition-colors p-1"
        >
          <i className={`fas ${isCollapsed ? 'fa-angles-right' : 'fa-angles-left'}`}></i>
        </button>
      </div>
      
      <nav className="flex-1 mt-6 px-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            title={isCollapsed ? item.label : undefined}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-1 transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <i className={`fas ${item.icon} w-5 shrink-0 ${isCollapsed ? 'text-lg' : ''}`}></i>
            {!isCollapsed && (
              <span className="font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className={`bg-slate-800/50 rounded-xl p-4 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
            <i className="fas fa-user text-xs text-slate-300"></i>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-in fade-in duration-300">
              <p className="text-sm font-medium text-white truncate">QA Specialist</p>
              <p className="text-xs text-slate-500 truncate">Professional Plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
