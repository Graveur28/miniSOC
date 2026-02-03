import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Menu, X } from 'lucide-react';






const Header = ({ onMenuToggle, isDarkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, type: 'critical', message: 'Tentative brute force détectée' },
    { id: 2, type: 'high', message: 'Scan API anormal' },
    { id: 3, type: 'medium', message: 'Nouvelle IP suspecte' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-primary-dark/95 backdrop-blur-sm border-b border-border-color">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left section - Menu toggle and title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-text-secondary hover:text-white hover:bg-hover-dark rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center">
            <div className="flex items-center text-safe">
              <div className="w-2 h-2 bg-safe rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <span className="mx-3 text-text-secondary">|</span>
            <h2 className="text-lg font-semibold">Tableau de bord</h2>
          </div>
        </div>

        {/* Right section - Search, notifications, theme */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher IP, log, utilisateur..."
              className="input-field pl-10 pr-4 w-64"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-text-secondary hover:text-white hover:bg-hover-dark rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full" />
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card-bg border border-border-color rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-border-color">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-border-color hover:bg-hover-dark cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                          notification.type === 'critical' ? 'bg-critical' :
                          notification.type === 'high' ? 'bg-high' :
                          'bg-medium'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-text-secondary text-xs mt-1">Il y a 5 minutes</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border-color">
                  <button className="text-low text-sm hover:underline w-full text-center">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-text-secondary hover:text-white hover:bg-hover-dark rounded-lg"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* User avatar (mobile) */}
          <div className="lg:hidden">
            <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">SJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-secondary" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="input-field pl-10 pr-4 w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;