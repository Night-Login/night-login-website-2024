import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/images/Logo-White.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <nav className="flex justify-between items-center fixed top-0 w-full py-5 px-[5%] sm:px-[40px] md:px-[56px] bg-dark-2 font-poppins text-neutral-1 z-[10]">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="w-[40px] xl:w-[66px]" />
      </Link>

      <div className="hidden sm:flex items-center gap-[52px] font-semibold">
        <MenuLink
          href="/"
          active={router.pathname === "/"}
          title="Home"
        />
        <MenuLink
          href="/about"
          active={router.pathname === "/about"}
          title="About Us"
        />
        <MenuLink
          href="/projects"
          active={router.pathname === "/projects"}
          title="Projects"
        />
        <Link
          href="/requests/login"
          className="px-[25px] py-[5px] xl:py-[10px] transition bg-red hover:bg-opacity-90 rounded-full "
        >
          Request
        </Link>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden w-[30px] flex flex-col gap-1.5 justify-center items-start relative z-[10]"
      >
        <div
          className={`bg-white h-[3px] rounded-full transition-[width] duration-200 ${
            isMenuOpen ? "w-0" : "w-full delay-200"
          }`}
        />
        <div
          className={`w-full h-[3px] rounded-full transition duration-200 ${
            isMenuOpen ? "rotate-45 delay-200 bg-red":"bg-white"
          }`}
        />
        <div
          className={`absolute w-full h-[3px] rounded-full transition duration-200 ${
            isMenuOpen ? "-rotate-45 delay-200 bg-red" : "bg-white"
          }`}
        />
        <div
          className={`bg-white h-[3px] rounded-full self-end transition-[width] duration-200 ${
            isMenuOpen ? "w-0" : "w-full delay-200"
          }`}
        />
      </button>

      <div
        className={`fixed top-0 right-0 pt-[100px] px-[50px] bg-dark-2 h-screen transition duration-200 shadow-[0_0_5px_#D62340] sm:hidden z-[9] ${
          isMenuOpen ? "translate-x-[1px]" : "translate-x-[calc(100%+10px)]"
        }`}
      >
        <div className="flex flex-col gap-5 justify-center items-center">
          <MenuLink href="/" active={router.pathname === "/"} title="Home" />
          <MenuLink
            href="/about"
            active={router.pathname === "/about"}
            title="About Us"
          />
          <MenuLink
            href="/projects"
            active={router.pathname === "/projects"}
            title="Projects"
          />
          <Link
            href="/requests/login"
            className="px-[25px] py-[5px] xl:py-[10px] transition bg-red hover:bg-opacity-90 rounded-full "
          >
            Request
          </Link>
        </div>
      </div>
    </nav>
  );
}

interface MenuLinkProps {
  href: string;
  active: boolean;
  title: string;
}

function MenuLink({ href, active, title }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="relative flex justify-center items-center lg:text-[15px] w-fit"
    >
      {title}
      <div
        className={`h-[3px] w-full bg-red rounded-full absolute top-[100%] transition duration-300 origin-left ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </Link>
  );
}
