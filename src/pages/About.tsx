
import React from "react";
import { Brain, Shield, Target, Users, Globe, Lightbulb, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-about-bg-start via-about-bg-mid to-about-bg-end py-12 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12 animate-float">
        <div className="flex items-center justify-center mb-6 space-x-4">
          <Shield className="text-cyber-cyan h-16 w-16 animate-pulse-glow" />
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
            Cybridge AI
          </h1>
          <Brain className="text-cyber-purple h-16 w-16 animate-pulse-glow" />
        </div>
        <p className="text-xl sm:text-2xl text-text-accent font-semibold mb-4">
          Bridging Cybersecurity &amp; AI for a Safer Digital Future
        </p>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          An advanced, ML-powered cybersecurity platform democratizing digital safety through education, innovation, and accessible technology.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-8 bg-black/50 border-cyber-cyan/40 backdrop-blur-sm shadow-lg shadow-cyber-cyan/10">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-text-secondary space-y-4">
          <p className="text-lg leading-relaxed">
            <strong className="text-cyber-cyan">Cybridge AI</strong> is more than a cybersecurity platform—it's a movement to empower individuals and organizations with the knowledge, tools, and technologies needed to thrive in an increasingly digital world. By combining cutting-edge machine learning with accessible education, we're building bridges between complex security challenges and practical, human-centered solutions.
          </p>
          <p className="text-lg leading-relaxed">
            We believe that cybersecurity should not be a privilege reserved for large corporations with massive budgets. Instead, it should be accessible to small businesses, educational institutions, and young learners who represent the future of our digital society. Through innovation, education, and collaboration, we're making this vision a reality.
          </p>
        </CardContent>
      </Card>

      {/* Core Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-cyber-cyan/20 to-cyber-blue/20 border-cyber-cyan/40 backdrop-blur-sm hover:shadow-xl hover:shadow-cyber-cyan/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-cyber-cyan" />
              <CardTitle className="text-2xl text-cyber-cyan">Real-Time Threat Intelligence</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-text-secondary space-y-3">
            <p>
              Our ML-powered dashboard provides instant visibility into cyber threats using supervised and unsupervised learning to classify attacks, detect anomalies, and predict emerging vulnerabilities.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Live threat visualization with global mapping</li>
              <li>Automated threat classification and severity scoring</li>
              <li>Predictive analytics for proactive defense</li>
              <li>Real-time alerts and incident response guidance</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyber-purple/20 to-cyber-pink/20 border-cyber-purple/40 backdrop-blur-sm hover:shadow-xl hover:shadow-cyber-purple/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-cyber-purple" />
              <CardTitle className="text-2xl text-cyber-purple">Youth Training Portal</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-text-secondary space-y-3">
            <p>
              A gamified, adaptive learning environment that uses reinforcement learning to personalize cybersecurity education for young learners, making complex concepts engaging and accessible.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Personalized learning paths powered by AI</li>
              <li>Gamification with XP, achievements, and leaderboards</li>
              <li>Interactive challenges and skill assessments</li>
              <li>Safe, authenticated environment for young users</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyber-green/20 to-cyber-blue/20 border-cyber-green/40 backdrop-blur-sm hover:shadow-xl hover:shadow-cyber-green/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-cyber-green" />
              <CardTitle className="text-2xl text-cyber-green">SME Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-text-secondary space-y-3">
            <p>
              Comprehensive security analytics designed specifically for small and medium enterprises, providing enterprise-grade protection without the enterprise-grade complexity or cost.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Automated vulnerability assessment and prioritization</li>
              <li>Risk scoring and compliance tracking</li>
              <li>Security posture monitoring with actionable insights</li>
              <li>Cost-effective protection for limited budgets</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyber-yellow/20 to-cyber-orange/20 border-cyber-yellow/40 backdrop-blur-sm hover:shadow-xl hover:shadow-cyber-yellow/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-cyber-yellow" />
              <CardTitle className="text-2xl text-cyber-yellow">Complete ML Pipeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-text-secondary space-y-3">
            <p>
              A comprehensive implementation of all five machine learning paradigms, demonstrating how diverse AI approaches work together to create a robust cybersecurity ecosystem.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Supervised:</strong> Threat classification with labeled data</li>
              <li><strong>Unsupervised:</strong> Anomaly detection in network behavior</li>
              <li><strong>Semi-Supervised:</strong> Skill assessment with limited labels</li>
              <li><strong>Self-Supervised:</strong> User behavior modeling</li>
              <li><strong>Reinforcement:</strong> Adaptive learning and protection</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* UN SDG Alignment */}
      <Card className="mb-8 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-pink/20 border-cyber-blue/40 backdrop-blur-sm shadow-lg shadow-cyber-purple/10">
        <CardHeader>
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Globe className="h-10 w-10 text-cyber-blue" />
            <CardTitle className="text-3xl text-center bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
              Contributing to UN Sustainable Development Goals
            </CardTitle>
          </div>
          <p className="text-center text-text-secondary text-lg">
            Cybridge AI directly supports multiple UN SDGs, advancing global progress toward a more equitable, educated, and secure world.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Badge className="bg-red-600 text-white text-lg px-3 py-1 shrink-0">SDG 4</Badge>
                <div>
                  <h3 className="text-xl font-bold text-cyber-pink mb-2">Quality Education</h3>
                  <p className="text-text-secondary text-sm">
                    Our Youth Training Portal provides free, accessible cybersecurity education to learners worldwide, using adaptive AI to personalize learning experiences and ensure no one is left behind in digital literacy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge className="bg-purple-600 text-white text-lg px-3 py-1 shrink-0">SDG 8</Badge>
                <div>
                  <h3 className="text-xl font-bold text-cyber-purple mb-2">Decent Work &amp; Economic Growth</h3>
                  <p className="text-text-secondary text-sm">
                    By protecting SMEs from cyber threats and training youth in cybersecurity skills, we're fostering economic growth, creating employment opportunities, and building a skilled workforce for the digital economy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge className="bg-orange-600 text-white text-lg px-3 py-1 shrink-0">SDG 9</Badge>
                <div>
                  <h3 className="text-xl font-bold text-cyber-orange mb-2">Industry, Innovation &amp; Infrastructure</h3>
                  <p className="text-text-secondary text-sm">
                    Cybridge AI showcases cutting-edge ML integration, promoting technological innovation and building resilient digital infrastructure that can scale from individual learners to enterprise deployments.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Badge className="bg-pink-600 text-white text-lg px-3 py-1 shrink-0">SDG 10</Badge>
                <div>
                  <h3 className="text-xl font-bold text-cyber-pink mb-2">Reduced Inequalities</h3>
                  <p className="text-text-secondary text-sm">
                    By democratizing access to advanced cybersecurity tools and education, we're reducing the digital divide and ensuring that protection against cyber threats isn't limited to those who can afford expensive solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge className="bg-blue-600 text-white text-lg px-3 py-1 shrink-0">SDG 16</Badge>
                <div>
                  <h3 className="text-xl font-bold text-cyber-blue mb-2">Peace, Justice &amp; Strong Institutions</h3>
                  <p className="text-text-secondary text-sm">
                    Strong cybersecurity is fundamental to building peaceful, just societies. We empower institutions—from schools to small businesses—with tools to protect their data, operations, and stakeholders from digital threats.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge className="bg-teal-600 text-white text-lg px-3 py-1 shrink-0">SDG 17</Badge>
                <div>
                  <h3 className="text-xl font-bold text-cyber-cyan mb-2">Partnerships for the Goals</h3>
                  <p className="text-text-secondary text-sm">
                    Cybridge AI is built on open collaboration, leveraging open-source technologies and community-driven innovation to create solutions that benefit everyone, fostering global partnerships for cybersecurity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="mb-8 bg-black/50 border-cyber-purple/40 backdrop-blur-sm shadow-lg shadow-cyber-purple/10">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
            Built with Modern Technology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-cyber-cyan">Frontend</h4>
              <p className="text-text-secondary text-sm">React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide Icons</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-cyber-purple">Backend &amp; ML</h4>
              <p className="text-text-secondary text-sm">Supabase, PostgreSQL, Machine Learning Pipelines (All 5 Paradigms)</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-cyber-pink">Visualization</h4>
              <p className="text-text-secondary text-sm">Recharts, Real-time Data Streams, Interactive Dashboards</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision Statement */}
      <Card className="mb-8 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 border-cyber-cyan/40 backdrop-blur-sm shadow-lg shadow-cyber-cyan/10">
        <CardHeader>
          <div className="flex items-center justify-center space-x-3">
            <Lightbulb className="h-10 w-10 text-cyber-yellow" />
            <CardTitle className="text-3xl text-center bg-gradient-to-r from-cyber-yellow to-cyber-cyan bg-clip-text text-transparent">
              Our Vision for the Future
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-text-secondary space-y-4 text-center">
          <p className="text-lg leading-relaxed">
            We envision a world where cybersecurity is not a barrier but an enabler—where businesses of all sizes can operate confidently in the digital realm, and where young people grow up with the skills and awareness needed to navigate an increasingly connected world safely.
          </p>
          <p className="text-lg leading-relaxed">
            Through continuous innovation, education, and collaboration, Cybridge AI is helping to build this future—one learner, one business, one secure connection at a time.
          </p>
          <div className="pt-4">
            <Badge variant="outline" className="text-cyber-cyan border-cyber-cyan text-lg px-6 py-2">
              Join Us in Securing Tomorrow
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <Users className="h-8 w-8 text-cyber-cyan" />
          <p className="text-xl text-text-secondary">
            Ready to explore the platform?
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-cyber-cyan/50 transition-all duration-300 hover:scale-105"
          >
            <Shield className="h-5 w-5" />
            <span>Launch Threat Dashboard</span>
          </Link>
          <Link
            to="/youth-login"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-cyber-purple/50 transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="h-5 w-5" />
            <span>Start Learning</span>
          </Link>
        </div>
        <p className="text-text-secondary/70 text-sm italic pt-4">
          Made with innovation and purpose for next-generation cyber defense and education
        </p>
      </div>
    </div>
  </div>
);

export default About;
