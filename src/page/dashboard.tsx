import KPICards from '../components/Dashboard/KPICards';
import ActivityChart from '../components/Dashboard/ActivityChart';
import LogTable from '../components/Dashboard/LogTable';
import AttackChart from '../components/Dashboard/AttackChart';
import GeoMap from '../components/Dashboard/GeoMap';



/**
 * 
 * @returns 
 */




export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Tableau de bord de sécurité</h1>
        <p className="text-text-secondary">
          Vue d'ensemble de l'activité de sécurité en temps réel
        </p>
      </div>

      {/* KPIs */}
      <KPICards />

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <AttackChart />
      </div>

      {/* Carte géographique */}
      <GeoMap />

      {/* Logs en temps réel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Logs en temps réel</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-safe text-sm">
              <div className="w-2 h-2 bg-safe rounded-full mr-2 animate-pulse" />
              Mise à jour en direct
            </div>
          </div>
        </div>
        <LogTable />
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="btn-secondary py-3 flex flex-col items-center">
            <span className="text-2xl mb-2">🚫</span>
            <span className="text-sm">Bloquer IP</span>
          </button>
          <button className="btn-secondary py-3 flex flex-col items-center">
            <span className="text-2xl mb-2">📋</span>
            <span className="text-sm">Générer rapport</span>
          </button>
          <button className="btn-secondary py-3 flex flex-col items-center">
            <span className="text-2xl mb-2">🔔</span>
            <span className="text-sm">Créer alerte</span>
          </button>
          <button className="btn-secondary py-3 flex flex-col items-center">
            <span className="text-2xl mb-2">🔄</span>
            <span className="text-sm">Forcer scan</span>
          </button>
        </div>
      </div>
    </div>
  )
}



