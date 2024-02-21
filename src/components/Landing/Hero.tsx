import Image from "next/image";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBot from "@/../public/assets/images/DecoBot.svg";
import HeroMain from "@/../public/assets/images/HeroMain.svg";
import HeroMobile from "@/../public/assets/images/HeroMobile.svg";

export default function Hero() {
  return (
    <div className="relative">
      <Image
        priority
        src={DecoTop}
        alt=""
        className="absolute top-[72px] xl:top-[97px] left-0 max-w-[420px] w-[33%] min-w-[300px]"
      />
      <Image
        priority
        src={DecoBot}
        alt=""
        className="absolute bottom-0 right-0 max-w-[420px] w-[33%] min-w-[300px] translate-y-[50%] z-[1]"
      />
    <main className="min-h-screen flex justify-center items-center overflow-x-hidden relative z-[1] px-[2.5%]">
      <div data-aos="fade-up" className="relative flex justify-start items-center w-fit max-w-full md:max-w-[1000px] min-w-full sm:min-w-[280px] sm:w-[66%]">
        <Image
          priority
          src={HeroMain}
          alt=""
          className="w-full hidden min-[500px]:block"
        />
        <Image
          priority
          src={HeroMobile}
          alt=""
          className="w-full min-[500px]:hidden"
        />
        <div className="text-[14px] md:text-[16px] bg-dark-2 font-semibold absolute top-[calc(100%+7px)] left-0 text-neutral-1 px-[34px] py-3 rounded-[25px] rounded-bl-[37px] rounded-tl-[0px]">
          Are you ready to log the night away?
        </div>
      </div>
    </main>
    </div>
  );
}
