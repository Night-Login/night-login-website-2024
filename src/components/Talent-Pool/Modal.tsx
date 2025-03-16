import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

// Types
type Skill = {
  id: number;
  name: string;
  category: "frontend" | "backend" | "mobile" | "ai-ml" | "design" | "other";
};

type Member = {
  id: number;
  name: string;
  photo: string;
  role: string;
  batch: string;
  skills: Skill[];
  description: string;
  email: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
};

interface ModalProps {
  member: Member;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ member, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal closes
    };
  }, [isOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Group skills by category
  const skillsByCategory = member.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Function to get skill category color
  const getSkillColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800";
      case "backend":
        return "bg-purple-100 text-purple-800";
      case "mobile":
        return "bg-green-100 text-green-800";
      case "ai-ml":
        return "bg-yellow-100 text-yellow-800";
      case "design":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "frontend":
        return "Frontend Development";
      case "backend":
        return "Backend Development";
      case "mobile":
        return "Mobile Development";
      case "ai-ml":
        return "AI & Machine Learning";
      case "design":
        return "Design";
      default:
        return "Other Skills";
    }
  };

  if (!isOpen) return null;

  // Using createPortal to render modal at the end of the document body
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-all">
      <div
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden animate-scale-up"
      >
        {/* Header with close button */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-red to-dark-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end p-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 border-4 border-white rounded-full overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={`${member.name}'s profile picture`}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <p className="text-white/90">{member.role}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="absolute top-4 left-4">
            <span className="bg-dark-2 text-white text-xs px-3 py-1 rounded-full">
              Batch {member.batch}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700 whitespace-pre-line">{member.description}</p>
          </div>
          
          {/* Skills by category */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
            
            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{getCategoryLabel(category)}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span 
                        key={skill.id} 
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getSkillColor(category)}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline">{member.email}</a>
                </div>
              </div>
              
              {member.linkedin && (
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">LinkedIn</p>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">View Profile</a>
                  </div>
                </div>
              )}
              
              {member.github && (
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">GitHub</p>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">View Repositories</a>
                  </div>
                </div>
              )}
              
              {member.portfolio && (
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Portfolio</p>
                    <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">View Portfolio</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-red text-white rounded-md hover:bg-red/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;