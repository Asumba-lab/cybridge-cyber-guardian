
import React, { useRef } from "react";
import { Download, Globe, UserCheck, Users, Settings, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sdgs = [
  {
    id: 4,
    color: "bg-yellow-400",
    icon: <UserCheck className="h-6 w-6 text-yellow-700" />,
    title: "SDG 4: Quality Education",
    description:
      "Provides accessible, gamified cybersecurity education for youth, empowering learners worldwide with knowledge and digital skills.",
  },
  {
    id: 8,
    color: "bg-pink-400",
    icon: <Users className="h-6 w-6 text-pink-800" />,
    title: "SDG 8: Decent Work & Economic Growth",
    description:
      "Protects SMEs, supports safe business innovation, and encourages growth by minimizing the risk of cyber threats.",
  },
  {
    id: 9,
    color: "bg-cyan-400",
    icon: <Settings className="h-6 w-6 text-cyan-800" />,
    title: "SDG 9: Industry, Innovation & Infrastructure",
    description:
      "Delivers cutting-edge machine learning, strengthens cyber infrastructures, and promotes resilient digital ecosystems.",
  },
  {
    id: 10,
    color: "bg-violet-400",
    icon: <Globe className="h-6 w-6 text-violet-800" />,
    title: "SDG 10: Reduced Inequalities",
    description:
      "Bridges the digital divide, making advanced cyber protection and digital literacy accessible to various communities.",
  },
  {
    id: 16,
    color: "bg-green-300",
    icon: <Shield className="h-6 w-6 text-green-800" />,
    title: "SDG 16: Peace, Justice & Strong Institutions",
    description:
      "Fosters safer digital environments for all by defending against cybercrime, boosting trust and online safety.",
  },
];

const projectImages = [
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    alt: "Laptop with code and analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    alt: "Colorful code on a monitor",
  },
];

const Presentation = () => {
  const slideRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    // Use browser print as simplest universal "download as PDF"
    if (slideRef && slideRef.current) {
      window.print();
    }
  };

  return (
    <div ref={slideRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center py-8 px-2 print:bg-white print:text-black">
      {/* Top Bar */}
      <div className="w-full max-w-3xl flex justify-end space-x-2 mb-4 print:hidden">
        <Button className="bg-cyan-500 hover:bg-cyan-400 rounded-full" onClick={handleDownloadPDF}>
          <Download className="mr-2" /> Download as PDF
        </Button>
        <Link to="/" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-cyan-300 font-medium transition">
          Home
        </Link>
      </div>

      {/* Presentation Slide Content */}
      <div className="w-full max-w-3xl bg-black/30 rounded-2xl sm:p-10 p-4 border border-white/10 shadow-lg text-white relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 md:justify-between mb-6">
          <img src={projectImages[0].src} alt={projectImages[0].alt} className="rounded-xl shadow-lg w-full md:w-1/2 object-cover aspect-video" />
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Cybridge AI: Next-Gen Cybersecurity Platform
            </h1>
            <p className="text-lg text-gray-300 font-semibold mb-2">
              Empowering youth & SMEs with AI-driven cyber defense and education—aligned with the UN Sustainable Development Goals.
            </p>
            <p className="text-sm text-gray-400 font-medium">(Full-Stack | React, ML, Tailwind, shadcn/ui)</p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="mt-6 mb-10">
          <h2 className="text-2xl font-bold mb-3 text-cyan-300">What is Cybridge AI?</h2>
          <p className="text-gray-200 text-base mb-3">
            Cybridge AI is a cybersecurity platform designed to: 
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-300 mb-3 space-y-1">
            <li>Protect Small & Medium Enterprises from real-time cyber threats.</li>
            <li>Offer gamified, adaptive cyber training to youth (using machine learning).</li>
            <li>Visualize threat data, system health, and learning progress via dynamic dashboards.</li>
            <li>Showcase all five machine learning paradigms in practical use.</li>
          </ul>
        </div>

        {/* Images Row */}
        <div className="flex gap-4 mb-10">
          <img src={projectImages[1].src} alt={projectImages[1].alt} className="rounded-xl shadow-lg w-2/3 aspect-[3/1] object-cover hidden md:block" />
          <div className="flex-1 flex flex-col justify-center">
            <span className="font-semibold text-purple-300">Powered by AI | Intuitive & Secure | For a Safer Digital Future</span>
          </div>
        </div>

        {/* Impact on SDGs */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">
            UN Sustainable Development Goals: Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sdgs.map(sdg => (
              <div key={sdg.id} className={`rounded-xl p-4 ${sdg.color} bg-opacity-30 shadow flex`}>
                <div className="mr-4">{sdg.icon}</div>
                <div>
                  <div className="text-lg font-semibold mb-1">{sdg.title}</div>
                  <div className="text-sm text-gray-900 dark:text-gray-100">{sdg.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Features/CTA */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-base text-gray-300">
            <span className="font-bold text-cyan-300">Explore:</span> 
            Real-Time Threat Detection • Youth Portal • SME Analytics • ML Pipelines
          </p>
          <p className="text-sm text-gray-400 mt-2">
            <span className="font-bold">Tip:</span> Use "Download as PDF" to share this slide or print it for offline use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
