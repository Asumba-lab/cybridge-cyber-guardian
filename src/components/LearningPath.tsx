import React, { useState } from 'react';
import { CheckCircle, Circle, Lock, Play, ChevronRight } from 'lucide-react';

const moduleReviews = {
  1: {
    title: 'Cybersecurity Fundamentals - Review',
    summary: "You have completed the Cybersecurity Fundamentals module! Here’s a summary of what you’ve learned:",
    keyPoints: [
      "Understand what cybersecurity means and why it’s important.",
      "Familiarity with key threat landscapes.",
      "Basic practices for personal cyber hygiene.",
    ],
    recommendations: "Proceed to the next module or revisit any key concepts if needed.",
  },
  // Add review stubs for other modules
  2: {
    title: 'Threat Detection & Analysis - Review',
    summary: "This module helped you develop foundational skills in identifying and analyzing cyber threats.",
    keyPoints: [
      "Common patterns of cyber attacks.",
      "Techniques for spotting suspicious behaviors.",
      "Tools used for threat analysis.",
    ],
    recommendations: "Continue practical exercises and case studies to strengthen your skills.",
  }
  // More reviews can be added here for other modules if desired
};

const moduleDetails = {
  1: {
    title: 'Cybersecurity Fundamentals',
    intro: "Welcome to Cybersecurity Fundamentals! Start your journey by understanding the core principles that keep information safe.",
    lessons: [
      {
        name: "What is Cybersecurity?",
        content: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks aim to access, change, or destroy sensitive information.",
      },
      {
        name: "Types of Threats",
        content: "Common threats include malware, phishing, man-in-the-middle attacks, denial-of-service, and ransomware.",
      },
      {
        name: "Best Practices",
        content: "Use strong passwords, enable two-factor authentication, and keep your software up to date.",
      },
    ],
    tip: "Finish the concepts and do the quiz to master this module!"
  },
  2: {
    title: 'Threat Detection & Analysis',
    intro: "Dive into detecting and analyzing the many threats faced online every day.",
    lessons: [
      {
        name: "Recognizing Suspicious Activity",
        content: "Learn to recognize irregular user behaviors and patterns in network traffic.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Red flags in login patterns:</b> Unusual times, locations, or devices accessing accounts can mean compromise.</li>
            <li><b>Unexpected data transfers:</b> Lots of data leaving a system suddenly may mean sensitive information is being stolen.</li>
            <li><b>Deviations from normal behavior:</b> Watch for actions that don’t match the regular habits of users or systems.</li>
          </ul>
        ),
      },
      {
        name: "Introduction to Threat Analysis Tools",
        content: "Familiarize yourself with basic tools such as antivirus programs, log analyzers, and packet sniffers.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Antivirus Software:</b> Protects against viruses and malware by scanning files and monitoring your device in real time.</li>
            <li><b>Log Analyzers:</b> Help detect attacks by searching for errors or odd activities in system records (logs).</li>
            <li><b>Packet Sniffers:</b> Examine data as it travels over a network, making it possible to spot strange or unauthorized traffic.</li>
          </ul>
        ),
      },
      {
        name: "Practical Exercise: Email Threat Simulation",
        content: "Review a series of suspicious email examples and determine if they are phishing attempts.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Check the sender:</b> Is the email address slightly different from what you expect? Scammers often use trick addresses.</li>
            <li><b>Analyze links and attachments:</b> Hover over links to see where they really go; never download files from unknown senders.</li>
            <li><b>Read the language:</b> Bad grammar, urgent language, or threats (“Act now or lose access!”) are common in phishing emails.</li>
            <li>When in doubt, ask an adult or report the message for help!</li>
          </ul>
        ),
      },
    ],
    tip: "Hands-on practice is key! Try spotting threats in real or simulated environments."
  },
  // ...you can add further modules similarly
};

