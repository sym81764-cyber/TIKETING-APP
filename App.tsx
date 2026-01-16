
import React, { useState } from 'react';
import { Screen, UserRole, Event } from './types.ts';
import BottomNav from './components/BottomNav.tsx';
import HomeView from './components/HomeView.tsx';
import SearchView from './components/SearchView.tsx';
import TicketsView from './components/TicketsView.tsx';
import ProfileView from './components/ProfileView.tsx';
import RoleSelector from './components/RoleSelector.tsx';
import Onboarding from './components/Onboarding.tsx';
import ManagerDashboard from './components/ManagerDashboard.tsx';
import ScannerView from './components/ScannerView.tsx';
import CreateEventView from './components/CreateEventView.tsx';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  if (!role) {
    return <RoleSelector onSelect={(selectedRole) => setRole(selectedRole)} />;
  }

  if (!isOnboarded) {
    return <Onboarding role={role} onComplete={() => {
      setIsOnboarded(true);
      setCurrentScreen(role === 'FAN' ? 'home' : 'dashboard');
    }} />;
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setCurrentScreen('edit');
  };

  const renderScreen = () => {
    // Fan Screens
    if (role === 'FAN') {
      switch (currentScreen) {
        case 'home': return <HomeView />;
        case 'search': return <SearchView />;
        case 'tickets': return <TicketsView />;
        case 'profile': return <ProfileView role={role} onRoleSwitch={() => setRole('ORGANIZER')} />;
        default: return <HomeView />;
      }
    } 
    
    // Organizer Screens
    else {
      switch (currentScreen) {
        case 'dashboard': return <ManagerDashboard onEditEvent={handleEditEvent} />;
        case 'scanner': return <ScannerView />;
        case 'create': return <CreateEventView onCreated={() => setCurrentScreen('dashboard')} />;
        case 'edit': return (
          <CreateEventView 
            initialData={editingEvent || undefined} 
            onCreated={() => {
              setEditingEvent(null);
              setCurrentScreen('dashboard');
            }} 
          />
        );
        case 'profile': return <ProfileView role={role} onRoleSwitch={() => setRole('FAN')} />;
        default: return <ManagerDashboard onEditEvent={handleEditEvent} />;
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-black shadow-2xl relative overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {renderScreen()}
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 p-4">
        <BottomNav 
          role={role} 
          currentScreen={currentScreen === 'edit' ? 'create' : currentScreen} 
          onNavigate={(screen) => {
            if (screen === 'create') setEditingEvent(null);
            setCurrentScreen(screen);
          }} 
        />
      </div>
    </div>
  );
};

export default App;
