import { TrendingUp, TrendingDown } from 'lucide-react';




const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend = 'up', 
  severity,
  icon,
  loading = false 
}) => {
  const getTrendColor = () => {
    if (severity) {
      switch(severity) {
        case 'critical': return 'text-critical';
        case 'high': return 'text-high';
        case 'medium': return 'text-medium';
        case 'low': return 'text-low';
        case 'safe': return 'text-safe';
        default: return 'text-safe';
      }
    }
    return trend === 'up' ? 'text-safe' : 'text-critical';
  };

  const getSeverityIcon = () => {
    switch(severity) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      case 'safe': return '🟢';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-4 bg-secondary-dark rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-secondary-dark rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-text-secondary text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <div className={`flex items-center ${getTrendColor()} text-sm`}>
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {change}
              </div>
              <span className="text-text-secondary text-sm ml-2">vs hier</span>
            </div>
          )}
        </div>
        <div className={`text-2xl ${severity ? `text-${severity}` : 'text-low'}`}>
          {icon || getSeverityIcon()}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;