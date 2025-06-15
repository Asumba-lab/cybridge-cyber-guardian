import React, { useState, useEffect } from 'react';
import { Bell, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import AllAlertsDialog from './AllAlertsDialog';

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'threat',
      title: 'Phishing Attempt Blocked',
      description: 'Malicious email from suspicious@fake-bank.com',
      timestamp: new Date(),
      severity: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'ML Model Updated',
      description: 'Supervised learning model retrained with 99.2% accuracy',
      timestamp: new Date(Date.now() - 300000),
      severity: 'low'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Anomaly Detected',
      description: 'Unusual traffic pattern from 192.168.1.45',
      timestamp: new Date(Date.now() - 600000),
      severity: 'medium'
    }
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: ['threat', 'success', 'warning'][Math.floor(Math.random() * 3)],
        title: [
          'New Threat Detected',
          'System Updated',
          'User Behavior Alert',
          'ML Prediction Complete'
        ][Math.floor(Math.random() * 4)],
        description: [
          'Suspicious activity detected on port 443',
          'Reinforcement learning model optimized',
          'Unusual login pattern identified',
          'Semi-supervised learning completed'
        ][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <Shield className="h-5 w-5 text-yellow-400" />;
      default: return <Bell className="h-5 w-5 text-blue-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-500/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-l-green-500 bg-green-500/10';
      default: return 'border-l-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="h-6 w-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Real-time Alerts</h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-4 rounded-r-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">{alert.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{alert.description}</p>
                <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{alert.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
          onClick={() => setDialogOpen(true)}
        >
          View All Alerts
        </button>
      </div>

      <AllAlertsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        alerts={alerts}
      />
    </div>
  );
};

export default RealTimeAlerts;
