import Image from "next/image";
import ProjectDeco from "@/../public/assets/images/ProjectDeco.svg";

export interface Props {
  image: any;
  title: string;
  description: string;
  link?: string;
}

export default function ProjectCard({ image, title, description, link } : Props) {
  return(
    <div className="w-[450px] bg-dark-1 text-neutral-1 rounded-[16px] relative">
      <div className="h-[210px] bg-gradient-to-br from-red to-yellow-500 w-full relative rounded-t-[16px]">
        {/* <Image src={image} alt="Project Preview"/> */}
        <div className="bg-red rounded-tl-[19px] rounded-br-[19px] absolute bottom-0 translate-y-[50%] min-w-[123px] text-center -right-[20px] text-[15px] italic py-0.5 font-semibold">
          WEBSITE
        </div>
      </div>
      <div className="px-7 pt-5 relative pb-[55px]">
        <h3 className="text-[24px] font-semibold leading-[100%] mb-2">{title}</h3>
        <p className="text-[12px]">{description}</p>
        <Image src={ProjectDeco} alt="" className="absolute bottom-0 right-0 w-[225px]" />
      </div>
      <button className="absolute bottom-0 left-[22px] translate-y-[35%] bg-red rounded-full px-[25px] py-[10px] font-bold hover:bg-[#BB213A] transition">
        READ MORE
      </button>
    </div>
  );
}