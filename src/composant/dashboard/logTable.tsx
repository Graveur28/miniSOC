import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SeverityBadge from '../Common/SeverityBadge';
import { ChevronDown, Filter, Download, Eye } from 'lucide-react';





const LogTable = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      ip: '192.168.1.100',
      type: 'BRUTE_FORCE',
      endpoint: '/api/login',
      severity: 'critical',
      country: '🇫🇷',
      status: 'blocked'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      ip: '203.0.113.5',
      type: 'SQL_INJECTION',
      endpoint: '/search',
      severity: 'high',
      country: '🇺🇸',
      status: 'detected'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      ip: '198.51.100.23',
      type: 'XSS',
      endpoint: '/contact',
      severity: 'medium',
      country: '🇩🇪',
      status: 'detected'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      ip: '10.0.0.15',
      type: 'SCAN',
      endpoint: '/admin',
      severity: 'critical',
      country: '🇷🇺',
      status: 'blocked'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      ip: '192.168.1.100',
      type: 'BRUTE_FORCE',
      endpoint: '/api/login',
      severity: 'critical',
      country: '🇫🇷',
      status: 'blocked'
    },
  ]);

  const [selectedLog, setSelectedLog] = useState(null);
  const [filters, setFilters] = useState({
    severity: 'all',
    type: 'all'
  });

  const getTypeLabel = (type) => {
    const labels = {
      'BRUTE_FORCE': 'Brute Force',
      'SQL_INJECTION': 'SQL Injection',
      'XSS': 'Cross-site Scripting',
      'SCAN': 'Port Scan',
      'SPAM': 'Spam',
      'DDOS': 'DDoS'
    };
    return labels[type] || type;
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  };

  const filteredLogs = logs.filter(log => {
    if (filters.severity !== 'all' && log.severity !== filters.severity) return false;
    if (filters.type !== 'all' && log.type !== filters.type) return false;
    return true;
  });

  return (
    <div className="card">
      <div className="p-6 border-b border-border-color">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Logs en Temps Réel</h3>
            <p className="text-text-secondary text-sm">Derniers événements de sécurité</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-text-secondary" />
              <select 
                className="input-field text-sm"
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
              >
                <option value="all">Toutes sévérités</option>
                <option value="critical">Critique</option>
                <option value="high">Élevé</option>
                <option value="medium">Moyen</option>
              </select>
              <select 
                className="input-field text-sm"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all">Tous types</option>
                <option value="BRUTE_FORCE">Brute Force</option>
                <option value="SQL_INJECTION">SQL Injection</option>
                <option value="XSS">XSS</option>
                <option value="SCAN">Scan</option>
              </select>
            </div>
            <button className="btn-secondary text-sm flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color">
              <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Timestamp</th>
              <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">IP Source</th>
              <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Type</th>
              <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Endpoint</th>
              <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Sévérité</th>
              <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr 
                key={log.id} 
                className={`border-b border-border-color hover:bg-hover-dark cursor-pointer transition-colors ${
                  selectedLog?.id === log.id ? 'bg-hover-dark' : ''
                }`}
                onClick={() => setSelectedLog(log)}
              >
                <td className="py-4 px-6">
                  <div className="text-sm">
                    {format(log.timestamp, 'HH:mm:ss', { locale: fr })}
                  </div>
                  <div className="text-text-secondary text-xs">
                    {format(log.timestamp, 'dd/MM/yyyy', { locale: fr })}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <span className="mr-2">{log.country}</span>
                    <span className="font-mono text-sm">{log.ip}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm">{getTypeLabel(log.type)}</div>
                </td>
                <td className="py-4 px-6">
                  <code className="text-sm bg-secondary-dark px-2 py-1 rounded">
                    {log.endpoint}
                  </code>
                </td>
                <td className="py-4 px-6">
                  <SeverityBadge level={log.severity} />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-1 text-text-secondary hover:text-white hover:bg-active-dark rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLog(log);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-xs btn-critical px-3 py-1">
                      Bloquer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="p-6 border-t border-border-color">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold">Détails du log</h4>
            <button 
              className="text-text-secondary hover:text-white"
              onClick={() => setSelectedLog(null)}
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-text-secondary text-sm">IP Source</label>
                <p className="font-mono">{selectedLog.ip}</p>
              </div>
              <div>
                <label className="text-text-secondary text-sm">Type d'attaque</label>
                <p>{getTypeLabel(selectedLog.type)}</p>
              </div>
              <div>
                <label className="text-text-secondary text-sm">Endpoint</label>
                <p>{selectedLog.endpoint}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-text-secondary text-sm">Timestamp</label>
                <p>{format(selectedLog.timestamp, 'dd/MM/yyyy HH:mm:ss', { locale: fr })}</p>
              </div>
              <div>
                <label className="text-text-secondary text-sm">Sévérité</label>
                <div><SeverityBadge level={selectedLog.severity} /></div>
              </div>
              <div>
                <label className="text-text-secondary text-sm">Statut</label>
                <p className={`capitalize ${
                  selectedLog.status === 'blocked' ? 'text-safe' : 'text-medium'
                }`}>
                  {selectedLog.status}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="btn-primary text-sm">
              Créer une alerte
            </button>
            <button className="btn-secondary text-sm">
              Voir l'historique IP
            </button>
          </div>
        </div>
      )}

      <div className="p-6 border-t border-border-color">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="text-text-secondary text-sm">
            Affichage de {filteredLogs.length} logs
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button className="text-sm text-text-secondary hover:text-white">
              ← Précédent
            </button>
            <span className="text-sm">Page 1 sur 5</span>
            <button className="text-sm text-text-secondary hover:text-white">
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogTable;