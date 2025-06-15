
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Brain, Users, Building, Activity, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 blur-3xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Cybridge AI
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Next-Generation Cybersecurity Platform Powered by Advanced Machine Learning
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          Comprehensive ML System implementing all 5 learning paradigms: Supervised, Unsupervised, 
          Semi-Supervised, Self-Supervised, and Reinforcement Learning for cyber threat prediction, 
          youth training, and SME protection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Launch Threat Dashboard
          </Link>
          <Link
            to="/ml-pipeline"
            className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-200"
          >
            Explore ML Pipeline
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:border-cyan-400/50 transition-all duration-300 group">
          <Activity className="h-12 w-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="text-xl font-semibold text-white mb-2">Real-time Threat Detection</h3>
          <p className="text-gray-400">AI-powered monitoring with instant alerts and predictive analytics</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:border-purple-400/50 transition-all duration-300 group">
          <Users className="h-12 w-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="text-xl font-semibold text-white mb-2">Youth Training Portal</h3>
          <p className="text-gray-400">Adaptive learning paths powered by reinforcement learning</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:border-green-400/50 transition-all duration-300 group">
          <Building className="h-12 w-12 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="text-xl font-semibold text-white mb-2">SME Analytics</h3>
          <p className="text-gray-400">Comprehensive security insights and vulnerability assessment</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:border-yellow-400/50 transition-all duration-300 group">
          <Brain className="h-12 w-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="text-xl font-semibold text-white mb-2">ML Pipeline</h3>
          <p className="text-gray-400">All 5 learning paradigms working in perfect harmony</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </div>
  );
};

export default HeroSection;
