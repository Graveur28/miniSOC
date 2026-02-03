import React from 'react';




const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch(status?.toLowerCase()) {
      case 'new':
        return { 
          className: 'status-new',
          icon: '○',
          label: 'Nouveau'
        };
      case 'in-progress':
        return { 
          className: 'status-in-progress',
          icon: '●',
          label: 'En cours'
        };
      case 'resolved':
        return { 
          className: 'status-resolved',
          icon: '●',
          label: 'Résolu'
        };
      default:
        return { 
          className: 'status-new',
          icon: '○',
          label: 'Nouveau'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`badge ${config.className} flex items-center gap-1`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

export default StatusBadge;