import DashboardLogo from "@/../public/assets/images/DasboardLogo.png";
import ArrowL from "@/../public/assets/images/icons/ArrowLeft.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout() {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  return(
    <main className="flex min-h-screen">
      <aside className="flex-shrink-0 w-[285px] border-r-2 border-[#DEDEDE]/90 pt-[24.5px] px-[32px]">
      <Link href={"/"}>
          <button
            className="font-semibold flex items-center gap-5 hover:text-red transition text-[14px] lg:text-[16px] mb-[15px]"
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
          >
            <Image
              className={isBtnHovered ? "animate-bounce-x" : ""} 
              src={ArrowL}
              alt=""
            />
            Back to Home
          </button>
        </Link>
        <Image src={DashboardLogo} alt="Dashboard Logo" />
        <h1 className="font-jakarta font-semibold mt-[25px]">MAIN MENU</h1>
      </aside>
      <aside></aside>
    </main>
  );
}