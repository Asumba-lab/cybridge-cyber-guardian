
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import YouthPortal from '../components/YouthPortal';
import SMEAnalytics from '../components/SMEAnalytics';
import MLPipeline from '../components/MLPipeline';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import About from './About';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/youth" element={<YouthPortal />} />
          <Route path="/sme" element={<SMEAnalytics />} />
          <Route path="/ml-pipeline" element={<MLPipeline />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default Index;
