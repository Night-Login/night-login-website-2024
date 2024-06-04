import DashboardLayout from "@/components/Dashboard/Layout";
import Image from "next/image";
import AboutUsDeco from "@/../public/assets/images/AboutUsDeco.svg";
import FormInput from "@/components/Dashboard/FormInput";
import { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function DashboardRequest() {
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/transaction/create",
        {
          projectName,
          projectDescription: description,
          projectObjective: objective,
          projectBudget: budget
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then((res) => {
        alert("Request submitted");
        localStorage.setItem("orderId", res.data.orderId);
        router.replace("/requests/payment"); 
        console.log(res.data);
      })
      .catch((err) => {
        alert("Request failed");
        console.log(err);
      });
  };

  return (
    <DashboardLayout>
      <main className="bg-[#FAFAFA] pt-10 pb-20 px-12 w-full flex-1">
        <div className="flex items-end justify-start relative">
          <Image
            src={AboutUsDeco}
            alt="Deco"
            className="w-[80px] sm:w-[100px]"
          />
          <div>
            <h1 className="absolute bottom-[35px] ml-[10px] font-bold text-[36px]">
              FORM
            </h1>
          </div>
          <div className="text-[20px] grid place-items-center h-[30.7px] sm:h-[38.5px] font-bold text-white bg-red pr-[50px] sm:pr-[80px] pl-[40px] rounded-bl-[25px] rounded-tr-[25px] -ml-[25px]">
            REQUEST PROJECT
          </div>
        </div>

        <section>
          <h1 className="font-semibold text-[20px] mt-[20px]">
            User Information
          </h1>
          <p className="text-[#A8A8A8]">Check your data information here</p>
        </section>

        <form className="mt-5 flex gap-10">
          <FormInput
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            label="Name"
            type="text"
          />
          <FormInput
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            label="Email"
            type="text"
          />
        </form>

        <section>
          <h1 className="font-semibold text-[20px] mt-[20px]">
            Project Details
          </h1>
          <p className="text-[#A8A8A8]">Enter your project requirement below</p>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-5 flex flex-col gap-5 w-[80%]"
        >
          <FormInput
            value={projectName}
            onChange={(e: any) => setProjectName(e.target.value)}
            label="Project Name"
            type="text"
            className="w-full"
          />
          <FormInput
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            label="Description"
            type="text"
            className="w-full"
          />
          <label className="flex flex-col gap-[10px]">
            <span className="font-medium">Objective</span>
            <textarea
              value={objective}
              onChange={(e: any) => setObjective(e.target.value)}
              className="w-full bg-[#f3f3f3]/80 focus:bg-[#f3f3f3] py-4 px-6 rounded-[10px] focus:outline-none min-h-[200px]"
            ></textarea>
          </label>

          <FormInput
            value={budget}
            onChange={(e: any) => setBudget(e.target.value)}
            label="Budget (IDR)"
            type="text"
            className="w-full"
          />
          <p className="text-[14px]">
            * To ensure customer commitment, we enforce customers to{" "}
            <strong>pay a fee of IDR 15K</strong> to submit project request.
          </p>
          <Button
            title="Submit"
            color="red"
            className="!rounded-[10px] w-fit"
          />
        </form>
      </main>
    </DashboardLayout>
  );
}
