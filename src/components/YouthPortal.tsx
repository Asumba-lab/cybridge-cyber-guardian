import React, { useState, useEffect } from 'react';
import { Users, Trophy, BookOpen, Target, Star, ChevronRight, Notebook, Loader2 } from 'lucide-react';
import LearningPath from './LearningPath';
import SkillAssessment from './SkillAssessment';
import Leaderboard from './Leaderboard';
import CybersecurityNotes from './CybersecurityNotes';
import ChallengeTrack from './ChallengeTrack';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    streak: 0,
    completedModules: 0,
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
  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallengeType[]>([]);

  // --- Legacy Challenge State for Global Access ---
  const [completedExercises, setCompletedExercises] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState<number | null>(null);

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);

        // Load profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          setUserStats({
            level: profile.level,
            xp: profile.total_xp,
            streak: profile.current_streak,
            completedModules: 0,
            totalEarnedXP: profile.total_xp
          });
        }

        // Load progress
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        const completedCount = progressData?.filter(p => p.completed).length || 0;
        setUserStats(prev => ({ ...prev, completedModules: completedCount }));

        // Load weekly challenges
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        
        const { data: challengesData, error: challengesError } = await supabase
          .from('user_challenges')
          .select('*')
          .eq('user_id', user.id)
          .gte('week_start', weekStart.toISOString().split('T')[0]);

        if (challengesError) throw challengesError;

        if (challengesData && challengesData.length > 0) {
          setWeeklyChallenges(challengesData.map(c => ({
            id: c.id,
            title: c.challenge_title,
            description: `Complete ${c.target} ${c.challenge_type} tasks`,
            target: c.target,
            current: c.current_progress,
            xpReward: c.xp_reward,
            type: c.challenge_type as any
          })));
        } else {
          // Initialize default weekly challenges
          await initializeWeeklyChallenges(user.id);
        }

        // Load active challenge track
        const { data: trackData, error: trackError } = await supabase
          .from('challenge_tracks')
          .select('*')
          .eq('user_id', user.id)
          .is('completed_at', null)
          .order('started_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (trackError && trackError.code !== 'PGRST116') throw trackError;

        if (trackData) {
          setActiveChallengeTrack(trackData.track_type as any);
        }

      } catch (error) {
        console.error('Error loading user data:', error);
        toast({
          title: "Error",
          description: "Failed to load your progress. Please refresh the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [toast]);

  const initializeWeeklyChallenges = async (userId: string) => {
    const defaultChallenges = [
      { type: 'threat-detection', title: '🎯 Threat Detection Master', target: 5, xpReward: 500 },
      { type: 'vulnerability-scan', title: '🔍 Vulnerability Hunter', target: 3, xpReward: 350 },
      { type: 'secure-coding', title: '💻 Secure Code Champion', target: 4, xpReward: 400 },
      { type: 'incident-response', title: '🚨 Incident Responder', target: 2, xpReward: 300 }
    ];

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    for (const challenge of defaultChallenges) {
      await supabase.from('user_challenges').insert({
        user_id: userId,
        challenge_type: challenge.type,
        challenge_title: challenge.title,
        current_progress: 0,
        target: challenge.target,
        xp_reward: challenge.xpReward,
        completed: false,
        week_start: weekStart.toISOString().split('T')[0]
      });
    }

    const { data } = await supabase
      .from('user_challenges')
      .select('*')
      .eq('user_id', userId);

    if (data) {
      setWeeklyChallenges(data.map(c => ({
        id: c.id,
        title: c.challenge_title,
        description: `Complete ${c.target} ${c.challenge_type} tasks`,
        target: c.target,
        current: c.current_progress,
        xpReward: c.xp_reward,
        type: c.challenge_type as any
      })));
    }
  };

  // Handler to start/resume challenge
  const handleContinueChallenge = () => {
    if (completedExercises >= WEEKLY_EXERCISES_COUNT) return;
    setActiveTab("learning");
    setChallengeIdx(completedExercises);
  };

  // Handler for completing an exercise
  const handleCompleteExercise = async () => {
    if (!userId) return;

    try {
      setCompletedExercises((prev) => prev + 1);
      
      const xpGained = 50;
      const newXp = userStats.xp + xpGained;

      // Update profile in database
      await supabase
        .from('profiles')
        .update({ total_xp: newXp })
        .eq('id', userId);

      setUserStats(prev => ({
        ...prev,
        xp: newXp,
        totalEarnedXP: newXp
      }));

      // Update threat detection challenge
      const challenge = weeklyChallenges.find(c => c.type === 'threat-detection');
      if (challenge && challenge.current < challenge.target) {
        const newProgress = challenge.current + 1;
        const isCompleted = newProgress >= challenge.target;

        await supabase
          .from('user_challenges')
          .update({
            current_progress: newProgress,
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null
          })
          .eq('id', challenge.id);

        if (isCompleted) {
          const bonusXp = newXp + challenge.xpReward;
          await supabase
            .from('profiles')
            .update({ total_xp: bonusXp })
            .eq('id', userId);
          
          setUserStats(prev => ({
            ...prev,
            xp: bonusXp,
            totalEarnedXP: bonusXp
          }));

          toast({
            title: "Challenge Completed!",
            description: `+${challenge.xpReward} XP bonus earned!`,
          });
        }

        setWeeklyChallenges(prev => prev.map(c =>
          c.id === challenge.id ? { ...c, current: newProgress } : c
        ));
      }
      
      setChallengeIdx((prevIdx) =>
        prevIdx !== null && prevIdx + 1 < WEEKLY_EXERCISES_COUNT ? prevIdx + 1 : null
      );
      if ((challengeIdx !== null ? challengeIdx + 1 : completedExercises + 1) >= WEEKLY_EXERCISES_COUNT) {
        setChallengeIdx(null);
      }
    } catch (error) {
      console.error('Error completing exercise:', error);
      toast({
        title: "Error",
        description: "Failed to save progress.",
        variant: "destructive"
      });
    }
  };

  // Handler for completing other challenge types
  const handleChallengeProgress = async (type: WeeklyChallengeType['type']) => {
    if (!userId) return;

    try {
      const challenge = weeklyChallenges.find(c => c.type === type && c.current < c.target);
      if (!challenge) return;

      const newProgress = challenge.current + 1;
      const isCompleted = newProgress >= challenge.target;

      await supabase
        .from('user_challenges')
        .update({
          current_progress: newProgress,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null
        })
        .eq('id', challenge.id);

      if (isCompleted) {
        const newXp = userStats.xp + challenge.xpReward;
        await supabase
          .from('profiles')
          .update({ total_xp: newXp })
          .eq('id', userId);
        
        setUserStats(prev => ({
          ...prev,
          xp: newXp,
          totalEarnedXP: newXp
        }));

        toast({
          title: "Challenge Completed!",
          description: `+${challenge.xpReward} XP bonus earned!`,
        });
      }

      setWeeklyChallenges(prev => prev.map(c =>
        c.id === challenge.id ? { ...c, current: newProgress } : c
      ));
    } catch (error) {
      console.error('Error updating challenge:', error);
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

  // Challenge Track Handlers
  const handleStartChallengeTrack = async (trackType: 'vulnerability-scan' | 'secure-coding' | 'incident-response') => {
    if (!userId) return;

    try {
      const trackName = trackType === 'vulnerability-scan' 
        ? 'Vulnerability Hunter' 
        : trackType === 'secure-coding' 
        ? 'Secure Code Champion' 
        : 'Incident Responder';

      await supabase
        .from('challenge_tracks')
        .insert({
          user_id: userId,
          track_name: trackName,
          track_type: trackType,
          tasks: [],
          total_xp_earned: 0,
          completed_tasks: 0,
          total_tasks: 8
        });

      setActiveChallengeTrack(trackType);
      setActiveTab('challenge-track');
    } catch (error) {
      console.error('Error starting track:', error);
    }
  };

  const handleBackFromTrack = () => {
    setActiveChallengeTrack(null);
    setActiveTab('leaderboard');
  };

  const handleCompleteTask = async (trackType: string, taskId: string) => {
    if (!userId) return;

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

    try {
      // Award XP
      const newXp = userStats.xp + xpReward;
      await supabase
        .from('profiles')
        .update({ total_xp: newXp })
        .eq('id', userId);

      setUserStats(prev => ({
        ...prev,
        xp: newXp,
        totalEarnedXP: newXp
      }));

      // Update corresponding weekly challenge
      const challenge = weeklyChallenges.find(c => c.type === trackType);
      if (challenge && challenge.current < challenge.target) {
        const newProgress = challenge.current + 1;
        const isCompleted = newProgress >= challenge.target;

        await supabase
          .from('user_challenges')
          .update({
            current_progress: newProgress,
            completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null
          })
          .eq('id', challenge.id);

        if (isCompleted) {
          const bonusXp = newXp + challenge.xpReward;
          await supabase
            .from('profiles')
            .update({ total_xp: bonusXp })
            .eq('id', userId);
          
          setUserStats(prev => ({
            ...prev,
            xp: bonusXp,
            totalEarnedXP: bonusXp
          }));
        }

        setWeeklyChallenges(prev => prev.map(c =>
          c.id === challenge.id ? { ...c, current: newProgress } : c
        ));
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const tabs = [
    { id: 'learning', label: 'Learning Path', icon: BookOpen },
    { id: 'assessment', label: 'Skill Assessment', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'notes', label: 'Notes Library', icon: Notebook }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

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