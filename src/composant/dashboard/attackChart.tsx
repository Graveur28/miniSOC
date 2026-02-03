import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';






const AttackChart = () => {
  const data = [
    { name: 'Brute Force', value: 35, color: '#ff4d4f' },
    { name: 'SQL Injection', value: 25, color: '#ffa940' },
    { name: 'XSS', value: 20, color: '#faad14' },
    { name: 'Scan', value: 15, color: '#1890ff' },
    { name: 'DDoS', value: 5, color: '#52c41a' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card-bg border border-border-color p-3 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">{payload[0].value}% des attaques</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-6">Répartition des Types d'Attaques</h3>
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span className="text-text-secondary text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-text-secondary text-sm">{item.name}</span>
            <span className="ml-auto text-sm font-semibold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackChart;