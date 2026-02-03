import React from 'react';
import MetricCard from '../Common/MetricCard';





const KPICards = () => {
  const kpiData = [
    {
      title: "Total Requêtes",
      value: "42,856",
      change: "+12.5%",
      trend: "up",
      severity: "safe",
      icon: "🌐"
    },
    {
      title: "Attaques Bloquées",
      value: "1,243",
      change: "-3.2%",
      trend: "down",
      severity: "critical",
      icon: "🛡️"
    },
    {
      title: "IP Suspectes",
      value: "28",
      change: "+8",
      trend: "up",
      severity: "high",
      icon: "🔴"
    },
    {
      title: "Logs Traités",
      value: "98.7%",
      change: "+0.3%",
      trend: "up",
      severity: "safe",
      icon: "📊"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <MetricCard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KPICards;