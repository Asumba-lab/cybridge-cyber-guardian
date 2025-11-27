import React, { useMemo, useEffect, useState } from 'react';
import { Trophy, Medal, Star, TrendingUp, Target, Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WeeklyChallengeType {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  type: 'threat-detection' | 'vulnerability-scan' | 'secure-coding' | 'incident-response';
}

interface UserStats {
  level: number;
  xp: number;
  streak: number;
  completedModules: number;
  totalEarnedXP: number;
}

interface LeaderboardProps {
  onContinueChallenge?: () => void;
  completedExercises?: number;
  weeklyChallenges?: WeeklyChallengeType[];
  userStats?: UserStats;
  onChallengeProgress?: (type: WeeklyChallengeType['type']) => void;
  onStartChallengeTrack?: (trackType: 'vulnerability-scan' | 'secure-coding' | 'incident-response') => void;
  trackProgress?: { [key: string]: string[] };
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  onContinueChallenge,
  completedExercises = 0,
  weeklyChallenges = [],
  userStats,
  onChallengeProgress,
  onStartChallengeTrack,
  trackProgress = {},
}) => {
  const [loading, setLoading] = useState(true);
  const [realLeaderboard, setRealLeaderboard] = useState<Array<{
    rank: number;
    name: string;
    level: number;
    xp: number;
    streak: number;
    badge: string;
  }>>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, level, total_xp, current_streak')
          .order('total_xp', { ascending: false })
          .limit(50);

        if (error) throw error;

        if (data) {
          const leaderboardWithRanks = data.map((profile, index) => ({
            rank: index + 1,
            name: profile.username || 'Anonymous',
            level: profile.level,
            xp: profile.total_xp,
            streak: profile.current_streak,
            badge: profile.total_xp > 2000 ? 'Expert' : profile.total_xp > 1000 ? 'Advanced' : 'Intermediate'
          }));
          
          setRealLeaderboard(leaderboardWithRanks);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [userStats?.xp]);

  const leaderboardData = useMemo(() => {
    if (loading || realLeaderboard.length === 0) {
      return [];
    }
    return realLeaderboard;
  }, [realLeaderboard, loading]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2: return <Medal className="h-6 w-6 text-gray-300" />;
      case 3: return <Medal className="h-6 w-6 text-orange-400" />;
      default: return <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</div>;
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Expert': return 'bg-purple-500/20 text-purple-400';
      case 'Advanced': return 'bg-blue-500/20 text-blue-400';
      case 'Intermediate': return 'bg-green-500/20 text-green-400';
      case 'Beginner': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Weekly challenge variables
  const weeklyTotal = 5;
  const weeklyComplete = Math.min(completedExercises, weeklyTotal);
  const completed = weeklyComplete >= weeklyTotal;

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-white text-center mb-8">🏆 Top Performers</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No leaderboard data yet. Complete challenges to appear here!
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {/* Second Place */}
            <div className="text-center order-1">
              <div className="bg-gradient-to-br from-gray-300 to-gray-500 w-20 h-16 rounded-t-lg mx-auto mb-4 flex items-end justify-center">
                <span className="text-white font-bold text-lg pb-2">2</span>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-white font-bold">{leaderboardData[1]?.name || 'N/A'}</p>
                <p className="text-gray-400 text-sm">{leaderboardData[1]?.xp.toLocaleString() || '0'} XP</p>
              </div>
            </div>

            {/* First Place */}
            <div className="text-center order-2">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-20 h-20 rounded-t-lg mx-auto mb-4 flex items-end justify-center">
                <span className="text-white font-bold text-xl pb-2">1</span>
              </div>
              <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/50">
                <p className="text-white font-bold">{leaderboardData[0]?.name || 'N/A'}</p>
                <p className="text-yellow-400 text-sm font-semibold">{leaderboardData[0]?.xp.toLocaleString() || '0'} XP</p>
              </div>
            </div>

            {/* Third Place */}
            <div className="text-center order-3">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-12 rounded-t-lg mx-auto mb-4 flex items-end justify-center">
                <span className="text-white font-bold pb-2">3</span>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-white font-bold">{leaderboardData[2]?.name || 'N/A'}</p>
                <p className="text-gray-400 text-sm">{leaderboardData[2]?.xp.toLocaleString() || '0'} XP</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Star className="h-6 w-6 text-cyan-400" />
            <span>Global Leaderboard</span>
          </h2>
        </div>

        <div className="divide-y divide-white/10">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : leaderboardData.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No leaderboard data yet. Complete challenges to appear here!
            </div>
          ) : (
            leaderboardData.map((user) => (
              <div
                key={user.rank}
                className="p-4 transition-all duration-200 hover:bg-white/5"
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-bold text-white">
                        {user.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(user.badge)}`}>
                        {user.badge}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Level {user.level}</span>
                      <span>{user.xp.toLocaleString()} XP</span>
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{user.streak} day streak</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex-shrink-0">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${(user.xp % 1000) / 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Target className="h-6 w-6 text-cyan-400" />
            <span>Weekly Challenges</span>
          </h2>
          <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-500/30">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{userStats?.totalEarnedXP || 0} Bonus XP Earned</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weeklyChallenges.map((challenge) => {
            const progress = (challenge.current / challenge.target) * 100;
            const isComplete = challenge.current >= challenge.target;
            
            const getChallengeColor = (type: string) => {
              switch (type) {
                case 'threat-detection': return { bg: 'from-green-500/20 to-cyan-500/20', border: 'border-green-500/30', text: 'text-green-400', progress: 'bg-green-500' };
                case 'vulnerability-scan': return { bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/30', text: 'text-red-400', progress: 'bg-red-500' };
                case 'secure-coding': return { bg: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-500/30', text: 'text-blue-400', progress: 'bg-blue-500' };
                case 'incident-response': return { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', progress: 'bg-yellow-500' };
                default: return { bg: 'from-gray-500/20 to-gray-500/20', border: 'border-gray-500/30', text: 'text-gray-400', progress: 'bg-gray-500' };
              }
            };

            const colors = getChallengeColor(challenge.type);

            return (
              <div
                key={challenge.id}
                className={`bg-gradient-to-r ${colors.bg} border ${colors.border} p-6 rounded-xl transition-all duration-300 ${
                  isComplete ? 'opacity-75' : 'hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{challenge.title}</h3>
                    <p className="text-gray-300 text-sm">{challenge.description}</p>
                  </div>
                  {isComplete && (
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <Trophy className="h-5 w-5 text-green-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${colors.text} font-medium`}>
                      {challenge.current}/{challenge.target} Complete
                    </span>
                    <span className="text-yellow-400 font-bold">+{challenge.xpReward} XP</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`${colors.progress} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {!isComplete && (
                    <button
                      className={`w-full mt-3 bg-gradient-to-r ${colors.bg} border ${colors.border} text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition-all duration-200`}
                      onClick={() => {
                        if (challenge.type === 'threat-detection' && onContinueChallenge) {
                          onContinueChallenge();
                        } else if (challenge.type !== 'threat-detection' && onStartChallengeTrack) {
                          onStartChallengeTrack(challenge.type);
                        }
                      }}
                    >
                      {isComplete ? '✓ Completed' : 'Start Challenge'}
                    </button>
                  )}

                  {isComplete && (
                    <div className="mt-3 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-center font-medium">
                      ✓ Challenge Complete! +{challenge.xpReward} XP Earned
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;