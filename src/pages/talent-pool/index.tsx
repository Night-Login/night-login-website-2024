import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout/Layout";
import Card from "@/components/Talent-Pool/Card";

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

// Mock data (replace with actual data from API/database)
const SKILLS: Skill[] = [
  { id: 1, name: "React", category: "frontend" },
  { id: 2, name: "Next.js", category: "frontend" },
  { id: 3, name: "Node.js", category: "backend" },
  { id: 4, name: "Express", category: "backend" },
  { id: 5, name: "Flutter", category: "mobile" },
  { id: 6, name: "React Native", category: "mobile" },
  { id: 7, name: "TensorFlow", category: "ai-ml" },
  { id: 8, name: "PyTorch", category: "ai-ml" },
  { id: 9, name: "Figma", category: "design" },
  { id: 10, name: "UI/UX Design", category: "design" },
];

const MEMBERS: Member[] = [
    {
        id: 998,
        name: "Sigma Dev",
        photo: "/assets/images/photos/Giga.jpg",
        role: "AI/ML Specialist",
        batch: "2022",
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

export default function TalentPool() {
  const [members, setMembers] = useState<Member[]>(MEMBERS);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(MEMBERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter members based on search term and filters
  useEffect(() => {
    let result = members;
    
    if (searchTerm) {
      result = result.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSkill) {
      result = result.filter(member => 
        member.skills.some(skill => skill.name === selectedSkill)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(member => 
        member.skills.some(skill => skill.category === selectedCategory)
      );
    }
    
    setFilteredMembers(result);
  }, [searchTerm, selectedSkill, selectedCategory, members]);

  return (
    <Layout>
      <Head>
        <title>Talent Pool | Night Login</title>
        <meta name="description" content="Browse Night Login members and their technical specialties" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Talent Pool</h1>

        {/* Search and Filter Section */}
        <section className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Search by name, role, or description"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                </div>
                
                <div className="flex gap-4">
                <select
                    className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedSkill || ""}
                    onChange={e => setSelectedSkill(e.target.value || null)}
                >
                    <option value="">Filter by skill</option>
                    {SKILLS.map(skill => (
                    <option key={skill.id} value={skill.name}>{skill.name}</option>
                    ))}
                </select>
                
                <select
                    className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory || ""}
                    onChange={e => setSelectedCategory(e.target.value || null)}
                >
                    <option value="">Filter by category</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="ai-ml">AI/ML</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                </select>
                </div>
            </div>
        </section>

        {/* Talent Pool Section */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Talent Pool</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredMembers.map(member => (
                    <Card key={member.id} member={member} />
                ))}
            </div>
        </section>
      </main>
    </Layout>
  );
}