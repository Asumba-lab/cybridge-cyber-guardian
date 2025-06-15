
import React, { useState, useEffect } from 'react';
import { MapPin, Shield, AlertTriangle } from 'lucide-react';

const ThreatMap = () => {
  const [threats, setThreats] = useState([
    { id: 1, location: 'New York', type: 'Phishing', severity: 'high', x: 20, y: 30 },
    { id: 2, location: 'London', type: 'Malware', severity: 'medium', x: 45, y: 25 },
    { id: 3, location: 'Tokyo', type: 'DDoS', severity: 'low', x: 80, y: 35 },
    { id: 4, location: 'Sydney', type: 'Ransomware', severity: 'high', x: 85, y: 70 },
    { id: 5, location: 'São Paulo', type: 'Phishing', severity: 'medium', x: 30, y: 65 },
  ]);

  const [selectedThreat, setSelectedThreat] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => prev.map(threat => ({
        ...threat,
        x: Math.max(5, Math.min(95, threat.x + (Math.random() - 0.5) * 2)),
        y: Math.max(5, Math.min(95, threat.y + (Math.random() - 0.5) * 2))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/30 border-red-500';
      case 'medium': return 'text-yellow-400 bg-yellow-500/30 border-yellow-500';
      case 'low': return 'text-green-400 bg-green-500/30 border-green-500';
      default: return 'text-gray-400 bg-gray-500/30 border-gray-500';
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="h-6 w-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Global Threat Map</h2>
      </div>

      <div className="relative bg-slate-900/50 rounded-lg h-80 overflow-hidden">
        {/* World map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        {/* Threat markers */}
        {threats.map((threat) => (
          <div
            key={threat.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${getSeverityColor(threat.severity)} border rounded-full p-2 hover:scale-125`}
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
            onClick={() => setSelectedThreat(threat)}
          >
            <AlertTriangle className="h-4 w-4" />
          </div>
        ))}

        {/* Threat details popup */}
        {selectedThreat && (
          <div 
            className="absolute bg-black/90 border border-white/20 p-4 rounded-lg text-white z-10 min-w-48"
            style={{ 
              left: `${Math.min(selectedThreat.x + 5, 70)}%`, 
              top: `${Math.max(selectedThreat.y - 10, 10)}%` 
            }}
            onClick={() => setSelectedThreat(null)}
          >
            <h3 className="font-bold text-lg">{selectedThreat.location}</h3>
            <p className="text-gray-300">Type: {selectedThreat.type}</p>
            <p className={`font-semibold ${getSeverityColor(selectedThreat.severity).split(' ')[0]}`}>
              Severity: {selectedThreat.severity.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-300">High Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-300">Medium Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-300">Low Risk</span>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
