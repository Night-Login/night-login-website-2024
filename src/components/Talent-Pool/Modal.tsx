import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { 
    Member, 
    Skill, 
    dummyProjects, 
    dummyOrganizations, 
    dummyGrades 
  } from "@/data/dummy/TalentData";
  import Chips, { 
    getSkillVariant, 
    getEducationVariant, 
    getEducationLabel,
    getGradeVariant
  } from "./Chips";

interface ModalProps {
  member: Member;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ member, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("about");
  
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

  // Sample data for new sections (replace with actual data from member)
  const projects = member.projects || dummyProjects;
  const organizations = member.organizations || dummyOrganizations;
  const grades = member.grades || dummyGrades;

  // Using createPortal to render modal at the end of the document body
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-all">
      <div
        ref={modalRef}
        className="w-full max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden animate-scale-up flex flex-col md:flex-row"
      >
        {/* Left side - Profile image and details */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-red to-dark-2 relative flex flex-col">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Profile image section */}
          <div className="relative h-64 md:h-1/2">
            <Image
              src={member.photo}
              alt={`${member.name}'s profile picture`}
              className="object-cover w-full h-full"
              width={500}
              height={500}
              priority
            />
            <div className="absolute top-4 left-4">
            <Chips text={`Batch ${member.batch}`} variant="batch" size="xs" />
            </div>

            {member.isCertified && (
            <div className="absolute top-4 right-4">
                <Chips text="NL Certified" variant="nl-certified-alt" size="xs" />
            </div>
            )}
          </div>
          
          {/* Profile info */}
          <div className="p-6 flex-grow flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
            <p className="text-white/80 mb-2">{member.role}</p>
            <div className="mb-2">
                <Chips key={member.educationLevel} text={getEducationLabel(member.educationLevel)} variant={getEducationVariant(member.educationLevel)} size="md" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-white/90 text-sm font-medium mb-2">Connect</h3>
              <div className="flex space-x-3">
                <a 
                  href={`mailto:${member.email}`} 
                  className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                {member.github && (
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {member.portfolio && (
                  <a 
                    href={member.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                    aria-label="Portfolio"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            
            {/* Featured skills */}
            <div className="mt-auto">
              <h3 className="text-white/90 text-sm font-medium mb-2">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.slice(0, 3).map(skill => (
                  <span 
                    key={skill.id}
                    className="px-3 py-1 bg-white/10 text-white text-xs rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact button (mobile only) */}
          <div className="p-4 border-t border-white/10 md:hidden">
            <a 
              href={`mailto:${member.email}?subject=Night Login Talent Pool Inquiry: ${member.name}`}
              className="block w-full py-2 bg-white text-red text-center font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              Contact Now!
            </a>
          </div>
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-3/5 flex flex-col bg-white">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "about" 
                  ? "border-red text-red" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About & Skills
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "projects" 
                  ? "border-red text-red" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "organizations" 
                  ? "border-red text-red" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("organizations")}
              >
                Organizations
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "grades" 
                  ? "border-red text-red" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("grades")}
              >
                Grades
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="p-6 overflow-y-auto flex-grow" style={{ maxHeight: "calc(90vh - 130px)" }}>
            {/* About & Skills tab */}
            {activeTab === "about" && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700 whitespace-pre-line">{member.description}</p>
                </div>
                
                {/* Skills by category */}
                <div>
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
              </div>
            )}
            
            {/* Projects tab */}
            {activeTab === "projects" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
                
                <div className="space-y-6">
                  {projects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {project.image && (
                        <div className="h-48 bg-gray-100 relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full"
                            width={400}
                            height={200}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h4>
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red font-medium hover:underline inline-flex items-center"
                          >
                            View Project
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {projects.length === 0 && (
                    <p className="text-gray-500 italic">No projects available</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Organizations tab */}
            {activeTab === "organizations" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizations</h3>
                
                <div className="space-y-4">
                  {organizations.map(org => (
                    <div key={org.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="text-lg font-bold text-gray-500">{org.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">{org.name}</h4>
                        <p className="text-sm text-gray-600">{org.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{org.period}</p>
                      </div>
                    </div>
                  ))}
                  
                  {organizations.length === 0 && (
                    <p className="text-gray-500 italic">No organizations available</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Grades tab */}
            {activeTab === "grades" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
                
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Semester
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {grades.map((grade, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {grade.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              grade.grade.startsWith("A") ? "bg-green-100 text-green-800" :
                              grade.grade.startsWith("B") ? "bg-blue-100 text-blue-800" :
                              grade.grade.startsWith("C") ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {grade.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {grade.semester}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {grades.length === 0 && (
                    <p className="p-4 text-gray-500 italic">No grades available</p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="hidden md:block border-t border-gray-100">
            <div className="p-4 flex justify-between items-center">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Close
              </button>
              <a 
                href={`mailto:${member.email}?subject=Night Login Talent Pool Inquiry: ${member.name}`}
                className="px-4 py-2 bg-red text-white rounded-md hover:bg-red/90 transition-colors"
              >
                Contact Now!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;