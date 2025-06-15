
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
    <div className="space-y-6 md:space-y-8 px-2 sm:px-4 md:px-0">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
          ML Pipeline Architecture
        </h1>
        <p className="text-gray-400 text-xs sm:text-base md:text-lg">
          Comprehensive machine learning system implementing all 5 learning paradigms
        </p>
      </div>

      {/* ML System Overview */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 p-3 xs:p-4 md:p-8 rounded-xl">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-6">
          <div className="text-center">
            <div className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3">
              <Cpu className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-green-400" />
            </div>
            <h3 className="text-white font-bold mb-0.5 xs:mb-1 text-sm xs:text-base">5 Active Models</h3>
            <p className="text-gray-400 text-xs xs:text-sm">All paradigms operational</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3">
              <Database className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-blue-400" />
            </div>
            <h3 className="text-white font-bold mb-0.5 xs:mb-1 text-sm xs:text-base">2.4M Data Points</h3>
            <p className="text-gray-400 text-xs xs:text-sm">Processed daily</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3">
              <Zap className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-purple-400" />
            </div>
            <h3 className="text-white font-bold mb-0.5 xs:mb-1 text-sm xs:text-base">&lt; 100ms</h3>
            <p className="text-gray-400 text-xs xs:text-sm">Average response time</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 bg-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3">
              <Settings className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-cyan-400" />
            </div>
            <h3 className="text-white font-bold mb-0.5 xs:mb-1 text-sm xs:text-base">99.7%</h3>
            <p className="text-gray-400 text-xs xs:text-sm">System uptime</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col xs:flex-row space-y-1 xs:space-y-0 xs:space-x-1 bg-black/30 p-1 rounded-xl">
        {views.map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 xs:py-3 px-2 xs:px-4 rounded-lg transition-all duration-200 text-xs xs:text-sm md:text-base ${
                activeView === view.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium">{view.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-4 xs:mt-6 md:mt-8">
        {activeView === 'paradigms' && <MLParadigms />}
        {activeView === 'pipeline' && <DataPipeline />}
        {activeView === 'performance' && <ModelPerformance />}
      </div>
    </div>
  );
};

export default MLPipeline;
