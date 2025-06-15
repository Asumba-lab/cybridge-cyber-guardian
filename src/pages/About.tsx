
import React from "react";
import { Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => (
  <div className="max-w-2xl mx-auto p-4 sm:p-8 mt-8 bg-black/30 rounded-xl border border-white/10 text-white shadow-md">
    <div className="flex items-center mb-6 space-x-3">
      <Shield className="text-cyan-400 h-8 w-8" />
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        About Cybridge AI
      </h1>
    </div>
    <p className="text-gray-300 text-lg mb-6">
      <strong>Cybridge AI</strong> is an advanced cybersecurity platform designed to empower
      both young learners and small-to-medium enterprises with next-generation machine learning solutions for threat detection, training, and analytics.
    </p>
    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
      <li>
        <span className="font-semibold text-cyan-300">Real-Time Threat Dashboard:</span>
        &nbsp; Visualize and monitor cyber threats with live ML-driven analytics.
      </li>
      <li>
        <span className="font-semibold text-purple-300">Youth Training Portal:</span>
        &nbsp; Gamified adaptive learning for youth, powered by reinforcement and self-supervised learning AI.
      </li>
      <li>
        <span className="font-semibold text-green-300">SME Analytics:</span>
        &nbsp; Risk scoring, vulnerability assessment, and compliance tracking for businesses.
      </li>
      <li>
        <span className="font-semibold text-yellow-300">ML Pipeline:</span>
        &nbsp; All 5 ML paradigms (Supervised, Unsupervised, Semi-Supervised, Self-Supervised, Reinforcement) in action.
      </li>
    </ul>
    <div className="mb-6 flex items-center space-x-2">
      <Brain className="h-6 w-6 text-purple-400" />
      <span className="text-gray-400">
        Built with React, TypeScript, Tailwind, shadcn/ui, and Lucide icons.
      </span>
    </div>
    <p className="text-gray-400 text-sm mb-8">
      <span className="font-bold">UN SDG #9:</span> Promoting industry, innovation, and infrastructure through accessible cybersecurity and education.
    </p>
    <Link
      to="/"
      className="inline-block bg-cyan-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-cyan-400 transition"
    >
      Back to Home
    </Link>
  </div>
);

export default About;
