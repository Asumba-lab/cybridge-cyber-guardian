
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Activity, Users, Building } from 'lucide-react';
import ThreatMap from './ThreatMap';
import RealTimeAlerts from './RealTimeAlerts';
import MLMetrics from './MLMetrics';

const Dashboard = () => {
  const [stats, setStats] = useState({
    threatsBlocked: 1247,
    activeSessions: 89,
    riskScore: 23,
    mlAccuracy: 97.8
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        activeSessions: 85 + Math.floor(Math.random() * 10),
        riskScore: Math.max(15, Math.min(35, prev.riskScore + (Math.random() - 0.5) * 4)),
        mlAccuracy: 97 + Math.random() * 2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Cyber Threat Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Real-time monitoring powered by advanced ML algorithms
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Threats Blocked</p>
              <p className="text-3xl font-bold text-white">{stats.threatsBlocked.toLocaleString()}</p>
            </div>
            <Shield className="h-10 w-10 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Active Sessions</p>
              <p className="text-3xl font-bold text-white">{stats.activeSessions}</p>
            </div>
            <Users className="h-10 w-10 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Risk Score</p>
              <p className="text-3xl font-bold text-white">{stats.riskScore.toFixed(1)}</p>
            </div>
            <AlertTriangle className="h-10 w-10 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">ML Accuracy</p>
              <p className="text-3xl font-bold text-white">{stats.mlAccuracy.toFixed(1)}%</p>
            </div>
            <Activity className="h-10 w-10 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Threat Map */}
        <div className="lg:col-span-2">
          <ThreatMap />
        </div>

        {/* Real-time Alerts */}
        <div>
          <RealTimeAlerts />
        </div>
      </div>

      {/* ML Metrics */}
      <div className="mt-8">
        <MLMetrics />
      </div>
    </div>
  );
};

export default Dashboard;
