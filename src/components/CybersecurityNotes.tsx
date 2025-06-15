import React, { useState } from "react";
import { BookOpen, PlusCircle, ChevronDown } from "lucide-react";

const defaultNotes = [
  {
    id: 1,
    title: "What is Cybersecurity?",
    content: (
      <>
        <p>
          <b>Cybersecurity</b> is the practice of protecting computers, networks, programs, and data from digital attacks or unauthorized access. It involves using various technologies, processes, and best practices to keep information and systems safe.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-cyan-100 text-[0.98rem]">
          <li><b>Confidentiality:</b> Only those who are allowed can access your data.</li>
          <li><b>Integrity:</b> Ensures information is accurate and cannot be tampered with.</li>
          <li><b>Availability:</b> Makes sure systems and data are accessible when needed.</li>
        </ul>
      </>
    ),
    tags: ["Core Concepts", "Beginner"],
  },
  {
    id: 2,
    title: "Strong Passwords & Authentication",
    content: (
      <>
        <ul className="list-decimal pl-5 mb-2 text-purple-100">
          <li>Use a password that is at least 12 characters long.</li>
          <li>Combine uppercase, lowercase, numbers, and symbols.</li>
          <li>Never reuse passwords across different websites!</li>
        </ul>
        <p>
          <b>Tip:</b> Turn on <span className="text-cyan-300">two-factor authentication (2FA)</span> for better protection.
        </p>
      </>
    ),
    tags: ["Best Practices", "Password"],
  },
  {
    id: 3,
    title: "Common Cyber Threats",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1 text-yellow-100">
          <li><b>Phishing:</b> Tricking you into giving away personal details via fake emails or messages.</li>
          <li><b>Malware:</b> Malicious software that can damage or steal your data.</li>
          <li><b>Ransomware:</b> Locks your files until you pay a ransom.</li>
          <li><b>Social Engineering:</b> Hackers manipulating people to break security procedures.</li>
        </ul>
      </>
    ),
    tags: ["Threats", "Awareness"],
  },
  {
    id: 4,
    title: "Staying Safe Online",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-1 text-green-100">
          <li>Think before you click any link or download a file.</li>
          <li>Don't share personal info with strangers online.</li>
          <li>Be cautious about what you post—once it's online, it can last forever!</li>
          <li>Check website URLs—look for <span className="text-cyan-300">https://</span> and a lock icon.</li>
        </ol>
      </>
    ),
    tags: ["Best Practices", "Online Safety"],
  },
  {
    id: 5,
    title: "What to Do if Hacked",
    content: (
      <>
        <ul className="list-decimal pl-5 mb-2 text-red-200">
          <li>Change your password immediately.</li>
          <li>Enable 2FA, if possible.</li>
          <li>Let a trusted adult, teacher, or school official know about the incident.</li>
        </ul>
        <p>
          Never be embarrassed—everyone can make mistakes. Acting quickly is the best defense!
        </p>
      </>
    ),
    tags: ["Incident Response"],
  },
  {
    id: 6,
    title: "Securing Your Mobile Devices",
    content: (
      <>
        <ul className="list-disc pl-5 mt-2 text-blue-100 space-y-1">
          <li>Always set a screen lock (PIN, password, or biometric) on your phone or tablet.</li>
          <li>Keep your operating system and apps updated to patch vulnerabilities.</li>
          <li>Only install apps from trusted sources (like the official app store).</li>
          <li>Be wary of connecting to public Wi-Fi networks—use a VPN if possible!</li>
        </ul>
      </>
    ),
    tags: ["Mobile Security", "Best Practices"],
  },
  {
    id: 7,
    title: "Staying Safe on Social Media",
    content: (
      <>
        <ul className="list-disc pl-5 text-pink-100 space-y-1">
          <li>Limit sharing personal information like your address, school, or phone number.</li>
          <li>Use privacy settings to control who sees your posts and profile.</li>
          <li>
            <b>Think before you post:</b> Could your photo or comment be used to harm you or others?
          </li>
          <li>Don’t accept friend requests from strangers.</li>
        </ul>
      </>
    ),
    tags: ["Online Safety", "Social Media"],
  },
  {
    id: 8,
    title: "Introduction to Encryption",
    content: (
      <>
        <p>
          <b>Encryption</b> is like scrambling your messages so only the person you trust can read them. It’s used to protect data as it travels across the internet.
        </p>
        <ul className="list-disc pl-5 mt-2 text-yellow-200">
          <li>
            <b>End-to-End Encryption</b> means only the sender and receiver can read the message, not even the app company.
          </li>
          <li>Look for apps and services that offer encryption for your messages and calls.</li>
        </ul>
      </>
    ),
    tags: ["Core Concepts", "Encryption"],
  },
  {
    id: 9,
    title: "Career Paths in Cybersecurity",
    content: (
      <>
        <p>
          Cybersecurity isn’t just for adults! Here are some roles you can explore if you’re interested in protecting the digital world:
        </p>
        <ul className="list-decimal pl-5 mt-2 text-purple-200 space-y-1">
          <li><b>Security Analyst:</b> Monitors and investigates threats.</li>
          <li><b>Penetration Tester:</b> Ethically hacks systems to find weaknesses.</li>
          <li><b>Incident Responder:</b> Helps organizations recover from cyber attacks.</li>
          <li><b>Security Engineer:</b> Designs and builds secure systems.</li>
        </ul>
        <p>Curious? There are free online resources and clubs to get you started!</p>
      </>
    ),
    tags: ["Careers", "Awareness"],
  },
  {
    id: 10,
    title: "Real-World Incident: The Phishing Trap",
    content: (
      <>
        <p>
          <b>Story:</b> Jamie received an email that looked like it came from their school asking them to log in to “verify” their account.
        </p>
        <ul className="list-disc pl-5 mt-2 text-red-200">
          <li>Jamie clicked the link and entered their password. The next day, their account was compromised!</li>
        </ul>
        <p>
          <b>Takeaway:</b> Always double-check email addresses and URLs. Schools will never ask for your password by email. If unsure, ask a teacher or adult for help.
        </p>
      </>
    ),
    tags: ["Stories", "Phishing"],
  },
  {
    id: 11,
    title: "Understanding Software Updates",
    content: (
      <>
        <ul className="list-disc pl-5 text-cyan-200 space-y-1">
          <li>Updates fix security “holes” (vulnerabilities) hackers can use to break in.</li>
          <li>Turn on automatic updates on your devices and apps.</li>
          <li>Restart your device once updates are installed for full protection.</li>
        </ul>
        <p>
          <b>Pro Tip:</b> Never ignore update reminders—they keep you safe from new threats!
        </p>
      </>
    ),
    tags: ["Best Practices", "Updates"],
  },
  {
    id: 12,
    title: "Cyberbullying: What to Do",
    content: (
      <>
        <ul className="list-disc pl-5 text-pink-200 space-y-1">
          <li>Never respond to hurtful messages—block the sender if possible.</li>
          <li>Save evidence (screenshots).</li>
          <li>Tell a trusted adult, parent, or teacher immediately.</li>
          <li>Most platforms have tools to report cyberbullying—use them!</li>
        </ul>
      </>
    ),
    tags: ["Online Safety", "Wellbeing"],
  },
];

