
import React, { useState } from 'react';
import { Building, Shield, AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';
import SecurityScore from './SecurityScore';
import VulnerabilityAssessment from './VulnerabilityAssessment';
import ComplianceTracker from './ComplianceTracker';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

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

  // Security score trend data (last 6 months)
  const securityTrendData = [
    { month: 'Apr', score: 68.2 },
    { month: 'May', score: 71.5 },
    { month: 'Jun', score: 73.8 },
    { month: 'Jul', score: 75.1 },
    { month: 'Aug', score: 76.9 },
    { month: 'Sep', score: 78.5 },
  ];

  // Threats by category
  const threatCategoryData = [
    { category: 'Malware', count: 892 },
    { category: 'Phishing', count: 1245 },
    { category: 'Ransomware', count: 534 },
    { category: 'DDoS', count: 421 },
    { category: 'Data Breach', count: 337 },
  ];

  // SME distribution by security status
  const smeDistributionData = [
    { name: 'Secure', value: 856, color: '#10b981' },
    { name: 'Moderate', value: 300, color: '#f59e0b' },
    { name: 'High Risk', value: 91, color: '#ef4444' },
  ];

  // Compliance trend over time
  const complianceTrendData = [
    { month: 'Apr', compliance: 85.2, target: 90 },
    { month: 'May', compliance: 87.5, target: 90 },
    { month: 'Jun', compliance: 88.9, target: 90 },
    { month: 'Jul', compliance: 90.1, target: 90 },
    { month: 'Aug', compliance: 91.4, target: 90 },
    { month: 'Sep', compliance: 92.3, target: 90 },
  ];

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

      {/* Charts Section */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Security Score Trend */}
          <div className="bg-black/40 border border-cyan-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-cyan-400" />
              Security Score Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={securityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[60, 85]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Threats by Category */}
          <div className="bg-black/40 border border-purple-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-purple-400" />
              Threats by Category
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={threatCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SME Distribution */}
          <div className="bg-black/40 border border-green-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              SME Security Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={smeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {smeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Compliance Trend */}
          <div className="bg-black/40 border border-yellow-500/30 p-4 sm:p-6 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-yellow-400" />
              Compliance Progress
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 95]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="compliance" stroke="#eab308" fill="#eab308" fillOpacity={0.3} strokeWidth={2} />
                <Area type="monotone" dataKey="target" stroke="#10b981" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

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
