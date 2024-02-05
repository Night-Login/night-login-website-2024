import Image from "next/image";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      image: "",
      title: "Find IT! 2023",
      description: "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE"
    },
    {
      image: "",
      title: "Technocorner 2023",
      description: "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE"
    },
    {
      image: "",
      title: "Paper GenB",
      description: "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE"
    },
    {
      image: "",
      title: "Paper GenB",
      description: "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE"
    },
  ]);
  return (
    <main className="min-h-screen flex flex-col justify-center items-center overflow-x-hidden">
      <section className="flex items-end self-end sm:mr-20">
        <div className="relative z-[1]">
          <h2 className="text-[35px] md:text-[40px] font-bold leading-[110%] text-dark-1">PROJECTS</h2>
          <div className="text-[20px] w-fit grid place-items-center h-[31.5px] sm:h-[39px] font-bold text-white bg-red px-[50px] sm:px-[80px] rounded-bl-[25px] rounded-tr-[25px] -mr-[25px]">
            PORTFOLIO
          </div>
        </div>
        <Image
          src={AboutUsDeco}
          alt="Deco"
          className="w-[80px] sm:w-[100px] rotate-90"
        />
      </section>

      <section className="h-fit p-10 w-[80vw] bg-dark-1/20 mt-[55px] flex gap-10 overflow-x-auto">
        {
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              description={project.description}
              tag={project.tag}
            />
          ))
        }
      </section>
    </main>
  );
}
