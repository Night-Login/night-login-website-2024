import React from "react";

export type ChipVariant = 
  | "default" 
  | "primary" 
  | "success" 
  | "warning" 
  | "danger" 
  | "info" 
  | "frontend" 
  | "backend"
  | "mobile"
  | "ai-ml"
  | "design"
  | "certification"
  | "nl-certified"
  | "nl-certified-alt"
  | "batch"
  | "education-bachelors"
  | "education-masters"
  | "education-doctor"
  | "transparent-white";

export type ChipSize = "xs" | "sm" | "md";

interface ChipsProps {
  text: string;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Chips: React.FC<ChipsProps> = ({ 
  text, 
  variant = "default", 
  size = "sm", 
  icon, 
  className = "",
  onClick
}) => {
  // Style mapping for variants
  const variantStyles: Record<ChipVariant, string> = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-purple-100 text-purple-800",
    frontend: "bg-blue-100 text-blue-800",
    backend: "bg-purple-100 text-purple-800",
    mobile: "bg-green-100 text-green-800",
    "ai-ml": "bg-yellow-100 text-yellow-800",
    design: "bg-pink-100 text-pink-800",
    certification: "bg-red text-white",
    "nl-certified": "bg-red/10 text-red",
    "nl-certified-alt": "bg-red text-white",
    batch: "bg-dark-2 text-white",
    "education-bachelors": "bg-blue-100 text-blue-800",
    "education-masters": "bg-purple-100 text-purple-800",
    "education-doctor": "bg-red-100 text-red-800",
    "transparent-white": "bg-white/10 text-white"
  };

  // Size mapping
  const sizeStyles: Record<ChipSize, string> = {
    xs: "text-xs px-2 py-0.5",
    sm: "text-sm px-2.5 py-1",
    md: "px-3 py-1.5"
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };
  
  // Get verification badge icon for NL Certified variants
  const getVerificationIcon = () => {
    if (variant === "nl-certified" || variant === "nl-certified-alt") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  const iconToRender = getVerificationIcon() || icon;

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {iconToRender && <span className="mr-1">{iconToRender}</span>}
      {text}
    </span>
  );
};

// Helper function to get the right chip variant for skill category
export const getSkillVariant = (category: string): ChipVariant => {
  switch (category) {
    case "frontend": return "frontend";
    case "backend": return "backend";
    case "mobile": return "mobile";
    case "ai-ml": return "ai-ml";
    case "design": return "design";
    default: return "default";
  }
};

// Helper function to get the right education variant
export const getEducationVariant = (level?: string): ChipVariant => {
  if (!level) return "default";
  
  switch (level) {
    case "bachelors": return "education-bachelors";
    case "masters": return "education-masters";
    case "doctor": return "education-doctor";
    default: return "default";
  }
};

// Helper function to get education label
export const getEducationLabel = (level?: string): string => {
  if (!level) return "";
  
  switch (level) {
    case "bachelors": return "Bachelor's";
    case "masters": return "Master's";
    case "doctor": return "PhD";
    default: return level;
  }
};

// Helper function to get grade variant
export const getGradeVariant = (grade: string): ChipVariant => {
  if (grade.startsWith("A")) return "success";
  if (grade.startsWith("B")) return "primary";
  if (grade.startsWith("C")) return "warning";
  return "danger";
};

export default Chips;