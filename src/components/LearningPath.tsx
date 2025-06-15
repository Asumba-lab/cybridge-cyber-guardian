
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

const LearningPath = () => {
  const [currentModule, setCurrentModule] = useState(2);
  const [reviewModuleId, setReviewModuleId] = useState<number | null>(null);

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'current': return <Play className="h-6 w-6 text-cyan-400" />;
      case 'locked': return <Lock className="h-6 w-6 text-gray-500" />;
      default: return <Circle className="h-6 w-6 text-gray-500" />;
    }
  };

  // Handler for the Review button
  const handleReview = (moduleId: number) => {
    setReviewModuleId(moduleId);
  };

  // Handler to go back from review to the list
  const handleBack = () => setReviewModuleId(null);

  // Render Review View if reviewModuleId is set
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

  // Default: show learning modules
  return (
    <div className="space-y-6">
      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2">🤖 AI Recommendation</h3>
        <p className="text-gray-300 mb-4">
          Based on your performance, our reinforcement learning algorithm suggests focusing on 
          practical threat detection exercises to strengthen your analytical skills.
        </p>
        <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200">
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
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
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
    </div>
  );
};

export default LearningPath;
