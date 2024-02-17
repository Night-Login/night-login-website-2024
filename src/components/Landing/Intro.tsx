import Image from "next/image";
import LogoRed from "../../../public/assets/images/LogoRed.png";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import BgDeco from "../../../public/assets/images/BgDeco.svg";
import DecoIntroBot from "../../../public/assets/images/DecoIntroBot.svg";
import Button from "../Button";
import Link from "next/link";

export default function Intro() {
  return (
    <main className="min-h-screen relative bg-neutral-1 z-0 grid place-items-center overflow-hidden py-[100px]">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-[30px] lg:gap-[64px] relative z-[1]" data-aos="fade-up">
        
        <div className="!overflow-visible flex justify-center items-center">
          <Image src={BgDeco} alt="BgDeco" className="absolute" />
          <Image src={LogoRed} alt="Logo" className="w-[200px] xl:w-[300px] relative" />
        </div>
        <div className="px-[5%]">
          <div className="flex items-end justify-start">
            <Image
              src={AboutUsDeco}
              alt="Deco"
              className="w-[80px] sm:w-[100px]"
            />
            <div className="text-[20px] grid place-items-center h-[30.7px] sm:h-[38.5px] font-bold text-white bg-red px-[50px] sm:px-[80px] rounded-bl-[25px] rounded-tr-[25px] -ml-[25px]">
              ABOUT US
            </div>
          </div>
          <h1 className="mt-2 font-bold text-[45px] md:text-[64px] text-dark-2 leading-[100%]">
            WHO ARE WE?
          </h1>
          <p className="font-medium text-justify max-w-[680px] mt-1">
            Night Login merupakan Badan Semi Otonom (BSO) di DTETI FT UGM yang
            bergerak di bidang teknologi informasi. BSO ini merupakan wadah bagi
            mahasiswa DTETI yang memiliki minat di bidang IT untuk mengembangkan
            kemampuan, kreativitas, inovasi, dan memperluas wawasan terkait
            bidang-bidang IT.
          </p>

          <Link href="/about">
            <Button color="dark" title="READ MORE" className="mt-6"></Button>
          </Link>
        </div>
      </div>
      <Image src={DecoIntroBot} alt="Deco" className="absolute bottom-0 right-0 w-[150px] md:w-[200px]" data-aos="fade-up" data-aos-offset="-100" data-aos-delay="400" />
    </main>
  );
}
