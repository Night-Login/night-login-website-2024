import Image from "next/image";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";

export default function Testimony() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <section className="flex flex-col items-end">
        <div
          className="flex flex-col"
          // data-aos="fade-up"
        >
          <div className="relative z-[1] w-fit flex items-end">
            <div className="text-[20px] w-max -mr-[25px] grid place-items-center h-[31.5px] sm:h-[39px] font-bold text-white bg-red px-[50px] sm:px-[50px] rounded-bl-[25px] rounded-tr-[25px] z-[1] relative">
              OUR ALUMNI & CUSTOMER
            </div>
            <Image
              src={AboutUsDeco}
              alt="Deco"
              className="w-[80px] sm:w-[100px] rotate-90 //absolute //bottom-0 //left-[calc(100%-25px)]"
            />
          </div>
        </div>
        <h1 className="font-bold text-[45px] w-fit md:text-[64px] max-w-[505px] leading-[100%] text-center lg:text-left mt-5 lg:mt-0">
          TESTIMONIALS
        </h1>
      </section>
    </main>
  );
}
