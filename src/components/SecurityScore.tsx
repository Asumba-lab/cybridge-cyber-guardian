
import React from 'react';
import { Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const SecurityScore = () => {
  const securityMetrics = [
    { category: 'Network Security', score: 85, status: 'good', trend: '+5' },
    { category: 'Data Protection', score: 92, status: 'excellent', trend: '+3' },
    { category: 'Access Control', score: 78, status: 'fair', trend: '+8' },
    { category: 'Incident Response', score: 67, status: 'needs-attention', trend: '+12' },
    { category: 'Employee Training', score: 88, status: 'good', trend: '+7' },
    { category: 'Compliance', score: 94, status: 'excellent', trend: '+2' }
  ];

  const topSMEs = [
    { name: 'TechCorp Solutions', score: 98, industry: 'Technology' },
    { name: 'MedHealth Services', score: 96, industry: 'Healthcare' },
    { name: 'FinSecure Ltd', score: 95, industry: 'Finance' },
    { name: 'EduPlatform Inc', score: 93, industry: 'Education' },
    { name: 'RetailMax Group', score: 91, industry: 'Retail' }
  ];

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
              strokeDasharray={`${78.5 * 2.51} 251`}
              className="text-purple-400"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">78.5</div>
              <div className="text-gray-400">out of 100</div>
            </div>
          </div>
        </div>
        <p className="text-gray-300">
          Your SME network security score has improved by 5.2 points this month
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
