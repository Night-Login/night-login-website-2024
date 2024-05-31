import Image from "next/image";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import Arif from "@/../public/assets/images/photos/Arif.jpg";
import Giga from "@/../public/assets/images/photos/Giga.jpg";
import Zakong from "@/../public/assets/images/photos/Zakong.jpg";

export default function Testimony() {
  const [swiper, setSwiper] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const imageIndexStyling = (index: number) => {
    if (index === activeSlide) return " opacity-100 ";
    if (Math.abs(index - activeSlide) === 1) return " opacity-90 scale-[0.8] ";
    if (Math.abs(index - activeSlide) === 2) return " opacity-50 scale-[0.5] ";
    return " opacity-0 scale-[0] ";
  };

  const sliderIndexStyling = (index: number) => {
    if (index === activeSlide) return " bg-dark-1 ";
    return " bg-[#D9D9D9] ";
  };

  interface Testimony {
    name: string;
    role: string;
    testimony: string;
    image: any;
  }

  const testimonies: Testimony[] = [
    {
      name: "Giga Hidrika Aura A",
      role: "President of Night Login 2024",
      testimony: "lorem ipsum dolor sit amet",
      image: Giga,
    },
    {
      name: "Moh Rizky Arif",
      role: "Head of NCSC 2024",
      testimony:
        "lorem ipsum dolor sit amet",
      image: Arif,
    },
    {
      name: "Ahmad Zaki Akmal",
      role: "Vice President of Night Login 2024",
      testimony: "lorem ipsum dolor sit amet",
      image: Zakong,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col justify-center items-center pb-[140px]">
      <section className="flex flex-col items-end">
        <div
          className="flex flex-col"
          // data-aos="fade-up"
        >
          <div className="relative z-[1] w-fit flex items-end">
            <div className="text-[18px] sm:text-[20px] w-max -mr-[25px] flex justify-center items-center text-center h-fit sm:h-[39px] font-bold text-white bg-red px-[20px] sm:px-[50px] rounded-bl-[25px] rounded-tr-[25px] z-[1] relative">
              <p className="">
                <span className="hidden sm:inline">OUR</span> ALUMNI & CUSTOMER
              </p>
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

      <section className="mt-[50px]">
        <Swiper
          className="w-[180px] !flex justify-center items-center !overflow-visible"
          spaceBetween={55}
          grabCursor
          onSwiper={setSwiper}
          initialSlide={1}
          onSlideNextTransitionStart={() => setActiveSlide(activeSlide + 1)}
          onSlidePrevTransitionStart={() => setActiveSlide(activeSlide - 1)}
        >
          <SwiperSlide>
            <div
              onClick={() => swiper && swiper.slideTo(0)}
              className={`size-[180px] flex justify-center relative items-center place-self-center overflow-hidden bg-red rounded-full transition duration-200 ${imageIndexStyling(
                0
              )}`}
            >
              <Image
                src={testimonies[0].image}
                alt={testimonies[0].name}
                className="absolute w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              onClick={() => swiper && swiper.slideTo(1)}
              className={`size-[180px] flex justify-center relative items-center place-self-center overflow-hidden bg-red rounded-full transition duration-200 ${imageIndexStyling(
                1
              )}`}
            >
              <Image
                src={testimonies[1].image}
                alt={testimonies[1].name}
                className="w-full absolute"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div
              onClick={() => swiper && swiper.slideTo(2)}
              className={`size-[180px] flex justify-center relative items-center place-self-center overflow-hidden bg-red rounded-full transition duration-200 ${imageIndexStyling(
                2
              )}`}
            >
              <Image
                src={testimonies[2].image}
                alt={testimonies[2].name}
                className="w-full absolute"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="mt-4 flex flex-col justify-center items-center">
          <h1 className="text-[24px] font-bold text-center leading-[100%]">{testimonies[activeSlide].name}</h1>
          <h2 className="text-[20px] font-medium text-center text-red mb-2">{testimonies[activeSlide].role}</h2>
          <svg
            width="23"
            height="17"
            viewBox="0 0 23 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.22755 6.77956C4.97186 6.77956 4.72649 6.81817 4.48227 6.85337C4.56138 6.58991 4.64279 6.32191 4.7735 6.08116C4.90421 5.7314 5.10831 5.42819 5.31125 5.12271C5.48095 4.79225 5.78021 4.56854 6.00035 4.28577C6.23081 4.01095 6.54498 3.82812 6.79379 3.59987C7.03801 3.36139 7.35791 3.24215 7.61245 3.07408C7.87846 2.92305 8.11007 2.75611 8.35773 2.67662L8.97575 2.42452L9.51923 2.2008L8.96313 0L8.27862 0.163527C8.05962 0.218036 7.79247 0.281629 7.48862 0.357715C7.1779 0.414495 6.84653 0.570073 6.47733 0.712024C6.11272 0.87328 5.69077 0.982298 5.29864 1.24122C4.90421 1.48878 4.44902 1.69546 4.04771 2.02705C3.65902 2.36887 3.19007 2.66526 2.8438 3.1002C2.46542 3.50675 2.09164 3.93373 1.80155 4.41977C1.4656 4.8831 1.23743 5.39185 0.996645 5.89492C0.778793 6.39799 0.603365 6.91242 0.460042 7.41209C0.188301 8.41369 0.0667626 9.36533 0.0197525 10.1796C-0.0192314 10.9949 0.00370033 11.6729 0.051857 12.1635C0.0690558 12.3951 0.10116 12.62 0.124092 12.7756L0.152757 12.9663L0.182568 12.9595C0.386501 13.903 0.855963 14.77 1.53665 15.4603C2.21733 16.1506 3.08142 16.6359 4.02895 16.8601C4.97649 17.0843 5.96876 17.0383 6.89097 16.7273C7.81318 16.4163 8.62765 15.853 9.24016 15.1027C9.85267 14.3524 10.2382 13.4457 10.3521 12.4874C10.4661 11.5292 10.3038 10.5586 9.88399 9.68787C9.46422 8.81716 8.80414 8.08194 7.98011 7.56727C7.15607 7.05259 6.20176 6.77949 5.22755 6.77956ZM17.84 6.77956C17.5843 6.77956 17.339 6.81817 17.0947 6.85337C17.1738 6.58991 17.2553 6.32191 17.386 6.08116C17.5167 5.7314 17.7208 5.42819 17.9237 5.12271C18.0934 4.79225 18.3927 4.56854 18.6128 4.28577C18.8433 4.01095 19.1574 3.82812 19.4062 3.59987C19.6505 3.36139 19.9704 3.24215 20.2249 3.07408C20.4909 2.92305 20.7225 2.75611 20.9702 2.67662L21.5882 2.42452L22.1317 2.2008L21.5756 0L20.8911 0.163527C20.6721 0.218036 20.4049 0.281629 20.1011 0.357715C19.7904 0.414495 19.459 0.570073 19.0898 0.712024C18.7263 0.874415 18.3032 0.982298 17.9111 1.24235C17.5167 1.48991 17.0615 1.69659 16.6602 2.02819C16.2715 2.37001 15.8025 2.6664 15.4563 3.1002C15.0779 3.50675 14.7041 3.93373 14.414 4.41977C14.0781 4.8831 13.8499 5.39185 13.6091 5.89492C13.3913 6.39799 13.2158 6.91242 13.0725 7.41209C12.8008 8.41369 12.6792 9.36533 12.6322 10.1796C12.5932 10.9949 12.6162 11.6729 12.6643 12.1635C12.6815 12.3951 12.7136 12.62 12.7366 12.7756L12.7652 12.9663L12.795 12.9595C12.999 13.903 13.4684 14.77 14.1491 15.4603C14.8298 16.1506 15.6939 16.6359 16.6414 16.8601C17.5889 17.0843 18.5812 17.0383 19.5034 16.7273C20.4256 16.4163 21.2401 15.853 21.8526 15.1027C22.4651 14.3524 22.8506 13.4457 22.9646 12.4874C23.0785 11.5292 22.9162 10.5586 22.4965 9.68787C22.0767 8.81716 21.4166 8.08194 20.5926 7.56727C19.7685 7.05259 18.8142 6.77949 17.84 6.77956Z"
              fill="#D62340"
            />
          </svg>
          <p className="mt-[10px] max-w-[742px] px-5 text-[20px] md:text-[24px] font-medium text-center min-h-[108px]">
            {testimonies[activeSlide].testimony}
          </p>
        </div>

        <div className="flex gap-3 justify-center items-center mt-8">
          <button
            onClick={() => swiper.slideTo(0)}
            className={`size-[10px] rounded-full ${sliderIndexStyling(0)}`}
          ></button>
          <button
            onClick={() => swiper.slideTo(1)}
            className={`size-[10px] rounded-full ${sliderIndexStyling(1)}`}
          ></button>
          <button
            onClick={() => swiper.slideTo(2)}
            className={`size-[10px] rounded-full ${sliderIndexStyling(2)}`}
          ></button>
          <button
            onClick={() => swiper.slideTo(3)}
            className={`size-[10px] rounded-full ${sliderIndexStyling(3)}`}
          ></button>
        </div>
      </section>
    </main>
  );
}
