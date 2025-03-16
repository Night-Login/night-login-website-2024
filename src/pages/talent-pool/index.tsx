import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout/Layout";

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
    id: 1,
    name: "Jane Doe",
    photo: "/images/placeholder.png",
    role: "Frontend Developer",
    batch: "2021",
    skills: [SKILLS[0], SKILLS[1], SKILLS[8]],
    description: "Passionate about creating intuitive user interfaces and seamless user experiences.",
    email: "jane.doe@mail.ugm.ac.id",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
  },
  {
    id: 2,
    name: "John Smith",
    photo: "/images/placeholder.png",
    role: "Backend Developer",
    batch: "2022",
    skills: [SKILLS[2], SKILLS[3]],
    description: "Specializes in building robust and scalable server-side applications.",
    email: "john.smith@mail.ugm.ac.id",
    github: "https://github.com/johnsmith",
  },
  {
    id: 3,
    name: "Alex Johnson",
    photo: "/images/placeholder.png",
    role: "AI/ML Engineer",
    batch: "2020",
    skills: [SKILLS[6], SKILLS[7]],
    description: "Focused on developing machine learning models for real-world applications.",
    email: "alex.johnson@mail.ugm.ac.id",
    linkedin: "https://linkedin.com/in/alexjohnson",
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
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Night Login Talent Pool</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connect with skilled tech talents from Night Login. Our members specialize in various 
            fields of computer science and information technology, ready to collaborate on research, 
            projects, and innovations.
          </p>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3 mb-4">
              <input
                type="text"
                placeholder="Search by name, role, or description..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <select 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Filter by Category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="mobile">Mobile</option>
                <option value="ai-ml">AI/ML</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <select 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSkill || ""}
                onChange={(e) => setSelectedSkill(e.target.value || null)}
              >
                <option value="">Filter by Skill</option>
                {SKILLS.map((skill) => (
                  <option key={skill.id} value={skill.name}>{skill.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <button 
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSkill(null);
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {filteredMembers.length} {filteredMembers.length === 1 ? "Member" : "Members"} Found
          </h2>
          
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl">No members match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden mr-4">
                        <Image
                          src={member.photo}
                          alt={`${member.name}'s profile picture`}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-gray-600">{member.role} • Batch {member.batch}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{member.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span 
                            key={skill.id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Contact</h4>
                      <div className="flex space-x-3">
                        <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {member.portfolio && (
                          <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}