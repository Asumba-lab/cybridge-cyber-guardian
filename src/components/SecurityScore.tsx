import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

const SecurityScore = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [overallScore, setOverallScore] = useState(78.5);
  const [monthImprovement, setMonthImprovement] = useState(5.2);

  const [securityMetrics, setSecurityMetrics] = useState([
    { category: 'Network Security', score: 85, status: 'good', trend: '+5' },
    { category: 'Data Protection', score: 92, status: 'excellent', trend: '+3' },
    { category: 'Access Control', score: 78, status: 'fair', trend: '+8' },
    { category: 'Incident Response', score: 67, status: 'needs-attention', trend: '+12' },
    { category: 'Employee Training', score: 88, status: 'good', trend: '+7' },
    { category: 'Compliance', score: 94, status: 'excellent', trend: '+2' }
  ]);

  const [topSMEs, setTopSMEs] = useState([
    { name: 'TechCorp Solutions', score: 98, industry: 'Technology' },
    { name: 'MedHealth Services', score: 96, industry: 'Healthcare' },
    { name: 'FinSecure Ltd', score: 95, industry: 'Finance' },
    { name: 'EduPlatform Inc', score: 93, industry: 'Education' },
    { name: 'RetailMax Group', score: 91, industry: 'Retail' }
  ]);

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      refreshData();
    }, 30000);
    return () => clearInterval(refreshTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const refreshData = () => {
    setIsRefreshing(true);
    
    // Update overall score with small variation
    setOverallScore(prev => {
      const variation = (Math.random() - 0.5) * 2; // -1 to +1
      const newScore = Math.max(60, Math.min(95, prev + variation));
      return Math.round(newScore * 10) / 10;
    });

    // Update month improvement
    setMonthImprovement(prev => {
      const variation = (Math.random() - 0.5) * 0.5;
      const newImprovement = Math.max(0, prev + variation);
      return Math.round(newImprovement * 10) / 10;
    });

    // Update security metrics with small variations
    setSecurityMetrics(prev => prev.map(metric => {
      const scoreVariation = Math.floor((Math.random() - 0.5) * 6); // -3 to +3
      const newScore = Math.max(50, Math.min(100, metric.score + scoreVariation));
      
      const trendValue = parseInt(metric.trend.replace('+', ''));
      const trendVariation = Math.floor((Math.random() - 0.5) * 4);
      const newTrend = Math.max(0, trendValue + trendVariation);
      
      // Determine status based on score
      let status = metric.status;
      if (newScore >= 90) status = 'excellent';
      else if (newScore >= 75) status = 'good';
      else if (newScore >= 60) status = 'fair';
      else status = 'needs-attention';
      
      return {
        ...metric,
        score: newScore,
        trend: `+${newTrend}`,
        status
      };
    }));

    // Update top SMEs with small variations
    setTopSMEs(prev => {
      const updated = prev.map(sme => {
        const scoreVariation = Math.floor((Math.random() - 0.5) * 4); // -2 to +2
        const newScore = Math.max(85, Math.min(100, sme.score + scoreVariation));
        return { ...sme, score: newScore };
      });
      
      // Re-sort by score
      return updated.sort((a, b) => b.score - a.score);
    });

    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20 text-green-400';
      case 'good': return 'bg-blue-500/20 text-blue-400';
      case 'fair': return 'bg-yellow-500/20 text-yellow-400';
      case 'needs-attention': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Real-time Status Header */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-4 rounded-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">Live</span>
            </div>
            <div className="text-white font-mono text-lg">
              {formatTime(currentTime)}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Last updated: {formatLastUpdated(lastUpdated)}
            </span>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overall Security Score */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Overall Security Score</h2>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${overallScore * 2.51} 251`}
              className="text-purple-400"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{overallScore}</div>
              <div className="text-gray-400">out of 100</div>
            </div>
          </div>
        </div>
        <p className="text-gray-300">
          Your SME network security score has improved by {monthImprovement} points this month
        </p>
      </div>

      {/* Security Metrics Breakdown */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span>Security Metrics Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">{metric.category}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${getScoreColor(metric.score)}`}>
                    {metric.score}
                  </span>
                  <div className="flex items-center space-x-1 text-green-400 text-sm">
                    <TrendingUp className="h-3 w-3" />
                    <span>{metric.trend}</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${
                    metric.score >= 90
                      ? 'bg-green-500'
                      : metric.score >= 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {getStatusIcon(metric.status)}
                  <span className="capitalize">{metric.status.replace('-', ' ')}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing SMEs */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6">🏆 Top Performing SMEs</h3>
        
        <div className="space-y-3">
          {topSMEs.map((sme, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{sme.name}</h4>
                  <p className="text-gray-400 text-sm">{sme.industry}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getScoreColor(sme.score)}`}>
                  {sme.score}/100
                </div>
                <div className="text-xs text-gray-400">Security Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityScore;
