import React from 'react';





const SeverityBadge = ({ level, children }) => {
  const getSeverityClass = (level) => {
    switch(level?.toLowerCase()) {
      case 'critical': return 'severity-critical';
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      case 'safe': return 'severity-safe';
      default: return 'severity-low';
    }
  };

  return (
    <span className={`badge ${getSeverityClass(level)}`}>
      {children || level?.toUpperCase()}
    </span>
  );
};

export default SeverityBadge;