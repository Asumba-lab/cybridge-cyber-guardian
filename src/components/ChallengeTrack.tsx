import React, { useState } from 'react';
import { Shield, Code, AlertTriangle, CheckCircle, XCircle, ArrowLeft, Trophy, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  completed: boolean;
}

interface ChallengeTrackData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tasks: Task[];
}

interface ChallengeTrackProps {
  trackType: 'vulnerability-scan' | 'secure-coding' | 'incident-response' | null;
  onBack: () => void;
  onCompleteTask: (trackType: string, taskId: string) => void;
  trackProgress: {
    [key: string]: string[];
  };
}

const ChallengeTrack: React.FC<ChallengeTrackProps> = ({ 
  trackType, 
  onBack, 
  onCompleteTask,
  trackProgress 
}) => {
  const tracks: { [key: string]: ChallengeTrackData } = {
    'vulnerability-scan': {
      id: 'vulnerability-scan',
      name: 'Vulnerability Hunter',
      description: 'Master the art of identifying and analyzing security vulnerabilities',
      icon: <Shield className="h-8 w-8" />,
      color: 'from-red-500/20 to-orange-500/20',
      tasks: [
        {
          id: 'vuln-1',
          title: 'Identify SQL Injection Vulnerability',
          description: 'Review the login form code and identify the SQL injection vulnerability in the authentication query.',
          difficulty: 'Easy',
          xpReward: 100,
          completed: false
        },
        {
          id: 'vuln-2',
          title: 'Detect Cross-Site Scripting (XSS)',
          description: 'Analyze the comment section code and find the XSS vulnerability that allows script injection.',
          difficulty: 'Medium',
          xpReward: 150,
          completed: false
        },
        {
          id: 'vuln-3',
          title: 'Discover Broken Authentication',
          description: 'Examine the session management code and identify weak authentication mechanisms.',
          difficulty: 'Hard',
          xpReward: 200,
          completed: false
        }
      ]
    },
    'secure-coding': {
      id: 'secure-coding',
      name: 'Secure Code Champion',
      description: 'Learn to write secure code and fix common security issues',
      icon: <Code className="h-8 w-8" />,
      color: 'from-blue-500/20 to-purple-500/20',
      tasks: [
        {
          id: 'code-1',
          title: 'Fix Password Storage Issue',
          description: 'Refactor the authentication code to use proper password hashing instead of plain text storage.',
          difficulty: 'Easy',
          xpReward: 100,
          completed: false
        },
        {
          id: 'code-2',
          title: 'Implement Input Validation',
          description: 'Add comprehensive input validation to prevent injection attacks in the user registration form.',
          difficulty: 'Medium',
          xpReward: 150,
          completed: false
        },
        {
          id: 'code-3',
          title: 'Secure API Endpoints',
          description: 'Implement proper authentication and authorization checks for sensitive API endpoints.',
          difficulty: 'Hard',
          xpReward: 200,
          completed: false
        },
        {
          id: 'code-4',
          title: 'Add CSRF Protection',
          description: 'Implement Cross-Site Request Forgery protection for all state-changing operations.',
          difficulty: 'Hard',
          xpReward: 200,
          completed: false
        }
      ]
    },
    'incident-response': {
      id: 'incident-response',
      name: 'Incident Responder',
      description: 'Handle security incidents and learn proper response procedures',
      icon: <AlertTriangle className="h-8 w-8" />,
      color: 'from-yellow-500/20 to-orange-500/20',
      tasks: [
        {
          id: 'incident-1',
          title: 'Respond to Phishing Attack',
          description: 'Investigate a reported phishing email and take appropriate containment measures.',
          difficulty: 'Easy',
          xpReward: 100,
          completed: false
        },
        {
          id: 'incident-2',
          title: 'Handle Data Breach',
          description: 'Follow incident response procedures for a detected data breach including containment and notification.',
          difficulty: 'Hard',
          xpReward: 250,
          completed: false
        }
      ]
    }
  };

  if (!trackType || !tracks[trackType]) {
    return null;
  }

  const track = tracks[trackType];
  const completedTasks = trackProgress[trackType] || [];
  
  // Update task completion status based on progress
  const tasksWithProgress = track.tasks.map(task => ({
    ...task,
    completed: completedTasks.includes(task.id)
  }));

  const totalTasks = tasksWithProgress.length;
  const completedCount = tasksWithProgress.filter(t => t.completed).length;
  const progressPercent = (completedCount / totalTasks) * 100;
  const totalXP = tasksWithProgress.reduce((sum, task) => sum + task.xpReward, 0);
  const earnedXP = tasksWithProgress.filter(t => t.completed).reduce((sum, task) => sum + task.xpReward, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleTaskComplete = (taskId: string) => {
    onCompleteTask(trackType, taskId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${track.color} border border-white/20 p-6 rounded-xl`}>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Leaderboard</span>
        </button>

        <div className="flex items-start space-x-4">
          <div className="bg-white/10 p-4 rounded-lg">
            {track.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{track.name}</h1>
            <p className="text-gray-300 mb-4">{track.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-black/30 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Progress</p>
                <p className="text-white text-xl font-bold">{completedCount}/{totalTasks}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">XP Earned</p>
                <p className="text-yellow-400 text-xl font-bold">{earnedXP}/{totalXP}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Completion</p>
                <p className="text-cyan-400 text-xl font-bold">{progressPercent.toFixed(0)}%</p>
              </div>
            </div>

            <div className="mt-4">
              <Progress value={progressPercent} className="h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-cyan-400" />
          <span>Challenge Tasks</span>
        </h2>

        {tasksWithProgress.map((task, index) => (
          <div
            key={task.id}
            className={`bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl transition-all duration-300 ${
              task.completed ? 'opacity-75' : 'hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  task.completed ? 'bg-green-500/20' : 'bg-gray-700'
                }`}>
                  {task.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Zap className="h-4 w-4" />
                      <span className="font-bold">+{task.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!task.completed && (
              <Button
                onClick={() => handleTaskComplete(task.id)}
                className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                Complete Task
              </Button>
            )}

            {task.completed && (
              <div className="mt-3 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-center font-medium flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Task Completed! +{task.xpReward} XP Earned</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Track Completion */}
      {completedCount === totalTasks && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 p-8 rounded-xl text-center">
          <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">🎉 Track Completed!</h2>
          <p className="text-gray-300 mb-4">
            Congratulations! You've completed all tasks in the {track.name} track.
          </p>
          <div className="bg-yellow-500/20 px-6 py-3 rounded-lg inline-block">
            <span className="text-yellow-400 font-bold text-xl">Total Earned: +{earnedXP} XP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeTrack;
