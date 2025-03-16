import Image from "next/image";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBotRight from "@/../public/assets/images/DecoBotRight.svg";
import ArrowL from "@/../../public/assets/images/icons/ArrowLeft.png";
import AboutUsDeco from "../../../public/assets/images/AboutUsDeco.svg";
import DecoNLLogo from "@/../../public/assets/images/DecoNLLogo.svg";
import Eye from "@/../../public/assets/images/icons/AiOutlineEye.svg";
import EyeOff from "@/../../public/assets/images/icons/AiOutlineEyeInvisible.svg";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
}

interface InputField extends EventTarget {
  name: string;
  value: string;
}

export default function UserRegisterPage() {
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const [isConfirmPassHidden, setIsConfirmPassHidden] = useState<boolean>(true);
  const [captchaImage, setCaptchaImage] = useState<string>("");
  const [captchaAnswer, setCaptchaAnswer] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: ""
  });
  const router = useRouter();

  const handleSubmit = (event: FormEvent, data:FormData) => {
    event.preventDefault();
    if(data.password !== data.confirmPassword) {
      alert("Password does not match");
      return;
    }
    console.log(formData);
    if (formData.captcha !== captchaAnswer) {
      alert("Invalid CAPTCHA, please try again.");
      fetchCaptcha();
      setCaptchaAnswer("");
      return;
    }
    axios
    .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/user/register", data)
    .then((res) => {
      alert("Registration succeeded, you can now login");
      console.log(res.data);
      router.push("/requests/login");
    })
    .catch((err) => {
      alert("Registration failed");
      console.log(err);
    });
  };

  const handleFormChange = (target: InputField) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const {name, email, password, confirmPassword, captcha} = formData;

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get("https://iai-captcha.vercel.app/captcha");
      setCaptchaImage(`https://iai-captcha.vercel.app${response.data.image}`);
      setCaptchaAnswer(response.data.answer);
    } catch (error) {
      console.error("Failed to fetch captcha:", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);


  return (
    <main className="relative min-h-screen py-20">
      <Image
        priority
        src={DecoTop}
        alt=""
        className="absolute right-0 top-0 max-w-[420px] w-[33%] min-w-[300px] scale-x-[-1] select-none z-0"
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
      <section className="w-full flex flex-col items-center pt-28 md:pt-0 relative min-h-screen justify-center">
        <div className="flex items-end w-fit gap-4">
          <Image className="w-[60px]" src={AboutUsDeco} alt="Deco" />
          <h1 className="font-bold text-[50px] text-dark-1 leading-9">
            REGISTER
          </h1>
        </div>
        <p className=" text-gray-500 text-sm py-2">
          Already have an account?{" "}
          <Link href="/requests/login" className="text-red hover:underline">
            Log in.
          </Link>
        </p>
        <form
          className="p-6 md:p-0 w-full md:w-3/5 lg:w-[30%] flex flex-col gap-6"
          onSubmit={(e) => handleSubmit(e, formData)}
        >
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[16px] lg:text-[20px]">
              Name
            </label>
            <input
              className="w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none"
              type="text"
              placeholder="Enter your Name"
              required
              name="name"
              value={name}
              onChange={(e) => handleFormChange(e.target)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[16px] lg:text-[20px]">
              Email
            </label>
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
            <label className="font-semibold text-[16px] lg:text-[20px]">
              Password
            </label>
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
            <label className="font-semibold text-[16px] lg:text-[20px]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={
                  "w-full bg-[#F3F3F3] px-8 py-4 rounded-lg focus:outline-none " +
                  (formData.password === formData.confirmPassword
                    ? ""
                    : "ring-2 ring-red")
                }
                type={isConfirmPassHidden ? "password" : "text"}
                placeholder="Enter your Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleFormChange(e.target)}
              />
              <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                {isConfirmPassHidden ? (
                  <Image
                    src={EyeOff}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setIsConfirmPassHidden(!isConfirmPassHidden)}
                  />
                ) : (
                  <Image
                    src={Eye}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => setIsConfirmPassHidden(!isConfirmPassHidden)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[16px] lg:text-[20px]">Captcha</label>
            <div className="flex items-center gap-4">
            {captchaImage === "" ? (
                <div className="w-[200px] h-[50px] bg-slate-300 animate-pulse" />
              ) : (
                <Image
                  src={captchaImage}
                  alt="Captcha"
                  className="w-[200px] h-[50px]"
                  width={200}
                  height={50}
                />
              )}
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
          <button type="submit" className="bg-red text-neutral-1 py-2 rounded-md transition-colors hover:bg-rose-700 active:bg-rose-600">
            Register
          </button>
        </form>
      </section>
    </main>
  );
}
