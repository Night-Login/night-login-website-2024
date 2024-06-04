import Image from "next/image";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBot from "@/../public/assets/images/DecoBot.svg";
import Head from "next/head";

export default function ComingSoon() {
  return (
    <>
      <Head>
        <title>Coming Soon</title>
      </Head>
      <div className="relative overflow-y-hidden">
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
          <div
            data-aos="fade-up"
            className="relative flex justify-start items-center w-fit max-w-full md:max-w-[1000px] min-w-full sm:min-w-[280px] sm:w-[66%]"
          >
            <h1 className="font-bold text-[64px] md:text-[80px] lg:text-[100px] leading-[100%] w-full text-center mt-10">
              COMING <br /> <span className="text-red">SOON</span>
            </h1>
          </div>
        </main>
      </div>
    </>
  );
}
