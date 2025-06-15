
import React, { useState } from 'react';
import { Target, CheckCircle, X, Brain, Clock } from 'lucide-react';

const SkillAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = [
    {
      id: 1,
      question: "Which ML paradigm is best for detecting unknown cyber threats?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Semi-Supervised Learning"
      ],
      correct: 1,
      explanation: "Unsupervised learning can identify anomalies and patterns without prior labeled examples, making it ideal for detecting unknown threats."
    },
    {
      id: 2,
      question: "What is the primary advantage of reinforcement learning in cybersecurity?",
      options: [
        "Fast training speed",
        "Requires less data",
        "Adaptive decision making",
        "Simple implementation"
      ],
      correct: 2,
      explanation: "Reinforcement learning excels at making adaptive decisions based on environment feedback, crucial for dynamic threat landscapes."
    },
    {
      id: 3,
      question: "In a phishing detection system, what type of data would be most valuable?",
      options: [
        "Email content and metadata",
        "Network traffic patterns",
        "User behavioral data",
        "All of the above"
      ],
      correct: 3,
      explanation: "Comprehensive phishing detection benefits from multiple data sources including email analysis, network patterns, and user behavior."
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const level = percentage >= 80 ? 'Expert' : percentage >= 60 ? 'Intermediate' : 'Beginner';
    
    return (
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-xl text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Assessment Complete!</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-gray-400">Score</p>
            <p className="text-3xl font-bold text-white">{score}/{questions.length}</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-gray-400">Percentage</p>
            <p className="text-3xl font-bold text-cyan-400">{percentage}%</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-gray-400">Level</p>
            <p className="text-3xl font-bold text-purple-400">{level}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-white mb-2">🤖 AI Recommendation</h3>
          <p className="text-gray-300">
            {percentage >= 80 
              ? "Excellent work! Consider advancing to our machine learning specialization track."
              : percentage >= 60
              ? "Good progress! Focus on practical threat detection exercises to improve."
              : "Keep learning! Start with fundamental cybersecurity concepts and practice regularly."
            }
          </p>
        </div>

        <button
          onClick={resetAssessment}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
        >
          Take Assessment Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Skill Assessment</h2>
        </div>
        <div className="flex items-center space-x-2 text-yellow-400">
          <Clock className="h-5 w-5" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-6">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-cyan-500 bg-cyan-500/20 text-white'
                  : 'border-white/10 bg-slate-900/50 text-gray-300 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index ? 'border-cyan-500 bg-cyan-500' : 'border-gray-400'
                }`}>
                  {selectedAnswer === index && <CheckCircle className="h-4 w-4 text-white" />}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Assessment'}
        </button>
      </div>
    </div>
  );
};

export default SkillAssessment;