const threatDetectionExercises = [
  {
    title: "Exercise 1: Suspicious Login Alert?",
    scenario: (
      <>
        <p className="mb-2">You see a login attempt to your account from "Denmark" at 3:13am, and you live in California. Your devices at home are offline at that time.</p>
        <ul className="list-disc pl-5 text-purple-200 mb-2">
          <li>Should you ignore it or investigate further?</li>
          <li>What steps should you take?</li>
        </ul>
      </>
    ),
    answer: "You should investigate further. It could be an unauthorized login. Check your account activity, change your password, and enable 2FA.",
  },
  {
    title: "Exercise 2: Strange File Download",
    scenario: (
      <>
        <p className="mb-2">Your system detects a download of a program called <span className="text-cyan-300">free_game_crack.exe</span> from an unknown website.</p>
        <ul className="list-disc pl-5 text-purple-200 mb-2">
          <li>Is this likely safe or a threat?</li>
          <li>What red flags do you notice?</li>
        </ul>
      </>
    ),
    answer: "This is likely a threat. Downloading executable files from unknown sources is risky and could lead to malware.",
  },
  {
    title: "Exercise 3: Phishy Email?",
    scenario: (
      <>
        <p className="mb-2">You get an email saying: \"Your account will be locked! Click <span className='text-cyan-200 underline'>here</span> to verify.\"</p>
        <ul className="list-disc pl-5 text-purple-200 mb-2">
          <li>How can you check if this is real?</li>
          <li>What danger signs do you see?</li>
        </ul>
      </>
    ),
    answer: "Check the sender’s address and don’t click the link. The urgent threat and suspicious link are red flags—likely phishing.",
  },
  {
    title: "Exercise 4: Rapid Data Transfer",
    scenario: (
      <>
        <p className="mb-2">You notice your computer sending out large amounts of data late at night, though you’re not using it.</p>
        <ul className="list-disc pl-5 text-purple-200 mb-2">
          <li>What might be happening?</li>
          <li>Is it normal, or a cause for concern?</li>
        </ul>
      </>
    ),
    answer: "This could be data exfiltration by malware. Disconnect from the internet and run a full antivirus scan.",
  },
  {
    title: "Exercise 5: Mystery USB Drive",
    scenario: (
      <>
        <p className="mb-2">You find a USB drive in your school’s hallway labeled ‘Top Secret Grades’.</p>
        <ul className="list-disc pl-5 text-purple-200 mb-2">
          <li>Should you plug it into your computer?</li>
          <li>What would you do instead?</li>
        </ul>
      </>
    ),
    answer: "Do NOT plug it in! It could contain malware. Give it to a teacher or administrator.",
  },
];

