
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle
} from "@/components/ui/dialog";
import { Bell, AlertTriangle, Shield, CheckCircle, Clock } from 'lucide-react';

interface Alert {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  severity: string;
}

interface AllAlertsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alerts: Alert[];
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'threat': return <AlertTriangle className="h-5 w-5 text-red-400" />;
    case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
    case 'warning': return <Shield className="h-5 w-5 text-yellow-400" />;
    default: return <Bell className="h-5 w-5 text-blue-400" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'border-l-red-500 bg-red-500/10';
    case 'medium': return 'border-l-yellow-500 bg-yellow-500/10';
    case 'low': return 'border-l-green-500 bg-green-500/10';
    default: return 'border-l-blue-500 bg-blue-500/10';
  }
};

const AllAlertsDialog: React.FC<AllAlertsDialogProps> = ({ open, onOpenChange, alerts }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 mb-2">
            <Bell className="h-5 w-5 text-cyan-400" />
            <span>All Security Alerts</span>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[68vh] overflow-y-auto px-4 pb-4">
          {alerts.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No alerts available.</div>
          ) : (
            <div className="space-y-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`border-l-4 p-4 rounded-r-lg mb-2 flex items-start space-x-3 ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm">{alert.title}</h3>
                    <p className="text-gray-400 text-xs mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {alert.timestamp instanceof Date
                          ? alert.timestamp.toLocaleString()
                          : new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogClose asChild>
          <button className="mt-4 w-full rounded-lg bg-gray-800 text-white py-2 font-semibold hover:bg-gray-700 transition">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AllAlertsDialog;
