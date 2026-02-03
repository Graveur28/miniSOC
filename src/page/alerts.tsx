
import React from 'react'
import React, { useState } from 'react';
import StatusBadge from '../components/Common/StatusBadge';
import SeverityBadge from '../components/Common/SeverityBadge';
import { AlertTriangle, Filter, CheckCircle, Clock, User, MessageSquare } from 'lucide-react';





function alerts() {
    const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Tentative Brute Force API',
      description: '142 requêtes POST /api/login en 2 minutes',
      ip: '192.168.1.100',
      severity: 'critical',
      status: 'new',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      assignee: null,
      comments: 0
    },
    {
      id: 2,
      title: 'Scan Répertoires Admin',
      description: '37 répertoires admin testés',
      ip: '10.0.0.15',
      severity: 'high',
      status: 'in-progress',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      assignee: 'SOC-Junior',
      comments: 2
    },
    {
      id: 3,
      title: 'SQL Injection Détectée',
      description: "Payload: ' OR '1'='1",
      ip: '203.0.113.5',
      severity: 'medium',
      status: 'resolved',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      assignee: 'SOC-Mid',
      comments: 3
    },
    {
      id: 4,
      title: 'User-Agent Anomal',
      description: 'Bot détecté: "Mozilla/5.0 (compatible; EvilBot/1.0)"',
      ip: '198.51.100.23',
      severity: 'low',
      status: 'new',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      assignee: null,
      comments: 0
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  const [filters, setFilters] = useState({
    status: 'all',
    severity: 'all'
  });

  const handleStatusChange = (alertId, newStatus) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const handleAssignee = (alertId, assignee) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, assignee } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filters.status !== 'all' && alert.status !== filters.status) return false;
    if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
    return true;
  });


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Gestion des Alertes</h1>
        <p className="text-text-secondary">
          Surveillez et gérez les alertes de sécurité en temps réel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des alertes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-critical mr-2" />
                <h2 className="text-lg font-semibold">Alertes actives ({filteredAlerts.length})</h2>
              </div>
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <select 
                  className="input-field text-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">Tous statuts</option>
                  <option value="new">Nouvelles</option>
                  <option value="in-progress">En cours</option>
                  <option value="resolved">Résolues</option>
                </select>
                <select 
                  className="input-field text-sm"
                  value={filters.severity}
                  onChange={(e) => setFilters({...filters, severity: e.target.value})}
                >
                  <option value="all">Toutes sévérités</option>
                  <option value="critical">Critique</option>
                  <option value="high">Élevé</option>
                  <option value="medium">Moyen</option>
                  <option value="low">Faible</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAlert?.id === alert.id 
                      ? 'border-low bg-low/10' 
                      : 'border-border-color hover:border-low hover:bg-low/5'
                  }`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <SeverityBadge level={alert.severity} />
                        <StatusBadge status={alert.status} className="ml-2" />
                      </div>
                      <h3 className="font-semibold mb-1">{alert.title}</h3>
                      <p className="text-text-secondary text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center text-xs text-text-secondary">
                        <span className="font-mono mr-4">{alert.ip}</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {alert.timestamp.toLocaleTimeString()}
                        {alert.assignee && (
                          <>
                            <User className="w-3 h-3 ml-4 mr-1" />
                            {alert.assignee}
                          </>
                        )}
                        {alert.comments > 0 && (
                          <>
                            <MessageSquare className="w-3 h-3 ml-4 mr-1" />
                            {alert.comments}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails de l'alerte sélectionnée */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Détails de l'alerte</h3>
            {selectedAlert ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">{selectedAlert.title}</h4>
                    <SeverityBadge level={selectedAlert.severity} />
                  </div>
                  <p className="text-text-secondary mb-4">{selectedAlert.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-text-secondary text-sm">IP Source</label>
                      <p className="font-mono">{selectedAlert.ip}</p>
                    </div>
                    <div>
                      <label className="text-text-secondary text-sm">Statut</label>
                      <div className="mt-1"><StatusBadge status={selectedAlert.status} /></div>
                    </div>
                    <div>
                      <label className="text-text-secondary text-sm">Détecté le</label>
                      <p>{selectedAlert.timestamp.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-text-secondary text-sm">Assigné à</label>
                      <p>{selectedAlert.assignee || 'Non assigné'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">Actions</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        className="btn-primary text-sm py-2"
                        onClick={() => handleAssignee(selectedAlert.id, 'SOC-Junior')}
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        S'assigner
                      </button>
                      <button className="btn-secondary text-sm py-2">
                        Bloquer IP
                      </button>
                      <button 
                        className="btn-secondary text-sm py-2"
                        onClick={() => handleStatusChange(selectedAlert.id, 'in-progress')}
                      >
                        En cours
                      </button>
                      <button 
                        className="btn-secondary text-sm py-2"
                        onClick={() => handleStatusChange(selectedAlert.id, 'resolved')}
                      >
                        Résoudre
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-text-secondary text-center py-8">
                Sélectionnez une alerte pour voir les détails
              </p>
            )}
          </div>

          {/* Statistiques des alertes */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-text-secondary text-sm">Nouvelles</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="w-full bg-primary-dark rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-1/2" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-text-secondary text-sm">En cours</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="w-full bg-primary-dark rounded-full h-2">
                  <div className="bg-low h-2 rounded-full w-1/4" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-text-secondary text-sm">Résolues (24h)</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="w-full bg-primary-dark rounded-full h-2">
                  <div className="bg-safe h-2 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default alerts



