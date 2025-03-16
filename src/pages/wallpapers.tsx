import Image from "next/image";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBot from "@/../public/assets/images/DecoBot.svg";
import NL from "@/../public/assets/images/LogoRed.png";
import NADC from "@/../public/assets/images/NADC.svg";
import NCSC from "@/../public/assets/images/NCSC.svg";
import NDSC from "@/../public/assets/images/NDSC.svg";
import NGDC from "@/../public/assets/images/NGDC.svg";
import NHCI from "@/../public/assets/images/NHCI.svg";
import NWDC from "@/../public/assets/images/NWDC.svg";
import Navbar from "@/components/Navbar";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";

export default function Wallpapers() {
  return (
    <Layout>
      <Head>
        <title>Wallpapers | Night Login</title>
        <meta name="description" content="Download Night Login wallpapers and logos" />
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
            className="relative flex flex-col justify-start items-center w-fit max-w-full md:max-w-[1000px] min-w-full sm:min-w-[280px] sm:w-[66%]"
          >
            <h1 className="font-bold text-[45px] md:text-[50] lg:text-[64] leading-[100%] w-full text-center mt-10">
              WALLPAPERS
            </h1>
            <a
              href="/wallpapers/VBG%20NL.png"
              target="__blank"
              rel="norel noreferrer"
            >
              <Image
                src={NL}
                alt="NL Logo"
                className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto mb-5 mt-8"
              />
            </a>
            <div className="grid grid-cols-3 gap-5">
              <a
                href="/wallpapers/VBG%20NADC.png"
                target="__blank"
                rel="norel noreferrer"
              >
                <Image
                  src={NADC}
                  alt="NADC Logo"
                  className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto"
                />
              </a>
              <a
                href="/wallpapers/VBG%20NCSC.png"
                target="__blank"
                rel="norel noreferrer"
              >
                <Image
                  src={NCSC}
                  alt="NCSC Logo"
                  className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto"
                />
              </a>
              <a
                href="/wallpapers/VBG%20NDSC.png"
                target="__blank"
                rel="norel noreferrer"
              >
                <Image
                  src={NDSC}
                  alt="NDSC Logo"
                  className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto"
                />
              </a>
              <a
                href="/wallpapers/VBG%20NGDC.png"
                target="__blank"
                rel="norel noreferrer"
              >
                <Image
                  src={NGDC}
                  alt="NGDC Logo"
                  className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto"
                />
              </a>
              <a
                href="/wallpapers/VBG%20NHCI.png"
                target="__blank"
                rel="norel noreferrer"
              >
                <Image
                  src={NHCI}
                  alt="NHCI Logo"
                  className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto"
                />
              </a>
              <a
                href="/wallpapers/VBG%20NWDC.png"
                target="__blank"
                rel="norel noreferrer"
              >
                <Image
                  src={NWDC}
                  alt="NWDC Logo"
                  className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto"
                />
              </a>
            </div>
            <h1 className="font-bold text-[45px] md:text-[50] lg:text-[64] leading-[100%] w-full text-center mt-10">
              Logo
            </h1>
            <a
              download="NightLogin_Logo.png"
              rel="noopener noreferrer"
            >
              <Image
                src={NL}
                alt="NL Logo"
                className="w-[60px] sm:w-[68px] md:w-[75px] lg:w-[80px] transition hover:scale-[1.1] active:hover:scale-[1.15] h-auto mb-5 mt-8"
              />
            </a>
          </div>
        </main>
      </div>
    </Layout>
  );
}