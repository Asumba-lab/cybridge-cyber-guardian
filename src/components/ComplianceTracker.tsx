
import React from 'react';
import { Activity, CheckCircle, AlertCircle, Clock, FileCheck } from 'lucide-react';

const ComplianceTracker = () => {
  const complianceFrameworks = [
    {
      name: 'GDPR',
      score: 95,
      status: 'compliant',
      lastAudit: '2024-05-15',
      nextAudit: '2024-11-15',
      requirements: 24,
      completed: 23
    },
    {
      name: 'ISO 27001',
      score: 88,
      status: 'mostly-compliant',
      lastAudit: '2024-04-20',
      nextAudit: '2024-10-20',
      requirements: 18,
      completed: 16
    },
    {
      name: 'NIST Framework',
      score: 92,
      status: 'compliant',
      lastAudit: '2024-05-01',
      nextAudit: '2024-11-01',
      requirements: 22,
      completed: 20
    },
    {
      name: 'PCI DSS',
      score: 78,
      status: 'needs-attention',
      lastAudit: '2024-03-10',
      nextAudit: '2024-09-10',
      requirements: 12,
      completed: 9
    }
  ];

  const recentAudits = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      framework: 'GDPR',
      score: 96,
      date: '2024-06-10',
      status: 'passed',
      auditor: 'CyberAudit Pro'
    },
    {
      id: 2,
      company: 'MedHealth Services',
      framework: 'HIPAA',
      score: 89,
      date: '2024-06-08',
      status: 'passed',
      auditor: 'SecureCheck Ltd'
    },
    {
      id: 3,
      company: 'FinSecure Ltd',
      framework: 'PCI DSS',
      score: 94,
      date: '2024-06-05',
      status: 'passed',
      auditor: 'ComplianceFirst'
    },
    {
      id: 4,
      company: 'RetailMax Group',
      framework: 'SOX',
      score: 72,
      date: '2024-06-03',
      status: 'conditional',
      auditor: 'AuditSecure Inc'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-400';
      case 'mostly-compliant': return 'bg-blue-500/20 text-blue-400';
      case 'needs-attention': return 'bg-yellow-500/20 text-yellow-400';
      case 'non-compliant': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
      case 'passed':
        return <CheckCircle className="h-4 w-4" />;
      case 'mostly-compliant':
      case 'conditional':
        return <Clock className="h-4 w-4" />;
      case 'needs-attention':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Overall Compliance Score */}
      <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Overall Compliance Score</h2>
        <div className="text-6xl font-bold text-green-400 mb-2">92.3%</div>
        <p className="text-gray-300">
          Your SME network maintains high compliance standards across all frameworks
        </p>
      </div>

      {/* Compliance Frameworks */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Activity className="h-6 w-6 text-cyan-400" />
          <span>Compliance Frameworks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceFrameworks.map((framework, index) => (
            <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold text-lg">{framework.name}</h4>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(framework.score)}`}>
                    {framework.score}%
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                    {getStatusIcon(framework.status)}
                    <span className="capitalize">{framework.status.replace('-', ' ')}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      framework.score >= 90
                        ? 'bg-green-500'
                        : framework.score >= 75
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${framework.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Requirements: {framework.completed}/{framework.requirements}</span>
                  <span>Progress: {Math.round((framework.completed / framework.requirements) * 100)}%</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last Audit: {framework.lastAudit}</span>
                  <span>Next: {framework.nextAudit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audits */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <FileCheck className="h-6 w-6 text-cyan-400" />
          <span>Recent Audit Results</span>
        </h3>

        <div className="space-y-3">
          {recentAudits.map((audit) => (
            <div key={audit.id} className="bg-slate-900/50 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{audit.company}</h4>
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                      {audit.framework}
                    </span>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                      {getStatusIcon(audit.status)}
                      <span className="capitalize">{audit.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Score: <span className={getScoreColor(audit.score)}>{audit.score}%</span></span>
                    <span>Date: {audit.date}</span>
                    <span>Auditor: {audit.auditor}</span>
                  </div>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-500/30 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4">⚠️ Compliance Alerts</h3>
        <div className="space-y-3">
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="text-red-400 font-semibold mb-1">Action Required</h4>
            <p className="text-gray-300 text-sm">
              PCI DSS compliance score below threshold (78%). Address payment processing 
              security gaps within 30 days to maintain certification.
            </p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="text-yellow-400 font-semibold mb-1">Upcoming Deadline</h4>
            <p className="text-gray-300 text-sm">
              ISO 27001 re-certification audit scheduled for October 20, 2024. 
              Complete remaining 2 requirements to ensure smooth renewal.
            </p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="text-blue-400 font-semibold mb-1">Recommendation</h4>
            <p className="text-gray-300 text-sm">
              Consider implementing automated compliance monitoring for continuous 
              assessment and early detection of potential issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;
