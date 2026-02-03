import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';








const ActivityChart = () => {
  const data = [
    { time: '00:00', normal: 1200, suspect: 45, attack: 12 },
    { time: '03:00', normal: 800, suspect: 28, attack: 8 },
    { time: '06:00', normal: 1500, suspect: 65, attack: 18 },
    { time: '09:00', normal: 3200, suspect: 120, attack: 35 },
    { time: '12:00', normal: 4500, suspect: 180, attack: 52 },
    { time: '15:00', normal: 3800, suspect: 145, attack: 42 },
    { time: '18:00', normal: 2800, suspect: 95, attack: 28 },
    { time: '21:00', normal: 1800, suspect: 75, attack: 22 },
    { time: '24:00', normal: 1000, suspect: 40, attack: 15 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card-bg border border-border-color p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Activité par Heure</h3>
          <p className="text-text-secondary text-sm">Activité réseau des dernières 24 heures</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <select className="input-field text-sm">
            <option>24 dernières heures</option>
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
          </select>
          <button className="btn-secondary text-sm">
            Exporter
          </button>
        </div>
      </div>
      
      <div className="h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2d4a72" />
            <XAxis 
              dataKey="time" 
              stroke="#8c9eb5"
              fontSize={12}
            />
            <YAxis 
              stroke="#8c9eb5"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="normal"
              stackId="1"
              stroke="#1890ff"
              fill="#1890ff"
              fillOpacity={0.2}
              name="Normal"
            />
            <Area
              type="monotone"
              dataKey="suspect"
              stackId="2"
              stroke="#faad14"
              fill="#faad14"
              fillOpacity={0.2}
              name="Suspect"
            />
            <Area
              type="monotone"
              dataKey="attack"
              stackId="3"
              stroke="#ff4d4f"
              fill="#ff4d4f"
              fillOpacity={0.2}
              name="Attaque"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;