import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBotRight from "@/../public/assets/images/DecoBotRight.svg";
import ArrowL from "@/../../public/assets/images/icons/ArrowLeft.png";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import GoogleIco from "@/../../public/assets/images/icons/Google.svg";
import GithubIco from "@/../../public/assets/images/icons/github-mark.svg";
import DecoNLLogo from "@/../../public/assets/images/DecoNLLogo.svg";
import Eye from "@/../../public/assets/images/icons/AiOutlineEye.svg";
import EyeOff from "@/../../public/assets/images/icons/AiOutlineEyeInvisible.svg";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
  captcha: string;
};

interface InputField extends EventTarget {
  name: string;
  value: string;
}

const handleSubmit = (event: FormEvent, data: FormData) => {
  event.preventDefault();
  // ACTION HERE
};

export default function UserLoginPage() {
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const [captchaImage, setCaptchaImage] = useState<string>("");
  const [captchaAnswer, setCaptchaAnswer] = useState<string>("");
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    captcha: "",
  });
  const handleFormChange = (target: InputField) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { email, password, captcha } = formData;

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get("https://iai-captcha.vercel.app/captcha");
      setCaptchaImage(`https://iai-captcha.vercel.app${response.data.image}`);
      setCaptchaAnswer(response.data.answer);
    } catch (error) {
      console.error("Failed to fetch captcha:", error);
    }
  };

  const handleClick = async () => {
    await signIn("google"); // or the name of your provider
  };

  const handleGithub = async () => {
    await signIn("github");
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = (event: FormEvent, data: FormData) => {
    event.preventDefault();
    if (formData.captcha !== captchaAnswer) {
      alert("Invalid CAPTCHA, please try again.");
      fetchCaptcha();
      return;
    }
    // Proceed with login logic
    // ACTION HERE
  };

  
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to /dashboard upon successful sign-in
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <main className="relative h-screen">
      <Image
        priority
        src={DecoTop}
        alt=""
        className="absolute right-0 max-w-[420px] w-[33%] min-w-[300px] scale-x-[-1] select-none z-0"
      />
      <Image
        priority
        src={DecoBotRight}
        alt=""
        className="absolute left-0 bottom-0 max-w-[420px] w-[33%] min-w-[300px] select-none z-0"
      />
      <Image
        priority
        src={DecoNLLogo}
        alt=""
        className="absolute right-0 bottom-0 max-w-[700px] w-[33%] min-w-[600px] select-none z-0"
      />
      <nav className="px-14 py-10 hidden md:block absolute top-0 z-10">
        <Link href={"/"}>
          <button
            className="font-semibold flex items-center gap-5 hover:text-red transition text-[16px] lg:text-[20px]"
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
      </nav>
      <section className="w-full flex flex-col items-center justify-center pt-28 md:pt-0 relative min-h-screen">
        <div className="flex items-end w-fit gap-4">
          <Image
            className="w-[60px]"
            src={AboutUsDeco}
            alt="Deco"
          />
          <h1 className="font-bold text-[50px] text-dark-1 leading-9">LOGIN</h1>
        </div>
        <p className="italic text-gray-500 text-sm py-2">You must login first before ask project request.</p>
        <form
          onSubmit={(e) => handleSubmit(e, formData)}
          className="p-6 md:p-0 w-full md:w-3/5 lg:w-[30%] flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[16px] lg:text-[20px]">Email</label>
            <input
              className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none"
              type="email"
              placeholder="Enter your Email"
              required
              name="email"
              value={email}
              onChange={(e) => handleFormChange(e.target)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[16px] lg:text-[20px] ">Password</label>
            <div className="relative">
              <input
                className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none"
                type={isPassHidden ? "password" : "text"}
                placeholder="Enter your Password"
                required
                name="password"
                value={password}
                onChange={(e) => handleFormChange(e.target)}
              />
              <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                {isPassHidden ? (
                  <Image
                    src={EyeOff}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setIsPassHidden(!isPassHidden)}
                  />
                ) : (
                  <Image
                    src={Eye}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setIsPassHidden(!isPassHidden)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[16px] lg:text-[20px]">Captcha</label>
            <div className="flex items-center gap-4">
              <img src={captchaImage} alt="Captcha" className="w-[200px] h-[50px]" width={200} height={50}/>
              <button type="button" onClick={fetchCaptcha} className="text-blue-500 underline">Refresh</button>
            </div>
            <input
              className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none"
              type="text"
              placeholder="Enter CAPTCHA"
              required
              name="captcha"
              value={captcha}
              onChange={e => handleFormChange(e.target)}
            />
          </div>
          <button
            type="submit"
            className="bg-red text-neutral-1 py-2 rounded-md transition-colors hover:bg-rose-700 active:bg-rose-600"
          >
            Login
          </button>
          <button
            onClick={handleClick}
            className="bg-neutral-2 transition-colors hover:bg-neutral-200 text-dark-1 py-2 rounded-md flex px-2"
          >
            <Image
              src={GoogleIco}
              alt=""
              className="absolute select-none"
            />
            <a className="w-full font-semibold">Sign In with Google</a>
          </button>
          <button
            onClick={handleGithub}
            className="bg-neutral-2 transition-colors hover:bg-neutral-200 text-dark-1 py-2 rounded-md flex px-2"
          >
            <Image
              src={GithubIco}
              alt=""
              className="absolute select-none"
            />
            <a className="w-full font-semibold">Sign In with Github</a>
          </button>
          <p className="w-full text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/requests/register"
              className="text-red hover:underline"
            >
              Register Now
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
