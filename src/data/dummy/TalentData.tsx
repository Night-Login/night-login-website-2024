// Types
export type Skill = {
    id: number;
    name: string;
    category: "frontend" | "backend" | "mobile" | "ai-ml" | "design" | "other";
  };
  
  export type Project = {
    id: number;
    title: string;
    description: string;
    link?: string;
    image?: string;
  };
  
  export type Organization = {
    id: number;
    name: string;
    role: string;
    period: string;
  };
  
  export type Grade = {
    subject: string;
    grade: string;
    semester: string;
  };
  
  export type Member = {
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
    projects?: Project[];
    organizations?: Organization[];
    grades?: Grade[];
    educationLevel?: "bachelors" | "masters" | "doctor";
    isCertified?: boolean;
  };
  
  // Dummy projects data
  export const dummyProjects: Project[] = [
    {
      id: 1,
      title: "Night Login Website",
      description: "Developed the main organization website using Next.js and Tailwind CSS.",
      link: "https://nightlogin.org",
      image: "/assets/images/projects/FindIT2023.jpg"
    },
    {
      id: 2,
      title: "Student Management System",
      description: "Built a comprehensive platform for managing student data and academic progress.",
      link: "https://github.com/nightlogin/student-system"
    }
  ];
  
  // Dummy organizations data
  export const dummyOrganizations: Organization[] = [
    {
      id: 1,
      name: "Night Login",
      role: "Web Developer",
      period: "2023 - Present"
    },
    {
      id: 2,
      name: "Competitive Programming Club",
      role: "Member",
      period: "2022 - Present"
    }
  ];
  
  // Dummy grades data
  export const dummyGrades: Grade[] = [
    {
      subject: "Data Structures & Algorithms",
      grade: "A",
      semester: "Fall 2023"
    },
    {
      subject: "Web Programming",
      grade: "A",
      semester: "Spring 2023"
    },
    {
      subject: "Database Systems",
      grade: "A-",
      semester: "Fall 2022"
    }
  ];

  //Dummy Talent Data
  export const dummyMembers: Member[] = [
        {
            id: 998,
            name: "Sigma Dev",
            photo: "/assets/images/photos/Giga.jpg",
            role: "AI/ML Specialist",
            batch: "2022",
            educationLevel: "bachelors",
            isCertified: true,
            skills: [
                { id: 7, name: "TensorFlow", category: "ai-ml" },
                { id: 8, name: "PyTorch", category: "ai-ml" }
            ],
            description: "Focused on developing cutting-edge machine learning models and AI solutions for real-world problems.",
            email: "sigma.dev@mail.ugm.ac.id",
            github: "https://github.com/sigmadev"
        },
        {
            id: 999,
            name: "Giga Chad",
            photo: "/assets/images/photos/Giga.jpg",
            role: "Full Stack Developer",
            batch: "2023",
            educationLevel: "masters",
            isCertified: false,
            skills: [
                { id: 1, name: "React", category: "frontend" },
                { id: 2, name: "Next.js", category: "frontend" },
                { id: 3, name: "Node.js", category: "backend" }
            ],
            description: "A versatile developer with expertise in both frontend and backend technologies. Known for creating efficient, scalable solutions.",
            email: "giga.chad@mail.ugm.ac.id",
            linkedin: "https://linkedin.com/in/gigachad",
            github: "https://github.com/gigachad",
            portfolio: "https://gigachad.dev"
        },
        {
            id: 1000,
            name: "Alpha Dev",
            photo: "/assets/images/photos/Arif.jpg",
            role: "Frontend Developer",
            batch: "2021",
            skills: [
                { id: 1, name: "React", category: "frontend" },
                { id: 2, name: "Next.js", category: "frontend" }
            ],
            description: "Passionate about creating beautiful, user-friendly interfaces using modern frontend technologies.",
            email: "arif@mail.ugm.ac.id",
            linkedin: "https://linkedin.com/in/arif",
            github: "github.com/arif",
            portfolio: "https://arif.dev"
        },
        {
            id: 1001,
            name: "Beta Dev",
            photo: "/assets/images/photos/Zakong.jpg",
            role: "Backend Developer",
            batch: "2021",
            skills: [
                { id: 3, name: "Node.js", category: "backend" },
                { id: 4, name: "Express", category: "backend" }
            ],
            description: "Experienced in building robust, scalable backend systems using Node.js and Express.",
            email: "zakong@mail.ugm.ac.id",
            linkedin: "https://linkedin.com/in/zakong",
            github: "github.com/zakong"
        },
    ];