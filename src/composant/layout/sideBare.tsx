
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Search, 
  AlertTriangle, 
  BarChart3,
  Shield,
  Filter,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';





const Sidebar = ({ isMobileOpen, onClose }) => {
  const [quickFilters, setQuickFilters] = useState({
    attacksOnly: false,
    last24h: true,
    apiOnly: false
  });

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/logs', icon: Activity, label: 'Logs en direct' },
    { path: '/analysis', icon: Search, label: 'Analyse IP' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alertes', badge: 3 },
    { path: '/reports', icon: BarChart3, label: 'Rapports' },
  ];

  const handleFilterChange = (filter) => {
    setQuickFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-primary-dark to-secondary-dark
        border-r border-border-color
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border-color">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-low to-cyan-400 rounded-lg flex items-center justify-center mr-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-low bg-clip-text text-transparent">
                Mini-SOC
              </h1>
              <p className="text-text-secondary text-xs">Security Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-low/20 text-low border border-low/30' 
                      : 'text-text-secondary hover:bg-hover-dark hover:text-white'
                    }
                  `}
                  end={item.path === '/'}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-critical text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Filtres rapides */}
          <div className="mt-8">
            <div className="flex items-center text-text-secondary text-sm font-semibold uppercase mb-3">
              <Filter className="w-4 h-4 mr-2" />
              <span>Filtres rapides</span>
            </div>
            <div className="space-y-3">
              {Object.entries(quickFilters).map(([key, value]) => (
                <label key={key} className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleFilterChange(key)}
                      className="sr-only"
                    />
                    <div className={`
                      w-5 h-5 rounded border-2 transition-colors
                      ${value 
                        ? 'bg-low border-low' 
                        : 'bg-secondary-dark border-border-color group-hover:border-text-secondary'
                      }
                    `}>
                      {value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded" />
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-sm">
                    {key === 'attacksOnly' && 'Attaques seulement'}
                    {key === 'last24h' && '24 dernières heures'}
                    {key === 'apiOnly' && 'API uniquement'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Statut SOC */}
          <div className="mt-8 card p-4">
            <div className="flex items-center text-text-secondary text-sm font-semibold uppercase mb-2">
              <Activity className="w-4 h-4 mr-2" />
              <span>Statut SOC</span>
            </div>
            <div className="flex items-center text-safe">
              <div className="w-2 h-2 bg-safe rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">Opérationnel</span>
            </div>
            <div className="flex items-center mt-3 text-text-secondary">
              <AlertTriangle className="w-4 h-4 mr-2 text-medium" />
              <span className="text-sm">3 alertes non lues</span>
            </div>
          </div>
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-border-color">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">SOC-Junior</p>
                <p className="text-text-secondary text-xs">Analyste L1</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-text-secondary hover:text-white hover:bg-hover-dark rounded-lg">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-secondary hover:text-white hover:bg-hover-dark rounded-lg">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;