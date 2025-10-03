import React, { useState } from 'react';
import { Database, Cpu, Zap, Filter, Upload, Download, Power, Eye, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

const DataPipeline = () => {
  const [stageStates, setStageStates] = useState({
    0: true, // Data Ingestion
    1: true, // Data Processing
    2: true, // Feature Engineering
    3: true, // Model Training
    4: true  // Model Deployment
  });
  
  const [selectedLog, setSelectedLog] = useState<{source: string, logs: any[]} | null>(null);

  const pipelineStages = [
    {
      name: 'Data Ingestion',
      icon: Upload,
      status: 'active',
      throughput: '2.4M records/day',
      sources: ['Network Logs', 'Email Traffic', 'User Activity', 'System Events'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Data Processing',
      icon: Cpu,
      status: 'active', 
      throughput: '850 GB/hour',
      processes: ['Normalization', 'Feature Extraction', 'Anomaly Flagging', 'Data Validation'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Feature Engineering',
      icon: Filter,
      status: 'optimizing',
      throughput: '1.2M features/hour',
      features: ['Text Embeddings', 'Behavioral Patterns', 'Network Topology', 'Temporal Features'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      name: 'Model Training',
      icon: Zap,
      status: 'active',
      throughput: '5 models/hour',
      models: ['Supervised Models', 'Clustering Algorithms', 'Deep Networks', 'RL Agents'],
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Model Deployment',
      icon: Download,
      status: 'active',
      throughput: '< 100ms latency',
      deployments: ['REST APIs', 'Batch Processing', 'Real-time Inference', 'Edge Computing'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const dataStats = {
    totalVolume: '47.3 TB',
    dailyIngestion: '2.4M records',
    processingSpeed: '850 GB/hour',
    storageEfficiency: '78%',
    dataQuality: '96.8%',
    retentionPeriod: '2 years'
  };

  const toggleStage = (index: number) => {
    setStageStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400';
  };

  const generateMockLogs = (source: string) => {
    const timestamps = Array.from({length: 50}, (_, i) => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - i * 5);
      return date;
    });

    const logTypes = ['INFO', 'WARNING', 'ERROR', 'SUCCESS'];
    const messages = {
      'Network Logs': [
        'Connection established from 192.168.1.', 
        'Packet loss detected on interface eth0',
        'Firewall rule applied successfully',
        'SSL handshake completed',
        'Bandwidth threshold exceeded'
      ],
      'Email Traffic': [
        'Email scanned for phishing indicators',
        'Attachment quarantined - suspicious content',
        'SPF record validated',
        'DMARC policy enforced',
        'Email delivered successfully'
      ],
      'User Activity': [
        'User login attempt from new location',
        'Password changed successfully',
        'Multi-factor authentication enabled',
        'Session expired - automatic logout',
        'Profile updated'
      ],
      'System Events': [
        'System backup completed',
        'CPU usage spiked to 89%',
        'Disk space warning - 85% full',
        'Service restarted successfully',
        'Security patch applied'
      ]
    };

    return timestamps.map((time, i) => ({
      timestamp: time.toLocaleString(),
      type: logTypes[Math.floor(Math.random() * logTypes.length)],
      message: messages[source][Math.floor(Math.random() * messages[source].length)] + ` ${Math.floor(Math.random() * 255)}`,
      id: `log-${i}`
    }));
  };

  const openLogs = (source: string) => {
    setSelectedLog({
      source,
      logs: generateMockLogs(source)
    });
  };

  return (
    <div className="space-y-8">
      {/* Data Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(dataStats).map(([key, value]) => (
          <div key={key} className="bg-black/30 backdrop-blur-lg border border-white/10 p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-white">{value}</div>
            <div className="text-gray-400 text-sm capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Flow */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Database className="h-6 w-6 text-cyan-400" />
          <span>Data Pipeline Flow</span>
        </h3>

        <div className="space-y-6">
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={index} className="relative">
                {/* Pipeline Stage */}
                <div className={`bg-gradient-to-r ${stage.color} p-1 rounded-xl`}>
                  <div className="bg-black/80 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{stage.name}</h4>
                          <p className="text-white/60">{stage.throughput}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(stageStates[index])}>
                          {stageStates[index] ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          onClick={() => toggleStage(index)}
                          variant={stageStates[index] ? "destructive" : "default"}
                          size="sm"
                          className="gap-2"
                        >
                          <Power className="h-4 w-4" />
                          {stageStates[index] ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(stage.sources || stage.processes || stage.features || stage.models || stage.deployments)?.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => stage.sources && openLogs(item)}
                          className={`bg-white/10 p-3 rounded-lg text-center transition-all ${
                            stage.sources ? 'hover:bg-white/20 hover:scale-105 cursor-pointer' : ''
                          }`}
                        >
                          <div className="text-white text-sm font-medium flex items-center justify-center gap-2">
                            {item}
                            {stage.sources && <Eye className="h-3 w-3" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow to next stage */}
                {index < pipelineStages.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="text-gray-400 text-2xl">↓</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Sources */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Data Sources</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Network Traffic Logs', volume: '1.2M/day', quality: 98 },
              { name: 'Email Security Data', volume: '450K/day', quality: 97 },
              { name: 'User Behavior Analytics', volume: '890K/day', quality: 95 },
              { name: 'System Security Events', volume: '670K/day', quality: 99 },
              { name: 'Threat Intelligence Feeds', volume: '120K/day', quality: 94 }
            ].map((source, index) => (
              <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{source.name}</h4>
                  <span className="text-cyan-400 text-sm">{source.volume}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${source.quality}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{source.quality}% quality</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Processing Metrics</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Processing Speed</span>
                <span className="text-cyan-400">850 GB/hour</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Data Quality Score</span>
                <span className="text-green-400">96.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Storage Efficiency</span>
                <span className="text-purple-400">78%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Pipeline Uptime</span>
                <span className="text-yellow-400">99.7%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '99.7%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 p-4 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">System Health: Excellent</h4>
            <p className="text-gray-300 text-sm">
              All pipeline stages operating within optimal parameters. 
              Data quality and processing speeds exceed baseline requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Log Viewer Dialog */}
      <Dialog open={selectedLog !== null} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedLog?.source} - Detailed Logs</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLog(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Real-time log entries from {selectedLog?.source}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="space-y-2">
              {selectedLog?.logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    log.type === 'ERROR' ? 'bg-red-500/10 border-red-500' :
                    log.type === 'WARNING' ? 'bg-yellow-500/10 border-yellow-500' :
                    log.type === 'SUCCESS' ? 'bg-green-500/10 border-green-500' :
                    'bg-blue-500/10 border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {log.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-sm">{log.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataPipeline;
