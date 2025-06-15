import React, { useState } from 'react';
import { Brain, Target, Eye, Puzzle, Gamepad2, Play, Pause } from 'lucide-react';

const MLParadigms = () => {
  const [selectedParadigm, setSelectedParadigm] = useState('supervised');

  const paradigms = {
    supervised: {
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500/50',
      title: 'Supervised Learning',
      description: 'Learn from labeled data to predict outcomes',
      accuracy: 97.8,
      status: 'active',
      useCase: 'Phishing Detection & Malware Classification',
      algorithm: 'Random Forest + Neural Networks',
      dataSize: '850K labeled samples',
      features: [
        'Email content analysis',
        'URL pattern recognition', 
        'Behavioral indicators',
        'Network traffic analysis'
      ],
      performance: {
        precision: 98.2,
        recall: 96.5,
        f1Score: 97.3,
        falsePositives: 1.8
      }
    },
    unsupervised: {
      icon: Eye,
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-500/50',
      title: 'Unsupervised Learning',
      description: 'Discover hidden patterns without labeled data',
      accuracy: 94.2,
      status: 'training',
      useCase: 'Anomaly Detection & Network Clustering',
      algorithm: 'K-Means + Isolation Forest',
      dataSize: '1.2M unlabeled samples',
      features: [
        'Network traffic clustering',
        'User behavior profiling',
        'System anomaly detection',
        'Attack pattern discovery'
      ],
      performance: {
        anomalyDetection: 94.2,
        clusterPurity: 89.7,
        outlierAccuracy: 92.1,
        noiseReduction: 87.3
      }
    },
    semiSupervised: {
      icon: Puzzle,
      color: 'from-purple-500 to-violet-600',
      borderColor: 'border-purple-500/50',
      title: 'Semi-Supervised Learning',
      description: 'Learn from limited labeled + abundant unlabeled data',
      accuracy: 96.1,
      status: 'active',
      useCase: 'Threat Intelligence & Risk Assessment',
      algorithm: 'Label Propagation + Co-Training',
      dataSize: '100K labeled + 800K unlabeled',
      features: [
        'Threat category expansion',
        'Risk score calibration',
        'Domain expertise integration',
        'Continuous learning adaptation'
      ],
      performance: {
        labelAccuracy: 96.1,
        coverageIncrease: 340,
        confidenceScore: 91.8,
        adaptationRate: 88.4
      }
    },
    selfSupervised: {
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-500/50',
      title: 'Self-Supervised Learning',
      description: 'Extract supervision signals from data structure itself',
      accuracy: 95.7,
      status: 'optimizing',
      useCase: 'Behavioral Analysis & Pattern Recognition',
      algorithm: 'Transformer + Contrastive Learning',
      dataSize: '2M raw sequences',
      features: [
        'Command sequence modeling',
        'User behavior embedding',
        'Temporal pattern analysis',
        'Context-aware representation'
      ],
      performance: {
        representationQuality: 95.7,
        downstreamAccuracy: 93.2,
        transferability: 89.6,
        robustness: 91.4
      }
    },
    reinforcement: {
      icon: Gamepad2,
      color: 'from-pink-500 to-rose-600',
      borderColor: 'border-pink-500/50',
      title: 'Reinforcement Learning',
      description: 'Learn optimal actions through trial and error',
      accuracy: 98.3,
      status: 'active',
      useCase: 'Adaptive Response & Decision Making',
      algorithm: 'Deep Q-Network + Policy Gradient',
      dataSize: '500K episodes',
      features: [
        'Dynamic threat response',
        'Adaptive firewall rules',
        'Training path optimization',
        'Resource allocation'
      ],
      performance: {
        rewardOptimization: 98.3,
        convergenceRate: 94.7,
        explorationEfficiency: 92.8,
        stabilityScore: 96.2
      }
    }
  };

  const current = paradigms[selectedParadigm as keyof typeof paradigms];
  const Icon = current.icon;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'training': return 'bg-blue-500/20 text-blue-400';
      case 'optimizing': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'training': return <Brain className="h-4 w-4 animate-pulse" />;
      case 'optimizing': return <Pause className="h-4 w-4" />;
      default: return <Pause className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Paradigm Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {Object.entries(paradigms).map(([key, paradigm]) => {
          const ParadigmIcon = paradigm.icon;
          const isSelected = selectedParadigm === key;
          
          return (
            <button
              key={key}
              onClick={() => setSelectedParadigm(key)}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-br ${paradigm.color} ${paradigm.borderColor} transform scale-105 shadow-lg`
                  : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <ParadigmIcon className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
              <h3 className={`font-semibold text-xs md:text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {paradigm.title.split(' ')[0]}
              </h3>
              <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                {paradigm.accuracy}% accuracy
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Paradigm Details */}
      <div className={`bg-gradient-to-br ${current.color} p-1 rounded-xl`}>
        <div className="bg-black/80 backdrop-blur-lg p-4 md:p-8 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{current.title}</h2>
              <p className="text-white/80 text-base md:text-lg">{current.description}</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{current.accuracy}%</div>
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(current.status)}`}>
                {getStatusIcon(current.status)}
                <span className="capitalize">{current.status}</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Implementation Details */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Implementation</h3>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Use Case</h4>
                <p className="text-white/80 text-sm md:text-base">{current.useCase}</p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Algorithm</h4>
                <p className="text-white/80 text-sm md:text-base">{current.algorithm}</p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Data Size</h4>
                <p className="text-white/80 text-sm md:text-base">{current.dataSize}</p>
              </div>
            </div>

            {/* Features and Performance */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">Key Features</h3>
              
              <div className="space-y-2">
                {current.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white/80">
                    <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 p-4 rounded-lg mt-6">
                <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(current.performance).map(([metric, value]) => (
                    <div key={metric} className="text-center">
                      <div className="text-base md:text-lg font-bold text-white">{String(value)}%</div>
                      <div className="text-xs text-white/60 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Integration Flow */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-4 md:p-6 rounded-xl">
        <h3 className="text-lg md:text-xl font-bold text-white mb-6">ML System Integration Flow</h3>
        
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 overflow-x-auto">
          {['Data Ingestion', 'Preprocessing', 'Model Training', 'Inference', 'Feedback Loop'].map((step, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 min-w-0">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                {index + 1}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-white font-semibold text-sm md:text-base">{step}</div>
                <div className="text-gray-400 text-xs md:text-sm">
                  {index === 0 && '2.4M/day'}
                  {index === 1 && '< 10ms'}
                  {index === 2 && 'Continuous'}
                  {index === 3 && '< 100ms'}
                  {index === 4 && 'Real-time'}
                </div>
              </div>
              {index < 4 && (
                <div className="text-gray-400 hidden sm:block">→</div>
              )}
              {index < 4 && (
                <div className="text-gray-400 sm:hidden">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MLParadigms;
