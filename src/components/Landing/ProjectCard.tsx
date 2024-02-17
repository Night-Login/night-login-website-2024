import Image from "next/image";
import ProjectDeco from "@/../public/assets/images/ProjectDeco.svg";

export interface Props {
  image: any;
  title: string;
  description: string;
  link?: string;
  tag?: string;
}

export default function ProjectCard({
  image,
  title,
  description,
  link,
  tag,
}: Props) {
  return (
    <div className="max-w-[450px] h-full md:h-auto flex-shrink-0 bg-dark-1 text-neutral-1 rounded-[16px] relative select-none">
      <div className="h-[210px] bg-gradient-to-br from-red to-yellow-500 w-full relative rounded-t-[16px] overflow-hidden">
        <Image
          src={image}
          alt="Project Preview"
          className="rounded-t-[16px] absolute w-full"
        />
      </div>
      <div className="px-7 pt-5 pb-[55px] relative">
        <div className="bg-red rounded-tl-[19px] rounded-br-[19px] absolute top-0 translate-y-[-50%] min-w-[123px] text-center -right-[20px] text-[15px] italic py-0.5 font-semibold">
          {tag}
        </div>
        <h3 className="text-[24px] font-semibold leading-[100%] mb-2">
          {title}
        </h3>
        <p className="text-[12px] max-w-[335px]">{description}</p>
        <Image
          src={ProjectDeco}
          alt=""
          className="absolute bottom-0 right-0 w-[120px] md:w-[225px]"
        />
      </div>
      <button className="absolute bottom-0 left-[22px] translate-y-[35%] bg-red rounded-full px-[25px] py-[10px] font-bold hover:bg-[#BB213A] transition">
        READ MORE
      </button>
    </div>
  );
}
