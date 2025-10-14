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
  },
  3: {
    title: 'Machine Learning in Cybersecurity - Review',
    summary: "You've explored how AI and machine learning revolutionize cybersecurity threat detection and prevention.",
    keyPoints: [
      "Understanding supervised, unsupervised, and reinforcement learning paradigms.",
      "How ML models detect anomalies and predict cyber threats.",
      "Real-world applications of AI in cybersecurity defense.",
    ],
    recommendations: "Experiment with ML-based security tools and explore advanced threat prediction models.",
  },
  5: {
    title: 'Ethical Hacking - Review',
    summary: "Congratulations on completing your journey into ethical hacking and penetration testing!",
    keyPoints: [
      "Understanding the hacker mindset and attack methodologies.",
      "Hands-on experience with vulnerability assessment tools.",
      "Legal and ethical considerations in cybersecurity testing.",
    ],
    recommendations: "Practice in safe, legal environments like CTF challenges and consider pursuing certifications like CEH.",
  }
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
  3: {
    title: 'Machine Learning in Cybersecurity',
    intro: "Discover how artificial intelligence and machine learning are transforming the cybersecurity landscape, from threat detection to predictive defense systems.",
    lessons: [
      {
        name: "Introduction to ML in Security",
        content: "Machine Learning enables computers to learn from data and improve their performance without being explicitly programmed. In cybersecurity, ML helps detect threats that traditional security systems might miss.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Pattern Recognition:</b> ML algorithms can identify patterns in millions of security events that humans would miss.</li>
            <li><b>Adaptive Defense:</b> Unlike static rules, ML systems learn and adapt to new threats as they emerge.</li>
            <li><b>Speed & Scale:</b> ML can analyze vast amounts of data in real-time, providing instant threat alerts.</li>
            <li><b>Reducing False Positives:</b> Advanced ML models learn to distinguish between real threats and harmless anomalies.</li>
          </ul>
        ),
      },
      {
        name: "Supervised Learning for Threat Classification",
        content: "Supervised learning uses labeled data to train models that can classify new threats. Think of it like teaching a computer to recognize the difference between safe and malicious files by showing it thousands of examples.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Malware Detection:</b> Training models on known malware samples to identify new variants based on code patterns.</li>
            <li><b>Spam Filtering:</b> Email systems learn to recognize phishing and spam by analyzing features like sender patterns, keywords, and links.</li>
            <li><b>Network Intrusion Detection:</b> Classifying network traffic as normal or suspicious based on historical attack data.</li>
            <li><b>Real Example:</b> Antivirus software uses supervised ML to detect 99% of known malware families instantly.</li>
          </ul>
        ),
      },
      {
        name: "Unsupervised Learning for Anomaly Detection",
        content: "Unsupervised learning finds hidden patterns in data without labeled examples. It's perfect for detecting unknown threats by identifying unusual behavior.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Zero-Day Threat Detection:</b> Identifies completely new attacks by recognizing abnormal system behavior.</li>
            <li><b>User Behavior Analytics (UBA):</b> Learns normal user patterns and flags unusual activities like login from strange locations.</li>
            <li><b>Clustering Attacks:</b> Groups similar security events to identify coordinated attack campaigns.</li>
            <li><b>Example:</b> Banks use unsupervised ML to detect fraud by spotting unusual transaction patterns.</li>
          </ul>
        ),
      },
      {
        name: "Reinforcement Learning for Active Defense",
        content: "Reinforcement learning trains AI agents to make optimal security decisions through trial and error, learning from rewards and penalties.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Automated Response Systems:</b> AI agents learn the best actions to take when threats are detected (block, quarantine, alert).</li>
            <li><b>Penetration Testing Bots:</b> AI systems that learn to find vulnerabilities like a human hacker would.</li>
            <li><b>Adaptive Firewalls:</b> Firewalls that learn optimal filtering rules based on attack success/failure.</li>
            <li><b>Gaming the Attackers:</b> Creating moving target defenses that change system configurations to confuse attackers.</li>
          </ul>
        ),
      },
      {
        name: "Deep Learning and Neural Networks",
        content: "Deep learning uses neural networks inspired by the human brain to solve complex cybersecurity challenges. These multi-layered models excel at finding intricate patterns.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Advanced Malware Analysis:</b> Deep learning can analyze executable code and identify malicious intent even in obfuscated programs.</li>
            <li><b>Natural Language Processing (NLP):</b> Understanding phishing emails, analyzing security reports, and detecting social engineering attacks.</li>
            <li><b>Image Recognition:</b> Identifying fake websites, detecting CAPTCHA bypass attempts, and analyzing security camera footage.</li>
            <li><b>Behavioral Biometrics:</b> Recognizing users by typing patterns, mouse movements, and other unique behaviors.</li>
          </ul>
        ),
      },
      {
        name: "Practical Applications & Tools",
        content: "Explore real-world ML-powered security tools that professionals use to protect systems and data.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Darktrace:</b> Uses AI to detect and respond to cyber threats in real-time by learning 'normal' for every device and user.</li>
            <li><b>Cylance:</b> AI-powered antivirus that prevents malware execution before it can cause damage.</li>
            <li><b>IBM Watson for Cyber Security:</b> Processes massive amounts of security research and threat intelligence.</li>
            <li><b>Vectra AI:</b> Uses ML to detect attacker behaviors hiding in network traffic.</li>
            <li><b>Open Source Tools:</b> Try TensorFlow, scikit-learn, and PyTorch to build your own ML security models!</li>
          </ul>
        ),
      },
      {
        name: "Challenges & Limitations",
        content: "While ML is powerful, it's not perfect. Understanding limitations helps you use it effectively and avoid over-reliance.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Adversarial Attacks:</b> Hackers can trick ML models by subtly modifying malware to evade detection.</li>
            <li><b>Data Quality Issues:</b> ML models are only as good as the data they're trained on—garbage in, garbage out!</li>
            <li><b>False Positives/Negatives:</b> No model is 100% accurate; balancing sensitivity and specificity is crucial.</li>
            <li><b>Explainability:</b> Deep learning models can be "black boxes"—hard to understand why they made specific decisions.</li>
            <li><b>Resource Intensive:</b> Training sophisticated ML models requires significant computational power and expertise.</li>
          </ul>
        ),
      },
    ],
    tip: "Start experimenting with simple ML projects! Try building a spam detector or analyzing network logs with Python and scikit-learn."
  },
  5: {
    title: 'Ethical Hacking',
    intro: "Enter the world of ethical hacking—where you'll learn to think like an attacker to better defend systems. Discover penetration testing, vulnerability assessment, and the legal frameworks that guide white-hat hackers.",
    lessons: [
      {
        name: "What is Ethical Hacking?",
        content: "Ethical hacking (also called penetration testing or white-hat hacking) is the authorized practice of bypassing system security to identify vulnerabilities before malicious hackers can exploit them.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>White Hat vs. Black Hat:</b> White hats have permission and work to improve security; black hats break the law for personal gain.</li>
            <li><b>Legal Authorization:</b> ALWAYS get written permission before testing any system—unauthorized hacking is illegal!</li>
            <li><b>Ethical Code:</b> Professional ethical hackers follow strict codes of conduct and confidentiality agreements.</li>
            <li><b>Career Path:</b> Ethical hackers are in high demand, with salaries often exceeding $100,000+ per year.</li>
          </ul>
        ),
      },
      {
        name: "The Hacker Mindset",
        content: "Thinking like an attacker means being curious, persistent, and creative. You must understand how systems work and how they can fail.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Curiosity:</b> Always ask 'What if?' and 'How does this really work?'—don't accept surface-level explanations.</li>
            <li><b>Persistence:</b> Finding vulnerabilities often requires trying hundreds of approaches; never give up easily.</li>
            <li><b>Creativity:</b> Think outside the box—the best exploits often come from unexpected angles.</li>
            <li><b>Attention to Detail:</b> Small configuration errors or code bugs can lead to major security breaches.</li>
            <li><b>Documentation:</b> Professional pentesters meticulously document every finding for client reports.</li>
          </ul>
        ),
      },
      {
        name: "Reconnaissance & Information Gathering",
        content: "The first phase of any penetration test is reconnaissance—gathering as much information about the target as possible without directly attacking it.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Passive Recon:</b> Gathering public information (Google searches, social media, company websites) without touching the target.</li>
            <li><b>Active Recon:</b> Directly interacting with the target system (port scanning, service enumeration) to map the attack surface.</li>
            <li><b>OSINT (Open Source Intelligence):</b> Using publicly available data to learn about the target organization and employees.</li>
            <li><b>Tools:</b> Nmap (port scanner), Shodan (search engine for Internet-connected devices), theHarvester (email/domain gatherer).</li>
            <li><b>Social Engineering Prep:</b> Information gathered can be used to craft convincing phishing attacks.</li>
          </ul>
        ),
      },
      {
        name: "Scanning & Enumeration",
        content: "Once you've gathered initial information, the next step is to identify specific vulnerabilities in the target system through systematic scanning.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Port Scanning:</b> Identifying open ports and services running on the target (e.g., web server on port 80, SSH on port 22).</li>
            <li><b>Vulnerability Scanning:</b> Using automated tools to find known security weaknesses in software and configurations.</li>
            <li><b>Service Version Detection:</b> Determining exact software versions to search for specific exploits.</li>
            <li><b>Common Tools:</b> Nmap, Nessus, OpenVAS, Nikto (web scanner), Burp Suite (web application testing).</li>
            <li><b>Banner Grabbing:</b> Extracting information from service banners that may reveal system details.</li>
          </ul>
        ),
      },
      {
        name: "Exploitation Techniques",
        content: "Exploitation is the phase where you actually attempt to breach the system using discovered vulnerabilities. This requires deep technical knowledge and caution.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Buffer Overflow:</b> Exploiting poor memory management to execute arbitrary code on the target system.</li>
            <li><b>SQL Injection:</b> Inserting malicious SQL code into web forms to manipulate or steal database information.</li>
            <li><b>Cross-Site Scripting (XSS):</b> Injecting malicious scripts into web pages viewed by other users.</li>
            <li><b>Password Attacks:</b> Brute force, dictionary attacks, and credential stuffing to gain unauthorized access.</li>
            <li><b>Metasploit Framework:</b> The most popular exploitation framework with thousands of pre-built exploits.</li>
            <li><b>Social Engineering:</b> Manipulating people into revealing sensitive information or performing actions that compromise security.</li>
          </ul>
        ),
      },
      {
        name: "Post-Exploitation & Privilege Escalation",
        content: "After gaining initial access, ethical hackers must demonstrate the full impact by escalating privileges and maintaining access (with permission).",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Privilege Escalation:</b> Moving from limited user access to administrator/root level to show maximum potential damage.</li>
            <li><b>Lateral Movement:</b> Spreading through the network to access other systems and resources.</li>
            <li><b>Persistence Mechanisms:</b> Establishing backdoors to maintain access (immediately removed after demonstration).</li>
            <li><b>Data Exfiltration:</b> Demonstrating ability to steal sensitive information without being detected.</li>
            <li><b>Covering Tracks:</b> Understanding how attackers hide their activities (to help defenders detect them).</li>
          </ul>
        ),
      },
      {
        name: "Legal & Ethical Frameworks",
        content: "Understanding the legal boundaries and ethical responsibilities is crucial for anyone pursuing ethical hacking as a career or hobby.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Authorization is EVERYTHING:</b> Never test systems you don't own or have explicit written permission to test.</li>
            <li><b>Scope of Engagement:</b> Penetration tests have clearly defined boundaries—stay within them!</li>
            <li><b>Data Protection Laws:</b> GDPR, HIPAA, and other regulations affect how you handle discovered data.</li>
            <li><b>Responsible Disclosure:</b> When you find vulnerabilities, report them properly—don't publicize before patches are available.</li>
            <li><b>Bug Bounty Programs:</b> Legal ways to earn money finding vulnerabilities (HackerOne, Bugcrowd, Synack).</li>
            <li><b>Certifications:</b> CEH (Certified Ethical Hacker), OSCP (Offensive Security Certified Professional), GPEN.</li>
          </ul>
        ),
      },
      {
        name: "Practice Safely & Legally",
        content: "There are many legal and safe ways to develop your ethical hacking skills without breaking the law or damaging real systems.",
        notes: (
          <ul className="list-disc ml-5 text-purple-100 mt-2 text-sm space-y-1">
            <li><b>Capture The Flag (CTF) Competitions:</b> Gamified hacking challenges with legal targets (CTFtime.org, PicoCTF).</li>
            <li><b>Vulnerable Virtual Machines:</b> Practice on intentionally vulnerable systems (DVWA, Metasploitable, VulnHub).</li>
            <li><b>Online Labs:</b> Safe training environments (Hack The Box, TryHackMe, OverTheWire, PentesterLab).</li>
            <li><b>Your Own Lab:</b> Set up virtual machines on your computer using VirtualBox or VMware.</li>
            <li><b>Bug Bounties:</b> Test real companies with permission and get paid for valid findings!</li>
            <li><b>Never Practice on:</b> School networks, friends' computers, or any system without explicit permission.</li>
          </ul>
        ),
      },
    ],
    tip: "Build your own hacking lab with free virtual machines and start with beginner CTF challenges. Document everything you learn!"
  },
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
