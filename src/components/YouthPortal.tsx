
import React, { useState } from 'react';
import { Users, Trophy, BookOpen, Target, Star, ChevronRight } from 'lucide-react';
import LearningPath from './LearningPath';
import SkillAssessment from './SkillAssessment';
import Leaderboard from './Leaderboard';

const YouthPortal = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [userStats, setUserStats] = useState({
    level: 12,
    xp: 2847,
    streak: 7,
    completedModules: 23
  });

  const tabs = [
    { id: 'learning', label: 'Learning Path', icon: BookOpen },
    { id: 'assessment', label: 'Skill Assessment', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Youth Cybersecurity Portal
        </h1>
        <p className="text-gray-400 text-lg">
          Adaptive learning powered by reinforcement learning AI
        </p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 p-6 rounded-xl backdrop-blur-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-purple-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{userStats.level}</p>
            <p className="text-gray-400">Level</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-8 w-8 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">{userStats.xp.toLocaleString()}</p>
            <p className="text-gray-400">XP Points</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{userStats.streak}</p>
            <p className="text-gray-400">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">{userStats.completedModules}</p>
            <p className="text-gray-400">Modules</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-black/30 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
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
      <div className="mt-8">
        {activeTab === 'learning' && <LearningPath />}
        {activeTab === 'assessment' && <SkillAssessment />}
        {activeTab === 'leaderboard' && <Leaderboard />}
      </div>
    </div>
  );
};

export default YouthPortal;
