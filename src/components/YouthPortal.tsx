import React, { useState } from 'react';
import { Users, Trophy, BookOpen, Target, Star, ChevronRight, Notebook } from 'lucide-react';
import LearningPath from './LearningPath';
import SkillAssessment from './SkillAssessment';
import Leaderboard from './Leaderboard';
import CybersecurityNotes from './CybersecurityNotes';

const WEEKLY_EXERCISES_COUNT = 5;

const YouthPortal = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [userStats, setUserStats] = useState({
    level: 12,
    xp: 2847,
    streak: 7,
    completedModules: 23
  });

  // --- Weekly Challenge State for Global Access ---
  // Move these from LearningPath so both it and Leaderboard can share!
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
    setChallengeIdx((prevIdx) =>
      prevIdx !== null && prevIdx + 1 < WEEKLY_EXERCISES_COUNT ? prevIdx + 1 : null
    );
    if ((challengeIdx !== null ? challengeIdx + 1 : completedExercises + 1) >= WEEKLY_EXERCISES_COUNT) {
      setChallengeIdx(null);
    }
  };

  // Handler for going back in challenge
  const handleBackChallenge = () => {
    setChallengeIdx(null);
  };

  // Handler to restart challenge
  const handleRestartChallenge = () => {
    setCompletedExercises(0);
  };

  const tabs = [
    { id: 'learning', label: 'Learning Path', icon: BookOpen },
    { id: 'assessment', label: 'Skill Assessment', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'notes', label: 'Notes Library', icon: Notebook }
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Youth Cybersecurity Portal
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          Adaptive learning powered by reinforcement learning AI
        </p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 p-4 md:p-6 rounded-xl backdrop-blur-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center">
            <div className="bg-purple-500/30 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-white">{userStats.level}</p>
            <p className="text-gray-400 text-sm">Level</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500/30 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-6 w-6 md:h-8 md:w-8 text-cyan-400" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-white">{userStats.xp.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">XP Points</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500/30 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-white">{userStats.streak}</p>
            <p className="text-gray-400 text-sm">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500/30 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-white">{userStats.completedModules}</p>
            <p className="text-gray-400 text-sm">Modules</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-black/30 p-1 rounded-xl">
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
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium text-sm md:text-base">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6 md:mt-8">
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
          />
        )}
        {activeTab === 'notes' && <CybersecurityNotes />}
      </div>
    </div>
  );
};

export default YouthPortal;
