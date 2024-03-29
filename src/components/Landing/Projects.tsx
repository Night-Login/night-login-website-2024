import Image from "next/image";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import ProjectCard from "./ProjectCard";
import ArrowR from "@/../../public/assets/images/icons/ArrowRight.png";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import dynamic from "next/dynamic";
import Link from "next/link";

import Findit from "@/../public/assets/images/projects/FindIT2023.jpg";
import PaperGenB from "@/../public/assets/images/projects/PaperGenB.jpg";
import IndustrialWorkshop from "@/../public/assets/images/projects/IndustrialWorkshop2023.jpg";
import PPSMBKesatria from "@/../public/assets/images/projects/PPSMBKesatria2023.jpg";
import TwitterSentimentAnalysis from "@/../../public/assets/images/projects/TwitterSentimentAnalysis.jpg";
import Top500UnivAnalysis from "@/../../public/assets/images/projects/Top500UniAnalysis.jpg";
import PresidentCandidateTrend from "@/../../public/assets/images/projects/PresidentCandidateTrend.jpg";

function Projects() {
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
  const [projects, setProjects] = useState([
    {
      image: Findit,
      title: "Find IT! 2023",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
    {
      image: Top500UnivAnalysis,
      title: "Top 500 Univ. Analysis",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "DATA ANALYSIS",
    },
    {
      image: PaperGenB,
      title: "Paper GenB",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
    {
      image: TwitterSentimentAnalysis,
      title: "Twitter Sentiment Analysis",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "DATA ANALYSIS",
    },
    {
      image: IndustrialWorkshop,
      title: "Industrial Workshop",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
    {
      image: PresidentCandidateTrend,
      title: "President Candidate Trend",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "DATA ANALYSIS",
    },
    {
      image: PPSMBKesatria,
      title: "PPSMB Kesatria 2023",
      description:
        "I am someone who enjoys seeking challenges. Here are a few skills that I have developed and honed.",
      tag: "WEBSITE",
    },
  ]);

  return (
    <main className="flex flex-col justify-center items-center overflow-x-hidden pt-20 pb-10 overflow-y-hidden">
      <section className="flex items-end self-end sm:mr-20" data-aos="fade-up">
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

      <section
        className="h-fit md:p-10 w-[80vw] mt-[55px] flex"
        data-aos="fade-up"
      >
        <Swiper
          className="!w-full !max-w-[450px] !overflow-visible !flex !gap-10 justify-center items-center"
          initialSlide={1}
          grabCursor
          spaceBetween={40}
          modules={[Mousewheel]}
          // autoplay={{delay: 2000}}
          mousewheel
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
      <Link href="/projects">
        <button
          className="mx-auto p-5 mt-5 md:mt-0 font-semibold flex items-center gap-5 hover:text-red transition"
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          data-aos="fade-up"
          data-aos-offset="-400"
        >
          View All{" "}
          <Image
            className={isBtnHovered ? "animate-bounce-x" : ""}
            src={ArrowR}
            alt=""
          />
        </button>
      </Link>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Projects), { ssr: false });
