
import React, { useState } from 'react';
import { TrendingUp, Target, Zap, Brain, Activity, AlertCircle } from 'lucide-react';

const ModelPerformance = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const timeframes = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const modelMetrics = [
    {
      name: 'Supervised Learning',
      type: 'Classification',
      accuracy: 97.8,
      precision: 98.2,
      recall: 96.5,
      f1Score: 97.3,
      latency: 45,
      throughput: 15000,
      status: 'excellent',
      trend: '+2.1%'
    },
    {
      name: 'Unsupervised Learning', 
      type: 'Clustering',
      accuracy: 94.2,
      silhouetteScore: 0.87,
      dbIndex: 0.34,
      clusterPurity: 89.7,
      latency: 120,
      throughput: 8500,
      status: 'good',
      trend: '+1.8%'
    },
    {
      name: 'Semi-Supervised',
      type: 'Hybrid',
      accuracy: 96.1,
      labelEfficiency: 340,
      confidenceScore: 91.8,
      coverageIncrease: 240,
      latency: 65,  
      throughput: 12000,
      status: 'excellent',
      trend: '+3.2%'
    },
    {
      name: 'Self-Supervised',
      type: 'Representation',
      accuracy: 95.7,
      representationQuality: 93.2,
      transferScore: 89.6,
      robustness: 91.4,
      latency: 85,
      throughput: 9500,
      status: 'good',
      trend: '+2.7%'
    },
    {
      name: 'Reinforcement Learning',
      type: 'Decision',
      accuracy: 98.3,
      rewardOptimization: 94.7,
      explorationRate: 12.8,
      stabilityScore: 96.2,
      latency: 35,
      throughput: 18000,
      status: 'excellent',
      trend: '+4.1%'
    }
  ];

  const performanceAlerts = [
    {
      severity: 'info',
      model: 'Unsupervised Learning',
      message: 'Model retraining scheduled for tonight to improve cluster quality',
      timestamp: '2 hours ago'
    },
    {
      severity: 'success',
      model: 'Reinforcement Learning',
      message: 'Achieved new performance milestone: 98.3% accuracy',
      timestamp: '5 hours ago'
    },
    {
      severity: 'warning',
      model: 'Self-Supervised',
      message: 'Slight increase in latency detected, investigating cause',
      timestamp: '1 day ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'good': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'fair': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'poor': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'success': return 'border-l-green-500 bg-green-500/10';
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'error': return 'border-l-red-500 bg-red-500/10';
      case 'info': return 'border-l-blue-500 bg-blue-500/10';
      default: return 'border-l-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Model Performance Overview</h2>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-black/50 border border-white/20 text-white px-3 py-1 rounded-lg"
          >
            {timeframes.map(tf => (
              <option key={tf.value} value={tf.value}>{tf.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-8 w-8 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">96.4%</div>
            <div className="text-gray-400 text-sm">Avg Accuracy</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">68ms</div>
            <div className="text-gray-400 text-sm">Avg Latency</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">12.6K</div>
            <div className="text-gray-400 text-sm">Avg Throughput/sec</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-8 w-8 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">+2.8%</div>
            <div className="text-gray-400 text-sm">Performance Trend</div>
          </div>
        </div>
      </div>

      {/* Individual Model Performance */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Brain className="h-6 w-6 text-cyan-400" />
          <span>Individual Model Metrics</span>
        </h3>

        <div className="space-y-6">
          {modelMetrics.map((model, index) => (
            <div key={index} className="bg-slate-900/50 p-6 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white">{model.name}</h4>
                  <p className="text-gray-400">{model.type} Model</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 text-sm font-medium">{model.trend}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(model.status)}`}>
                    {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-white">{model.accuracy}%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
                
                {model.precision && (
                  <div className="text-center p-3 bg-black/30 rounded-lg">
                    <div className="text-lg font-bold text-white">{model.precision}%</div>
                    <div className="text-xs text-gray-400">Precision</div>
                  </div>
                )}
                
                {model.recall && (
                  <div className="text-center p-3 bg-black/30 rounded-lg">
                    <div className="text-lg font-bold text-white">{model.recall}%</div>
                    <div className="text-xs text-gray-400">Recall</div>
                  </div>
                )}
                
                {model.f1Score && (
                  <div className="text-center p-3 bg-black/30 rounded-lg">
                    <div className="text-lg font-bold text-white">{model.f1Score}%</div>
                    <div className="text-xs text-gray-400">F1 Score</div>
                  </div>
                )}
                
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-cyan-400">{model.latency}ms</div>
                  <div className="text-xs text-gray-400">Latency</div>
                </div>
                
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-purple-400">{model.throughput.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Throughput/sec</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Alerts */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-yellow-400" />
          <span>Performance Alerts & Updates</span>
        </h3>

        <div className="space-y-3">
          {performanceAlerts.map((alert, index) => (
            <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{alert.model}</h4>
                  <p className="text-gray-300 text-sm mt-1">{alert.message}</p>
                </div>
                <span className="text-gray-400 text-xs">{alert.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Comparison Chart */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6">Model Accuracy Comparison</h3>
        
        <div className="space-y-4">
          {modelMetrics.map((model, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-40 text-white font-medium">{model.name}</div>
              <div className="flex-1 bg-gray-700 rounded-full h-3 relative">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${model.accuracy}%` }}
                />
                <span className="absolute right-2 top-0 text-xs text-white font-bold">
                  {model.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;
