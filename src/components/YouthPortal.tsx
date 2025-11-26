
import React, { useState } from 'react';
import { Users, Trophy, BookOpen, Target, Star, ChevronRight, Notebook } from 'lucide-react';
import LearningPath from './LearningPath';
import SkillAssessment from './SkillAssessment';
import Leaderboard from './Leaderboard';
import CybersecurityNotes from './CybersecurityNotes';
import ChallengeTrack from './ChallengeTrack';

const WEEKLY_EXERCISES_COUNT = 5;

interface WeeklyChallengeType {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  type: 'threat-detection' | 'vulnerability-scan' | 'secure-coding' | 'incident-response';
}

const YouthPortal = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [userStats, setUserStats] = useState({
    level: 12,
    xp: 2847,
    streak: 7,
    completedModules: 23,
    totalEarnedXP: 0
  });

  // Challenge Track State
  const [activeChallengeTrack, setActiveChallengeTrack] = useState<'vulnerability-scan' | 'secure-coding' | 'incident-response' | null>(null);
  const [trackProgress, setTrackProgress] = useState<{ [key: string]: string[] }>({
    'vulnerability-scan': [],
    'secure-coding': [],
    'incident-response': []
  });

  // --- Weekly Challenges State ---
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallengeType[]>([
    {
      id: 'threat-detection-1',
      title: '🎯 Threat Detection Master',
      description: 'Complete 5 threat detection exercises',
      target: 5,
      current: 0,
      xpReward: 500,
      type: 'threat-detection'
    },
    {
      id: 'vulnerability-scan-1',
      title: '🔍 Vulnerability Hunter',
      description: 'Identify 3 critical vulnerabilities',
      target: 3,
      current: 0,
      xpReward: 350,
      type: 'vulnerability-scan'
    },
    {
      id: 'secure-coding-1',
      title: '💻 Secure Code Champion',
      description: 'Fix 4 security code issues',
      target: 4,
      current: 0,
      xpReward: 400,
      type: 'secure-coding'
    },
    {
      id: 'incident-response-1',
      title: '🚨 Incident Responder',
      description: 'Handle 2 security incidents',
      target: 2,
      current: 0,
      xpReward: 300,
      type: 'incident-response'
    }
  ]);

  // --- Legacy Challenge State for Global Access ---
  const [completedExercises, setCompletedExercises] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState<number | null>(null);

  // Handler to start/resume challenge
  const handleContinueChallenge = () => {
    if (completedExercises >= WEEKLY_EXERCISES_COUNT) return;
    setActiveTab("learning");
    setChallengeIdx(completedExercises);
  };

  // Handler for completing an exercise
  const handleCompleteExercise = () => {
    setCompletedExercises((prev) => prev + 1);
    
    // Update threat detection challenge
    setWeeklyChallenges(prev => prev.map(challenge => {
      if (challenge.type === 'threat-detection' && challenge.current < challenge.target) {
        const newCurrent = challenge.current + 1;
        const isComplete = newCurrent >= challenge.target;
        
        if (isComplete) {
          // Award bonus XP
          setUserStats(prevStats => ({
            ...prevStats,
            xp: prevStats.xp + challenge.xpReward,
            totalEarnedXP: prevStats.totalEarnedXP + challenge.xpReward
          }));
        }
        
        return { ...challenge, current: newCurrent };
      }
      return challenge;
    }));
    
    setChallengeIdx((prevIdx) =>
      prevIdx !== null && prevIdx + 1 < WEEKLY_EXERCISES_COUNT ? prevIdx + 1 : null
    );
    if ((challengeIdx !== null ? challengeIdx + 1 : completedExercises + 1) >= WEEKLY_EXERCISES_COUNT) {
      setChallengeIdx(null);
    }
  };

  // Handler for completing other challenge types
  const handleChallengeProgress = (type: WeeklyChallengeType['type']) => {
    setWeeklyChallenges(prev => prev.map(challenge => {
      if (challenge.type === type && challenge.current < challenge.target) {
        const newCurrent = challenge.current + 1;
        const isComplete = newCurrent >= challenge.target;
        
        if (isComplete) {
          // Award bonus XP
          setUserStats(prevStats => ({
            ...prevStats,
            xp: prevStats.xp + challenge.xpReward,
            totalEarnedXP: prevStats.totalEarnedXP + challenge.xpReward
          }));
        }
        
        return { ...challenge, current: newCurrent };
      }
      return challenge;
    }));
  };

  // Handler for going back in challenge
  const handleBackChallenge = () => {
    setChallengeIdx(null);
  };

  // Handler to restart challenge
  const handleRestartChallenge = () => {
    setCompletedExercises(0);
  };

  // Challenge Track Handlers
  const handleStartChallengeTrack = (trackType: 'vulnerability-scan' | 'secure-coding' | 'incident-response') => {
    setActiveChallengeTrack(trackType);
    setActiveTab('challenge-track');
  };

  const handleBackFromTrack = () => {
    setActiveChallengeTrack(null);
    setActiveTab('leaderboard');
  };

  const handleCompleteTask = (trackType: string, taskId: string) => {
    // Add task to completed list
    setTrackProgress(prev => ({
      ...prev,
      [trackType]: [...prev[trackType], taskId]
    }));

    // Calculate XP reward based on task
    const xpRewards: { [key: string]: number } = {
      'vuln-1': 100, 'vuln-2': 150, 'vuln-3': 200,
      'code-1': 100, 'code-2': 150, 'code-3': 200, 'code-4': 200,
      'incident-1': 100, 'incident-2': 250
    };

    const xpReward = xpRewards[taskId] || 100;

    // Award XP
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpReward,
      totalEarnedXP: prev.totalEarnedXP + xpReward
    }));

    // Update corresponding weekly challenge
    setWeeklyChallenges(prev => prev.map(challenge => {
      if (challenge.type === trackType && challenge.current < challenge.target) {
        const newCurrent = challenge.current + 1;
        const isComplete = newCurrent >= challenge.target;
        
        if (isComplete) {
          // Award bonus XP for completing the weekly challenge
          setUserStats(prevStats => ({
            ...prevStats,
            xp: prevStats.xp + challenge.xpReward,
            totalEarnedXP: prevStats.totalEarnedXP + challenge.xpReward
          }));
        }
        
        return { ...challenge, current: newCurrent };
      }
      return challenge;
    }));
  };

  const tabs = [
    { id: 'learning', label: 'Learning Path', icon: BookOpen },
    { id: 'assessment', label: 'Skill Assessment', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'notes', label: 'Notes Library', icon: Notebook }
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-2 sm:px-4 md:px-0">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
          Youth Cybersecurity Portal
        </h1>
        <p className="text-gray-400 text-xs sm:text-base md:text-lg">
          Adaptive learning powered by reinforcement learning AI
        </p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 p-3 xs:p-4 md:p-6 rounded-xl backdrop-blur-lg">
        <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-4 md:gap-6">
          <div className="text-center">
            <div className="bg-purple-500/30 w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-1 xs:mb-2">
              <Star className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-purple-400" />
            </div>
            <p className="text-lg xs:text-xl md:text-2xl font-bold text-white">{userStats.level}</p>
            <p className="text-gray-400 text-xs xs:text-sm">Level</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500/30 w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-1 xs:mb-2">
              <Trophy className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-cyan-400" />
            </div>
            <p className="text-lg xs:text-xl md:text-2xl font-bold text-white">{userStats.xp.toLocaleString()}</p>
            <p className="text-gray-400 text-xs xs:text-sm">XP Points</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500/30 w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-1 xs:mb-2">
              <Target className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-green-400" />
            </div>
            <p className="text-lg xs:text-xl md:text-2xl font-bold text-white">{userStats.streak}</p>
            <p className="text-gray-400 text-xs xs:text-sm">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500/30 w-10 h-10 xs:w-12 xs:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-1 xs:mb-2">
              <BookOpen className="h-5 w-5 xs:h-6 xs:w-6 md:h-8 md:w-8 text-yellow-400" />
            </div>
            <p className="text-lg xs:text-xl md:text-2xl font-bold text-white">{userStats.completedModules}</p>
            <p className="text-gray-400 text-xs xs:text-sm">Modules</p>
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
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4 xs:mt-6 md:mt-8">
        {activeTab === 'learning' && (
          <LearningPath
            globalChallengeState={{
              completedExercises,
              setCompletedExercises,
              challengeIdx,
              setChallengeIdx,
              onContinueChallenge: handleContinueChallenge,
              onCompleteExercise: handleCompleteExercise,
              onBackChallenge: handleBackChallenge,
              onRestartChallenge: handleRestartChallenge,
            }}
          />
        )}
        {activeTab === 'assessment' && <SkillAssessment />}
        {activeTab === 'leaderboard' && (
          <Leaderboard
            onContinueChallenge={handleContinueChallenge}
            completedExercises={completedExercises}
            weeklyChallenges={weeklyChallenges}
            userStats={userStats}
            onChallengeProgress={handleChallengeProgress}
            onStartChallengeTrack={handleStartChallengeTrack}
            trackProgress={trackProgress}
          />
        )}
        {activeTab === 'challenge-track' && (
          <ChallengeTrack
            trackType={activeChallengeTrack}
            onBack={handleBackFromTrack}
            onCompleteTask={handleCompleteTask}
            trackProgress={trackProgress}
          />
        )}
        {activeTab === 'notes' && <CybersecurityNotes />}
      </div>
    </div>
  );
};

export default YouthPortal;
