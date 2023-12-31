import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/assets/images/Logo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full py-5 px-[56px] bg-dark font-poppins">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="w-[66px]" />
      </Link>

      <div className="flex items-center gap-[52px] font-semibold">
        <Link href="/" className="relative flex justify-center items-center">
          Home
          <div className="w-full h-[3px] bg-red rounded-full absolute top-[100%]"></div>
        </Link>
        <Link href="#">About Us</Link>
        <Link href="#">Projects</Link>
        <Link
          href="#"
          className="px-[25px] py-[10px] transition bg-red hover:bg-opacity-90 rounded-full "
        >
          Request
        </Link>
      </div>
    </nav>
  );
}
