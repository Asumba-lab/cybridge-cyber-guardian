
import React, { useState } from 'react';
import { Brain, Cpu, Database, Zap, TrendingUp, Settings } from 'lucide-react';
import MLParadigms from './MLParadigms';
import DataPipeline from './DataPipeline';
import ModelPerformance from './ModelPerformance';

const MLPipeline = () => {
  const [activeView, setActiveView] = useState('paradigms');

  const views = [
    { id: 'paradigms', label: 'ML Paradigms', icon: Brain },
    { id: 'pipeline', label: 'Data Pipeline', icon: Database },
    { id: 'performance', label: 'Model Performance', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          ML Pipeline Architecture
        </h1>
        <p className="text-gray-400 text-lg">
          Comprehensive machine learning system implementing all 5 learning paradigms
        </p>
      </div>

      {/* ML System Overview */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Cpu className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-white font-bold mb-1">5 Active Models</h3>
            <p className="text-gray-400 text-sm">All paradigms operational</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Database className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold mb-1">2.4M Data Points</h3>
            <p className="text-gray-400 text-sm">Processed daily</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-white font-bold mb-1">< 100ms</h3>
            <p className="text-gray-400 text-sm">Average response time</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="h-8 w-8 text-cyan-400" />
            </div>
            <h3 className="text-white font-bold mb-1">99.7%</h3>
            <p className="text-gray-400 text-sm">System uptime</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-black/30 p-1 rounded-xl">
        {views.map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeView === view.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{view.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeView === 'paradigms' && <MLParadigms />}
        {activeView === 'pipeline' && <DataPipeline />}
        {activeView === 'performance' && <ModelPerformance />}
      </div>
    </div>
  );
};

export default MLPipeline;
