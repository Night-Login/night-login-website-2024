import Image from "next/image";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBot from "@/../public/assets/images/DecoBot.svg";
import HeroMain from "@/../public/assets/images/HeroMain.svg";

export default function Hero() {
  return (
    <main className="min-h-screen flex justify-center items-center relative">
      <Image
        src={DecoTop}
        alt=""
        className="absolute -top-[1px] left-0 max-w-[420px] w-[33%] min-w-[300px]"
      />
      <Image
        src={DecoBot}
        alt=""
        className="absolute bottom-0 right-0 max-w-[420px] w-[33%] min-w-[300px]"
      />
      <div className="relative flex justify-center items-center max-w-[1000px] min-w-[300px] w-[66%]">
        <Image
          src={HeroMain}
          alt=""
          className="w-full"
        />
        <div className="bg-dark absolute top-[calc(100%+7px)] left-0 text-neutral-1 px-[34px] py-3 rounded-[25px] rounded-bl-[37px] rounded-tl-[0px]">
          Are you ready to login?
        </div>
      </div>
    </main>
  );
}
