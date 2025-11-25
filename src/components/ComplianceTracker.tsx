
import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertCircle, Clock, FileCheck, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ComplianceTracker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate dynamic dates for audits (recent dates)
  const generateAuditDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  const [complianceFrameworks, setComplianceFrameworks] = useState([
    {
      name: 'GDPR',
      score: 95,
      status: 'compliant',
      lastAudit: generateAuditDate(30),
      nextAudit: generateAuditDate(-90),
      requirements: 24,
      completed: 23
    },
    {
      name: 'ISO 27001',
      score: 88,
      status: 'mostly-compliant',
      lastAudit: generateAuditDate(45),
      nextAudit: generateAuditDate(-75),
      requirements: 18,
      completed: 16
    },
    {
      name: 'NIST Framework',
      score: 92,
      status: 'compliant',
      lastAudit: generateAuditDate(35),
      nextAudit: generateAuditDate(-85),
      requirements: 22,
      completed: 20
    },
    {
      name: 'PCI DSS',
      score: 78,
      status: 'needs-attention',
      lastAudit: generateAuditDate(60),
      nextAudit: generateAuditDate(-60),
      requirements: 12,
      completed: 9
    }
  ]);

  const [recentAudits, setRecentAudits] = useState([
    {
      id: 1,
      company: 'TechCorp Solutions',
      framework: 'GDPR',
      score: 96,
      date: generateAuditDate(3),
      status: 'passed',
      auditor: 'CyberAudit Pro',
      details: {
        findings: 'All data protection requirements met. Strong encryption and access controls.',
        recommendations: 'Continue monitoring data processing activities.',
        nextSteps: 'Schedule follow-up review in 6 months.'
      }
    },
    {
      id: 2,
      company: 'MedHealth Services',
      framework: 'HIPAA',
      score: 89,
      date: generateAuditDate(5),
      status: 'passed',
      auditor: 'SecureCheck Ltd',
      details: {
        findings: 'Healthcare data security measures in place. Minor documentation updates needed.',
        recommendations: 'Update incident response plan to include recent regulations.',
        nextSteps: 'Implement recommended documentation updates within 30 days.'
      }
    },
    {
      id: 3,
      company: 'FinSecure Ltd',
      framework: 'PCI DSS',
      score: 94,
      date: generateAuditDate(8),
      status: 'passed',
      auditor: 'ComplianceFirst',
      details: {
        findings: 'Payment card security controls exceed requirements. Excellent network segmentation.',
        recommendations: 'Maintain current security posture and update policies annually.',
        nextSteps: 'No immediate action required. Continue quarterly vulnerability scans.'
      }
    },
    {
      id: 4,
      company: 'RetailMax Group',
      framework: 'SOX',
      score: 72,
      date: generateAuditDate(10),
      status: 'conditional',
      auditor: 'AuditSecure Inc',
      details: {
        findings: 'Financial controls need strengthening. Access management requires improvement.',
        recommendations: 'Implement stricter access controls and enhance audit logging.',
        nextSteps: 'Address identified gaps within 60 days. Re-audit required in 90 days.'
      }
    }
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
    const refreshInterval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    
    // Update compliance frameworks with slight variations
    setComplianceFrameworks(prev => prev.map(framework => ({
      ...framework,
      score: Math.min(100, Math.max(70, framework.score + (Math.random() - 0.5) * 2)),
      lastAudit: generateAuditDate(Math.floor(Math.random() * 60) + 30),
    })));

    // Update recent audits dates
    setRecentAudits(prev => prev.map((audit, index) => ({
      ...audit,
      date: generateAuditDate(3 + index * 2),
    })));

    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

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
      {/* Real-time Status Header */}
      <div className="flex items-center justify-between bg-black/30 backdrop-blur-lg border border-white/10 p-4 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-400">Live</span>
          </div>
          <div className="text-white font-mono text-sm">
            {formatTime(currentTime)}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">
            Last updated: {formatLastUpdated(lastUpdated)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
            className="text-cyan-400 hover:text-cyan-300"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAudit(audit)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  View Report
                </Button>
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

      {/* Audit Report Dialog */}
      <Dialog open={!!selectedAudit} onOpenChange={() => setSelectedAudit(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              Audit Report - {selectedAudit?.company}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedAudit?.framework} Compliance Audit
            </DialogDescription>
          </DialogHeader>
          
          {selectedAudit && (
            <div className="space-y-6 mt-4">
              {/* Audit Overview */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-3">Audit Overview</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white ml-2">{selectedAudit.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Auditor:</span>
                    <span className="text-white ml-2">{selectedAudit.auditor}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Score:</span>
                    <span className={`ml-2 font-bold ${getScoreColor(selectedAudit.score)}`}>
                      {selectedAudit.score}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-2 inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAudit.status)}`}>
                      {getStatusIcon(selectedAudit.status)}
                      <span className="capitalize">{selectedAudit.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2">Key Findings</h4>
                <p className="text-gray-300 text-sm">{selectedAudit.details?.findings}</p>
              </div>

              {/* Recommendations */}
              <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2">Recommendations</h4>
                <p className="text-gray-300 text-sm">{selectedAudit.details?.recommendations}</p>
              </div>

              {/* Next Steps */}
              <div className="bg-black/30 p-4 rounded-lg border border-blue-500/30 border-l-4">
                <h4 className="text-blue-400 font-semibold mb-2">Next Steps</h4>
                <p className="text-gray-300 text-sm">{selectedAudit.details?.nextSteps}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedAudit(null)}>
                  Close
                </Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Download Full Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplianceTracker;
