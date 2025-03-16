import Image from "next/image";
import React from "react";

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

interface CardProps {
  member: Member;
  onClick: (member: Member) => void;
}

const Card: React.FC<CardProps> = ({ member, onClick }) => {
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

  return (
    <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col sm:flex-row cursor-pointer"
        onClick={() => onClick(member)}
    >
      {/* Left side - Large square profile image */}
      <div className="w-full sm:w-1/3 bg-gradient-to-br from-red to-dark-2 relative">
        <div className="w-full h-full">
          <Image
            src={member.photo}
            alt={`${member.name}'s profile picture`}
            className="object-cover w-full h-full"
            width={300}
            height={300}
            style={{ aspectRatio: "1/1" }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="bg-dark-2 text-white text-xs px-3 py-1 rounded-full">
              Batch {member.batch}
            </span>
          </div>
        </div>
      </div>
      
      {/* Right side - Content */}
      <div className="p-6 w-full sm:w-2/3">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
          <p className="text-red font-medium">{member.role}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{member.description}</p>
        
        {/* Skills */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span 
                key={skill.id}
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${getSkillColor(skill.category)}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Contact links */}
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <h4 className="text-xs font-semibold text-gray-500 uppercase">Connect</h4>
          <div className="flex space-x-3">
            <a 
              href={`mailto:${member.email}`} 
              className="text-gray-600 hover:text-red transition-colors"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-red transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {member.github && (
              <a 
                href={member.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-red transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {member.portfolio && (
              <a 
                href={member.portfolio} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-red transition-colors"
                aria-label="Portfolio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;