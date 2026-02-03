import React from 'react';
import { Globe } from 'lucide-react';






const GeoMap = () => {
  const countries = [
    { name: 'États-Unis', code: 'US', attacks: 42, color: 'bg-critical' },
    { name: 'Chine', code: 'CN', attacks: 28, color: 'bg-high' },
    { name: 'Russie', code: 'RU', attacks: 15, color: 'bg-medium' },
    { name: 'France', code: 'FR', attacks: 8, color: 'bg-low' },
    { name: 'Allemagne', code: 'DE', attacks: 7, color: 'bg-low' },
  ];

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Origine Géographique des Attaques</h3>
          <p className="text-text-secondary text-sm">Répartition par pays des dernières 24h</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <select className="input-field text-sm">
            <option>Classement par attaques</option>
            <option>Classement par sévérité</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte visuelle */}
        <div className="relative h-64 lg:h-80 bg-secondary-dark rounded-lg flex items-center justify-center">
          <Globe className="w-32 h-32 text-border-color" />
          
          {/* Points sur la carte */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-critical rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-high rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-medium rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-low rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-low rounded-full animate-pulse" />
          
          <div className="absolute bottom-4 left-4 text-text-secondary text-sm">
            Plus la taille est grande, plus le nombre d'attaques est élevé
          </div>
        </div>

        {/* Liste des pays */}
        <div className="space-y-4">
          {countries.map((country, index) => (
            <div key={index} className="flex items-center p-3 bg-secondary-dark rounded-lg">
              <div className="text-2xl mr-4">🇺🇸</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{country.name}</span>
                  <span className="font-semibold">{country.attacks}%</span>
                </div>
                <div className="w-full bg-primary-dark rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${country.color}`}
                    style={{ width: `${country.attacks}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-border-color">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total attaques internationales</span>
              <span className="font-semibold">87%</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-text-secondary">Attaques internes</span>
              <span className="font-semibold">13%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoMap;