
import React, { useState } from 'react';
import { Building, Shield, AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';
import SecurityScore from './SecurityScore';
import VulnerabilityAssessment from './VulnerabilityAssessment';
import ComplianceTracker from './ComplianceTracker';

const SMEAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const smeStats = {
    totalSMEs: 1247,
    protectedSMEs: 1156,
    highRiskSMEs: 91,
    avgSecurityScore: 78.5,
    threatsBlocked: 3429,
    complianceRate: 92.3
  };

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: Shield },
    { id: 'vulnerabilities', label: 'Vulnerability Assessment', icon: AlertTriangle },
    { id: 'compliance', label: 'Compliance Tracker', icon: Activity }
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-2 sm:px-4 md:px-0">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
          SME Security Analytics
        </h1>
        <p className="text-gray-400 text-xs sm:text-base md:text-lg">
          Comprehensive cybersecurity insights for Small & Medium Enterprises
        </p>
      </div>

      {/* SME Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-xs sm:text-sm font-medium">Total SMEs</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{smeStats.totalSMEs.toLocaleString()}</p>
              <p className="text-green-400 text-xs sm:text-sm mt-0.5 sm:mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this month
              </p>
            </div>
            <Building className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-xs sm:text-sm font-medium">Protected SMEs</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{smeStats.protectedSMEs.toLocaleString()}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">{((smeStats.protectedSMEs / smeStats.totalSMEs) * 100).toFixed(1)}% coverage</p>
            </div>
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-xs sm:text-sm font-medium">High Risk SMEs</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{smeStats.highRiskSMEs}</p>
              <p className="text-red-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Requires immediate attention</p>
            </div>
            <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-xs sm:text-sm font-medium">Avg Security Score</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{smeStats.avgSecurityScore}/100</p>
              <p className="text-green-400 text-xs sm:text-sm mt-0.5 sm:mt-1">+5.2 from last month</p>
            </div>
            <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-400 text-xs sm:text-sm font-medium">Threats Blocked</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{smeStats.threatsBlocked.toLocaleString()}</p>
              <p className="text-cyan-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Last 30 days</p>
            </div>
            <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-xs sm:text-sm font-medium">Compliance Rate</p>
              <p className="text-xl sm:text-3xl font-bold text-white">{smeStats.complianceRate}%</p>
              <p className="text-green-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Above industry avg</p>
            </div>
            <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col xs:flex-row space-y-1 xs:space-y-0 xs:space-x-1 bg-black/30 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 xs:py-3 px-2 xs:px-4 rounded-lg transition-all duration-200 text-xs xs:text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4 xs:mt-6 md:mt-8">
        {activeTab === 'overview' && <SecurityScore />}
        {activeTab === 'vulnerabilities' && <VulnerabilityAssessment />}
        {activeTab === 'compliance' && <ComplianceTracker />}
      </div>
    </div>
  );
};

export default SMEAnalytics;
