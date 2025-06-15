
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
      question: "Which ML paradigm excels at identifying anomalies without labeled data?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Transfer Learning"
      ],
      correct: 1,
      explanation: "Unsupervised learning finds patterns or anomalies in data without requiring labeled examples."
    },
    {
      id: 2,
      question: "A strong password should:",
      options: [
        "Contain only letters",
        "Be as short as possible",
        "Include letters, numbers, and symbols",
        "Use only your pet’s name"
      ],
      correct: 2,
      explanation: "Passwords are harder to crack when they use a mix of letters, numbers, and symbols."
    },
    {
      id: 3,
      question: "What is 'phishing' in cybersecurity?",
      options: [
        "Hacking a WiFi network",
        "Sending fake emails to steal personal info",
        "Scanning for malware",
        "Encrypting files for ransom"
      ],
      correct: 1,
      explanation: "Phishing refers to sending fraudulent emails to trick people into giving up sensitive information."
    },
    {
      id: 4,
      question: "Which layer of the OSI model does a router operate on?",
      options: [
        "Application",
        "Transport",
        "Network",
        "Physical"
      ],
      correct: 2,
      explanation: "Routers make decisions based on network addresses—Layer 3."
    },
    {
      id: 5,
      question: "Which of these is a type of malware?",
      options: [
        "Firewall",
        "Antivirus",
        "Ransomware",
        "Router"
      ],
      correct: 2,
      explanation: "Ransomware is malicious software."
    },
    {
      id: 6,
      question: "‘Two-factor authentication’ provides:",
      options: [
        "Extra security by requiring two forms of proof",
        "Only one password to log in",
        "Biometric login only",
        "A way to bypass passwords"
      ],
      correct: 0,
      explanation: "It adds an extra layer of security by needing two proofs of identity."
    },
    {
      id: 7,
      question: "Which of the following is NOT a common cyber attack?",
      options: [
        "Phishing",
        "Denial of Service",
        "Cooking",
        "Man-in-the-middle"
      ],
      correct: 2,
      explanation: "Cooking is unrelated to cyber attacks."
    },
    {
      id: 8,
      question: "What is social engineering?",
      options: [
        "Designing secure networks",
        "Using psychology to trick people into sharing info",
        "Engineering new social platforms",
        "Building firewall rules"
      ],
      correct: 1,
      explanation: "Social engineering manipulates people to gain confidential information."
    },
    {
      id: 9,
      question: "Which tool is most useful for analyzing network traffic?",
      options: [
        "Wireshark",
        "Word Processor",
        "Paint",
        "Calculator"
      ],
      correct: 0,
      explanation: "Wireshark is widely used to capture/analyze network packets."
    },
    {
      id: 10,
      question: "What is the main risk of public Wi-Fi?",
      options: [
        "Slow speeds",
        "Easier for attackers to intercept data",
        "Cheaper internet",
        "None"
      ],
      correct: 1,
      explanation: "Hackers can intercept data more easily on unsecured public networks."
    },
    {
      id: 11,
      question: "Which file extension suggests a program might be malware?",
      options: [
        ".txt",
        ".jpg",
        ".exe",
        ".mp3"
      ],
      correct: 2,
      explanation: ".exe files are executable and could contain malware."
    },
    {
      id: 12,
      question: "What should you do if you receive a suspicious email?",
      options: [
        "Click the link immediately",
        "Reply with personal data",
        "Delete or report it",
        "Forward to friends"
      ],
      correct: 2,
      explanation: "Don't interact—delete or report the suspicious email."
    },
    {
      id: 13,
      question: "Which concept best explains learning through rewards and penalties?",
      options: [
        "Unsupervised learning",
        "Reinforcement learning",
        "Semi-supervised learning",
        "Transfer learning"
      ],
      correct: 1,
      explanation: "Reinforcement learning is based on the idea of rewards and penalties."
    },
    {
      id: 14,
      question: "What does HTTPS stand for?",
      options: [
        "HyperText Transfer Protocol Secure",
        "Hyper Tool Transfer Protocol Server",
        "Hyper Terminal Transfer Processing System",
        "Hyper Transfer Text Port Security"
      ],
      correct: 0,
      explanation: "HTTPS means the web connection is encrypted and secure."
    },
    {
      id: 15,
      question: "A firewall is used to:",
      options: [
        "Heat the office",
        "Filter unauthorized network traffic",
        "Install operating systems",
        "Write code faster"
      ],
      correct: 1,
      explanation: "A firewall helps block unwanted or dangerous network traffic."
    },
    {
      id: 16,
      question: "Which is most associated with ethical hacking?",
      options: [
        "Ransomware attacks",
        "Black hat hackers",
        "Penetration testing",
        "Social media marketing"
      ],
      correct: 2,
      explanation: "Penetration testers are 'ethical hackers' probing for weaknesses to fix."
    },
    {
      id: 17,
      question: "Which protocol encrypts web traffic?",
      options: [
        "FTP",
        "HTTP",
        "HTTPS",
        "SMTP"
      ],
      correct: 2,
      explanation: "HTTPS uses SSL/TLS to encrypt communication."
    },
    {
      id: 18,
      question: "A DDoS attack aims to:",
      options: [
        "Repair web servers",
        "Overwhelm systems with requests",
        "Encrypt files",
        "Update antivirus"
      ],
      correct: 1,
      explanation: "Distributed Denial of Service attacks flood a target system."
    },
    {
      id: 19,
      question: "Which is NOT typically a feature of antivirus software?",
      options: [
        "Malware scanning",
        "Virus removal",
        "Hardware repair",
        "Quarantine of threats"
      ],
      correct: 2,
      explanation: "Antivirus can't repair hardware."
    },
    {
      id: 20,
      question: "Why is regular software updating important?",
      options: [
        "Increases hacking risk",
        "Adds vulnerabilities",
        "Fixes bugs and improves security",
        "Removes all files"
      ],
      correct: 2,
      explanation: "Updates patch vulnerabilities and improve performance."
    },
    {
      id: 21,
      question: "What does 'VPN' stand for?",
      options: [
        "Virtual Private Network",
        "Visual Private Network",
        "Very Personal Network",
        "Visual Protection Node"
      ],
      correct: 0,
      explanation: "VPNs are Virtual Private Networks."
    },
    {
      id: 22,
      question: "Which is a basic principle in keeping your data safe online?",
      options: [
        "Share passwords with friends",
        "Use the same password everywhere",
        "Use strong, unique passwords",
        "Ignore software updates"
      ],
      correct: 2,
      explanation: "Use unique, complex passwords for security."
    },
    {
      id: 23,
      question: "The main function of machine learning in cybersecurity is to:",
      options: [
        "Fix hardware automatically",
        "Detect threats or anomalies",
        "Replace software developers",
        "Write phishing emails"
      ],
      correct: 1,
      explanation: "ML helps detect unusual or malicious patterns."
    },
    {
      id: 24,
      question: "What is multi-factor authentication?",
      options: [
        "Using just a password",
        "Using multiple forms of identity verification",
        "Asking your friend",
        "Only using fingerprint"
      ],
      correct: 1,
      explanation: "Multiple steps to prove your identity = stronger security."
    },
    {
      id: 25,
      question: "A botnet is:",
      options: [
        "A friendly web bot",
        "A network of infected computers controlled remotely",
        "A website for robots",
        "A type of firewall"
      ],
      correct: 1,
      explanation: "Botnets are groups of computers hijacked by attackers."
    },
    {
      id: 26,
      question: "Which property describes good cybersecurity hygiene?",
      options: [
        "Leaving devices unlocked",
        "Installing unknown apps",
        "Locking your device and enabling updates",
        "Ignoring security warnings"
      ],
      correct: 2,
      explanation: "Secure, updated, and locked devices maintain good hygiene."
    },
    {
      id: 27,
      question: "What is a zero-day vulnerability?",
      options: [
        "A virus found on day zero",
        "A security flaw not yet fixed or known publicly",
        "A backup system",
        "Extra antivirus tool"
      ],
      correct: 1,
      explanation: "Zero-day means a vulnerability not yet patched by the vendor."
    },
    {
      id: 28,
      question: "Machine learning requires which kind of data to be most effective?",
      options: [
        "No data",
        "Large and high-quality datasets",
        "Only numbers",
        "Just photos"
      ],
      correct: 1,
      explanation: "The more and the better the data, the more useful ML becomes."
    },
    {
      id: 29,
      question: "A worm differs from a virus because:",
      options: [
        "It can't spread between computers",
        "It’s not malicious",
        "It can self-replicate without user action",
        "It improves performance"
      ],
      correct: 2,
      explanation: "A worm propagates itself; a virus usually needs user actions."
    },
    {
      id: 30,
      question: "Which of the following is best for safe browsing?",
      options: [
        "Click suspicious links",
        "Keep software updated and use HTTPS sites",
        "Turn off your firewall",
        "Share login info freely"
      ],
      correct: 1,
      explanation: "Up-to-date software and secure websites protect you while browsing."
    },
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