const LearningPath = ({
  globalChallengeState,
}: {
  globalChallengeState?: {
    completedExercises: number;
    setCompletedExercises: React.Dispatch<React.SetStateAction<number>>;
    challengeIdx: number | null;
    setChallengeIdx: React.Dispatch<React.SetStateAction<number | null>>;
    onContinueChallenge: () => void;
    onCompleteExercise: () => void;
    onBackChallenge: () => void;
    onRestartChallenge: () => void;
  }
} = {}) => {
  // If provided, use props, else fallback to local state.
  const [localCompletedExercises, setLocalCompletedExercises] = useState(0);
  const [localChallengeIdx, setLocalChallengeIdx] = useState<number | null>(null);

  // --- NEW: Module and Review State ---
  const [reviewModuleId, setReviewModuleId] = useState<number | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  const completedExercises = globalChallengeState
    ? globalChallengeState.completedExercises
    : localCompletedExercises;
  const setCompletedExercises = globalChallengeState
    ? globalChallengeState.setCompletedExercises
    : setLocalCompletedExercises;
  const challengeIdx = globalChallengeState
    ? globalChallengeState.challengeIdx
    : localChallengeIdx;
  const setChallengeIdx = globalChallengeState
    ? globalChallengeState.setChallengeIdx
    : setLocalChallengeIdx;

  // Use these handlers throughout, DO NOT REDECLARE ↓↓↓
  const handleContinueChallenge = globalChallengeState
    ? globalChallengeState.onContinueChallenge
    : () => {
        if (localCompletedExercises >= threatDetectionExercises.length) return;
        setLocalChallengeIdx(localCompletedExercises);
      };

  const handleCompleteExercise = globalChallengeState
    ? globalChallengeState.onCompleteExercise
    : () => {
        setLocalCompletedExercises((prev) => prev + 1);
        setLocalChallengeIdx((prevIdx) =>
          prevIdx !== null && prevIdx + 1 < threatDetectionExercises.length ? prevIdx + 1 : null
        );
        if (
          (localChallengeIdx !== null ? localChallengeIdx + 1 : localCompletedExercises + 1) >=
          threatDetectionExercises.length
        ) {
          setLocalChallengeIdx(null);
        }
      };

  const handleChallengeBack = globalChallengeState
    ? globalChallengeState.onBackChallenge
    : () => setLocalChallengeIdx(null);

  const handleRestartChallenge = globalChallengeState
    ? globalChallengeState.onRestartChallenge
    : () => setLocalCompletedExercises(0);

  // Handler for the Review button
  const handleReview = (moduleId: number) => {
    setReviewModuleId(moduleId);
  };

  // Handler to go back from review to the list
  const handleBack = () => setReviewModuleId(null);

  // Handler for Continue button: open structured module content
  const handleContinue = (moduleId: number) => {
    setActiveModuleId(moduleId);
  };

  // Handler to go back from module content view to the list
  const handleCloseModuleContent = () => setActiveModuleId(null);

  // --- Modules for Learning Path (RESTORED) ---
  const modules = [
    {
      id: 1,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the basics of cybersecurity and threat landscape',
      progress: 100,
      status: 'completed',
      duration: '2 hours',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Threat Detection & Analysis',
      description: 'Understand how to identify and analyze cyber threats',
      progress: 65,
      status: 'current',
      duration: '3 hours',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Machine Learning in Cybersecurity',
      description: 'Explore ML applications in threat detection',
      progress: 0,
      status: 'locked',
      duration: '4 hours',
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: 'Incident Response',
      description: 'Learn how to respond to cybersecurity incidents',
      progress: 0,
      status: 'locked',
      duration: '3 hours',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: 'Ethical Hacking',
      description: 'Understand penetration testing and vulnerability assessment',
      progress: 0,
      status: 'locked',
      duration: '5 hours',
      difficulty: 'Advanced'
    }
  ];

  // --- Helper functions for module UI (RESTORED) ---
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'current': return <Play className="h-6 w-6 text-cyan-400" />;
      case 'locked': return <Lock className="h-6 w-6 text-gray-500" />;
      default: return <Circle className="h-6 w-6 text-gray-500" />;
    }
  };

  // --- Review view
  if (reviewModuleId !== null && moduleReviews[reviewModuleId]) {
    const review = moduleReviews[reviewModuleId];
    return (
      <div className="relative animate-fade-in">
        <button
          onClick={handleBack}
          className="mb-4 inline-flex items-center text-cyan-400 hover:text-purple-400 font-medium transition-colors"
        >
          &larr; Back to Modules
        </button>
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{review.title}</h2>
          <p className="text-gray-300 mb-4">{review.summary}</p>
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Key Points Covered</h3>
            <ul className="list-disc ml-6 text-gray-200 space-y-1">
              {review.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-4 rounded-xl">
            <span className="font-medium text-purple-300">AI Recommendation:</span>
            <div className="text-gray-200 mt-1">{review.recommendations}</div>
          </div>
        </div>
      </div>
    );
  }

  // --- Module structured learning content view
  if (activeModuleId !== null && moduleDetails[activeModuleId]) {
    const detail = moduleDetails[activeModuleId];
    return (
      <div className="relative animate-fade-in">
        <button
          onClick={handleCloseModuleContent}
          className="mb-4 inline-flex items-center text-cyan-400 hover:text-purple-400 font-medium transition-colors"
        >
          &larr; Back to Modules
        </button>
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{detail.title}</h2>
          <p className="text-gray-300 mb-4">{detail.intro}</p>
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Lessons</h3>
            <ul className="space-y-3">
              {detail.lessons.map((lesson, idx) => (
                <li key={idx} className="p-4 bg-cyan-700/10 rounded-lg border border-cyan-500/20">
                  <div className="font-medium text-white">{lesson.name}</div>
                  <div className="text-gray-200">{lesson.content}</div>
                  {lesson.notes && (
                    <div className="mt-1">{lesson.notes}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-4 rounded-xl">
            <span className="font-medium text-purple-300">Tip:</span>
            <span className="text-gray-200 ml-2">{detail.tip}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- Challenge Exercise View
  if (challengeIdx !== null && challengeIdx < threatDetectionExercises.length) {
    const ex = threatDetectionExercises[challengeIdx];
    return (
      <div className="relative animate-fade-in">
        <button
          onClick={handleChallengeBack}
          className="mb-4 inline-flex items-center text-cyan-400 hover:text-purple-400 font-medium transition-colors"
        >
          &larr; Back to Challenge
        </button>
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4">{ex.title}</h2>
          <div className="mb-4">{ex.scenario}</div>
          <details className="mb-4 bg-cyan-900/20 p-3 rounded-lg border border-cyan-500/30 text-cyan-100">
            <summary className="cursor-pointer font-medium pb-1">Show suggested answer</summary>
            <div>{ex.answer}</div>
          </details>
          <button
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
            onClick={handleCompleteExercise}
          >
            {challengeIdx + 1 === threatDetectionExercises.length ? "Finish Challenge" : "Next Exercise"}
          </button>
        </div>
      </div>
    );
  }

  // --- Show congrats message after finishing challenge ---
  if (completedExercises >= threatDetectionExercises.length && challengeIdx === null) {
    return (
      <div className="relative animate-fade-in">
        <div className="bg-green-900/30 backdrop-blur-lg border border-green-500/20 p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold text-green-300 mb-2">🎉 Congratulations!</h2>
          <p className="text-lg text-gray-100 mb-4">
            You’ve completed all threat detection exercises and earned <span className="text-yellow-300 font-semibold">bonus XP!</span>
            <br />
            Keep practicing to climb the leaderboard.
          </p>
          <button
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
            onClick={handleRestartChallenge}
          >
            Restart Challenge
          </button>
        </div>
      </div>
    );
  }

  // Default: show learning modules
  return (
    <div className="space-y-6">
      {/* Youth-Friendly Cybersecurity Overview */}
      <div className="bg-gradient-to-r from-cyan-500/25 to-purple-500/25 p-6 md:p-8 rounded-2xl border border-cyan-500/30 mb-2 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <span role="img" aria-label="shield">🛡️</span>
          What is Cybersecurity? <span className="text-base font-normal tracking-normal text-purple-200 ml-2">— For Youth</span>
        </h2>
        <p className="text-gray-200 mb-3 text-[1.08rem]">
          <b>Cybersecurity</b> is how we protect computers, phones, and our online lives from people who want to steal, destroy, or mess with our personal information.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-sky-100">
          <li>
            <b>Why is it important?</b> <span className="text-gray-300">Because our world is connected—photos, chats, homework, and even games can be targeted if we’re not careful!</span>
          </li>
          <li>
            <b>The threat landscape is always changing:</b> <span className="text-gray-300">Hackers use new tricks all the time—phishing emails, fake websites, sneaky apps, and more.</span>
          </li>
          <li>
            <b>You are your own first defense!</b> <span className="text-gray-300">Simple steps make a BIG difference!</span>
          </li>
        </ul>
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold text-cyan-300 mb-1 flex items-center gap-1 text-lg"><span role="img" aria-label="checklist">✅</span> <span>Top Cyber Hygiene Tips:</span></h3>
          <ul className="list-decimal pl-6 space-y-1 text-purple-100">
            <li>Use strong, unique passwords (and don’t share them—even with friends!).</li>
            <li>Turn on <b>two-factor authentication (2FA)</b> wherever possible.</li>
            <li>Don’t click links or download files from strangers or suspicious messages.</li>
            <li>Keep your apps and devices updated—it helps block new threats.</li>
            <li>If something feels off, ask an adult or teacher before acting.</li>
          </ul>
        </div>
        <div className="mt-3 text-green-200 flex items-center gap-2">
          <span role="img" aria-label="sparkles">✨</span>
          <span>
            Remember: Good cyber habits help you, your family, and your community stay safe while having fun online!
          </span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2">🤖 AI Recommendation</h3>
        <p className="text-gray-300 mb-4">
          Based on your performance, our reinforcement learning algorithm suggests focusing on 
          practical threat detection exercises to strengthen your analytical skills.
        </p>
        <button
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
          onClick={() => handleContinue(2)}
        >
          Start Recommended Practice
        </button>
      </div>

      {/* Learning Modules */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl transition-all duration-300 hover:border-white/20 ${
              module.status === 'current' ? 'ring-2 ring-cyan-500/50' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getStatusIcon(module.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{module.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">{module.duration}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{module.description}</p>
                
                {module.status !== 'locked' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                {module.status === 'current' && (
                  <button
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                    onClick={() => handleContinue(module.id)}
                  >
                    <span>Continue</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                {module.status === 'completed' && (
                  <button
                    className="border border-green-500 text-green-400 px-4 py-2 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-all duration-200"
                    onClick={() => handleReview(module.id)}
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Challenge */}
      <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2">🎯 Weekly Challenge</h3>
        <p className="text-gray-300 mb-4">
          Complete <span className="font-bold">{threatDetectionExercises.length}</span> threat detection exercises to earn bonus XP and climb the leaderboard!
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-200"
                style={{ width: `${(completedExercises / threatDetectionExercises.length) * 100}%` }}
              />
            </div>
            <span className="text-green-400 text-sm font-medium">
              {Math.min(completedExercises, threatDetectionExercises.length)}/{threatDetectionExercises.length} Complete
            </span>
          </div>
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all duration-200 ${
              completedExercises >= threatDetectionExercises.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleContinueChallenge}
            disabled={completedExercises >= threatDetectionExercises.length}
          >
            {completedExercises >= threatDetectionExercises.length ? "Challenge Complete" : "Continue Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
