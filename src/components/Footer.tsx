import Logo from "@/../../public/assets/images/Logo.svg";
import Instagram from "@/../../public/assets/images/icons/Instagram.svg";
import Line from "@/../../public/assets/images/icons/Line.svg";
import Linkedin from "@/../../public/assets/images/icons/Linkedin.svg";
import FooterRight from "@/../../public/assets/images/FooterRight.svg";
import FooterLeft from "@/../../public/assets/images/FooterLeft.svg";
import FooterMobile from "@/../../public/assets/images/FooterMobile.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <main className="relative">
      <Image
        src={FooterRight}
        className="absolute bottom-[calc(100%-1px)] right-[-1.5px] hidden sm:block"
        alt=""
      />
      <Image
        src={FooterLeft}
        className="absolute bottom-[calc(100%-1px)] left-[-1.5px] hidden sm:block"
        alt=""
      />
      <Image
        src={FooterMobile}
        className="absolute w-full bottom-[calc(100%-2px)] sm:hidden"
        alt=""
      />
      <section className="bg-dark-2 py-[55px] flex justify-center items-center">
        <div className="flex gap-[14px]">
          <Image src={Logo} alt="Logo" className="w-[60px] h-auto" />
          <div className="flex flex-col gap-[10px]">
            <h1 className="max-w-[155px] font-bold text-white text-[18px] leading-[100%]">
              NIGHT LOGIN DTETI FT UGM
            </h1>
            <div className="flex gap-[18px]">
              <a
                href="https://instagram.com/nightlogin"
                target="__blank"
                rel="norel noreferrer"
                className="hover:opacity-80"
              >
                <Image className="w-[20px]" src={Instagram} alt="" />
              </a>
              <a
                href="https://id.linkedin.com/company/night-login"
                target="__blank"
                rel="norel noreferrer"
                className="hover:opacity-80"
              >
                <Image className="w-[20px]" src={Linkedin} alt="" />
              </a>
              <a
                href="https://line.me/R/ti/p/catwaves"
                target="__blank"
                rel="norel noreferrer"
                className="hover:opacity-80"
              >
                <Image className="w-[20px]" src={Line} alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-red text-white text-center py-2 text-[12px]">
        &copy; 2024 by Night Login DTETI FT UGM
      </section>
    </main>
  );
}
