-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  level INTEGER DEFAULT 1 NOT NULL CHECK (level > 0),
  total_xp INTEGER DEFAULT 0 NOT NULL CHECK (total_xp >= 0),
  current_streak INTEGER DEFAULT 0 NOT NULL CHECK (current_streak >= 0),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create user_progress table for module completion tracking
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  progress_percentage INTEGER DEFAULT 0 NOT NULL CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, module_id)
);

-- Create user_challenges table for weekly challenge tracking
CREATE TABLE public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_type TEXT NOT NULL,
  challenge_title TEXT NOT NULL,
  current_progress INTEGER DEFAULT 0 NOT NULL CHECK (current_progress >= 0),
  target INTEGER NOT NULL CHECK (target > 0),
  xp_reward INTEGER NOT NULL CHECK (xp_reward > 0),
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  week_start DATE NOT NULL DEFAULT CURRENT_DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create challenge_tracks table for tracking user progress on challenge tracks
CREATE TABLE public.challenge_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  track_name TEXT NOT NULL,
  track_type TEXT NOT NULL,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_xp_earned INTEGER DEFAULT 0 NOT NULL CHECK (total_xp_earned >= 0),
  completed_tasks INTEGER DEFAULT 0 NOT NULL CHECK (completed_tasks >= 0),
  total_tasks INTEGER NOT NULL CHECK (total_tasks > 0),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, track_name, track_type)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_tracks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view all profiles for leaderboard"
  ON public.profiles FOR SELECT
  USING (true);

-- RLS Policies for user_progress table
CREATE POLICY "Users can view their own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_challenges table
CREATE POLICY "Users can view their own challenges"
  ON public.user_challenges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenges"
  ON public.user_challenges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges"
  ON public.user_challenges FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for challenge_tracks table
CREATE POLICY "Users can view their own challenge tracks"
  ON public.challenge_tracks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenge tracks"
  ON public.challenge_tracks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenge tracks"
  ON public.challenge_tracks FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, level, total_xp, current_streak, last_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    1,
    0,
    0,
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update last_active timestamp
CREATE OR REPLACE FUNCTION public.update_last_active()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.last_active = NOW();
  RETURN NEW;
END;
$$;

-- Trigger to update last_active on profile updates
CREATE TRIGGER update_profiles_last_active
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_active();

-- Create indexes for performance
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_challenges_user_id ON public.user_challenges(user_id);
CREATE INDEX idx_challenge_tracks_user_id ON public.challenge_tracks(user_id);
CREATE INDEX idx_profiles_total_xp ON public.profiles(total_xp DESC);
CREATE INDEX idx_user_challenges_week_start ON public.user_challenges(week_start);