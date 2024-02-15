import Image from "next/image";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import ProjectCard from "./ProjectCard";
import ArrowR from "@/../../public/assets/images/icons/ArrowRight.png";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import dynamic from "next/dynamic";

function Projects() {
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
  const [projects, setProjects] = useState([
    {
      image: "",
      title: "Find IT! 2023",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
    {
      image: "",
      title: "Technocorner 2023",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
    {
      image: "",
      title: "Paper GenB",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
    {
      image: "",
      title: "Paper GenB",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
  ]);
  return (
    <main className="flex flex-col justify-center items-center overflow-x-hidden pt-20 pb-10">
      <section className="flex items-end self-end sm:mr-20">
        <div className="relative z-[1]">
          <h2 className="text-[35px] md:text-[40px] font-bold leading-[110%] text-dark-1">
            PROJECTS
          </h2>
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

      <section className="h-fit md:p-10 w-[80vw] mt-[55px] flex">
        <Swiper
          className="!w-full !max-w-[450px] !overflow-visible !flex !gap-10 justify-center items-center"
          initialSlide={1}
          grabCursor
          spaceBetween={40}
        >
          {projects?.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                tag={project.tag}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <button
        className="mx-auto p-5 mt-5 md:mt-0 font-semibold flex items-center gap-5 hover:text-red transition"
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
      >
        View All{" "}
        <Image
          className={isBtnHovered ? "animate-bounce-x" : ""}
          src={ArrowR}
          alt=""
        />
      </button>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Projects), { ssr: false });
