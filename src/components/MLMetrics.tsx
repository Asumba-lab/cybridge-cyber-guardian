
import React from 'react';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

const MLMetrics = () => {
  const metrics = [
    {
      paradigm: 'Supervised Learning',
      accuracy: 97.8,
      status: 'Active',
      color: 'from-green-500 to-emerald-500'
    },
    {
      paradigm: 'Unsupervised Learning',
      accuracy: 94.2,
      status: 'Training',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      paradigm: 'Semi-Supervised',
      accuracy: 96.1,
      status: 'Active',
      color: 'from-purple-500 to-violet-500'
    },
    {
      paradigm: 'Self-Supervised',
      accuracy: 95.7,
      status: 'Optimizing',
      color: 'from-orange-500 to-red-500'
    },
    {
      paradigm: 'Reinforcement Learning',
      accuracy: 98.3,
      status: 'Active',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-6 w-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">ML Performance Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-slate-900/50 border border-white/10 p-4 rounded-lg hover:border-white/20 transition-all duration-300"
          >
            <div className={`w-full h-2 bg-gradient-to-r ${metric.color} rounded-full mb-3`} />
            
            <h3 className="text-white font-semibold text-sm mb-2">{metric.paradigm}</h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-white">{metric.accuracy}%</span>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              metric.status === 'Active' 
                ? 'bg-green-500/20 text-green-400' 
                : metric.status === 'Training'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                metric.status === 'Active' 
                  ? 'bg-green-400 animate-pulse' 
                  : metric.status === 'Training'
                  ? 'bg-blue-400 animate-pulse'
                  : 'bg-yellow-400 animate-pulse'
              }`} />
              {metric.status}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-full mb-3">
            <Target className="h-6 w-6 text-cyan-400" />
          </div>
          <h3 className="text-white font-semibold mb-1">Threat Detection</h3>
          <p className="text-gray-400 text-sm">Real-time anomaly identification</p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-3">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-white font-semibold mb-1">Adaptive Learning</h3>
          <p className="text-gray-400 text-sm">Continuous model improvement</p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-3">
            <Zap className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-white font-semibold mb-1">Real-time Processing</h3>
          <p className="text-gray-400 text-sm">Instant threat response</p>
        </div>
      </div>
    </div>
  );
};

export default MLMetrics;