const CybersecurityNotes: React.FC = () => {
  const [notes] = useState(defaultNotes);
  const [expandedNoteIds, setExpandedNoteIds] = useState<number[]>([notes[0]?.id || 1]);

  const toggleNote = (id: number) => {
    setExpandedNoteIds((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-cyan-500/30 to-purple-400/20 border border-cyan-500/20 p-6 md:p-8 rounded-2xl mb-7 flex items-center gap-3">
        <BookOpen className="text-white h-8 w-8 md:h-10 md:w-10" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Cybersecurity Notes Library</h2>
          <p className="text-gray-300 md:text-lg">
            Dive deeper into cybersecurity with these growing, easy-to-understand notes—designed just for youth!
          </p>
        </div>
      </div>
      <div className="space-y-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-black/30 border border-white/10 rounded-xl shadow transition hover:border-cyan-500/50"
          >
            <button
              className="w-full flex justify-between items-center p-5 focus:outline-none"
              onClick={() => toggleNote(note.id)}
              aria-expanded={expandedNoteIds.includes(note.id)}
            >
              <span className="text-left font-semibold text-white text-lg">{note.title}</span>
              <ChevronDown
                className={`ml-3 h-5 w-5 transition-transform ${
                  expandedNoteIds.includes(note.id) ? 'rotate-180 text-cyan-400' : 'text-gray-400'
                }`}
              />
            </button>
            {expandedNoteIds.includes(note.id) && (
              <div className="px-6 pb-5 text-gray-200 text-base">
                <div className="mb-2">{note.content}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-cyan-700/20 text-cyan-300 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <span className="inline-flex items-center gap-2 text-green-300 text-sm">
          <PlusCircle className="h-4 w-4" />
          This library will keep growing—come back for new notes and updates!
        </span>
      </div>
    </div>
  );
};

export default CybersecurityNotes;
