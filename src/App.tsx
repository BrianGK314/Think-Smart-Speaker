import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { HomeView } from './components/views/HomeView';
import { MemoryView } from './components/views/MemoryView';
import { CommerceView } from './components/views/CommerceView';
import { TrackerView } from './components/views/TrackerView';
import { AdminLogsView } from './components/views/AdminLogsView';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <div className="flex h-screen w-full bg-zinc-950 font-sans overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 relative overflow-hidden">
        {currentView === 'home' && <HomeView />}
        {currentView === 'memory' && <MemoryView />}
        {currentView === 'commerce' && <CommerceView />}
        {currentView === 'tracker' && <TrackerView />}
        {currentView === 'logs' && <AdminLogsView />}
      </main>
    </div>
  );
}

