import { useRouter } from "next/router";
import { useEffect } from "react";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Hero from "@/components/Landing/Hero";
import Intro from "@/components/Landing/Intro";
import Projects from "@/components/Landing/Projects";
import Solutions from "@/components/Landing/Solutions";
import Testimony from "@/components/Landing/Testimony";
import Head from "next/head";

export default function AboutPage() {
    const router = useRouter();
    // useEffect(() => {
    //     router.replace("/coming-soon");
    // });
    return (
        <>
        <Head>
            <title>About Night Login</title>
        </Head>
        <main className="bg-neutral-1 w-full min-h-screen flex flex-col justify-center overflow-x-hidden">
            <Intro isCompleteVersion={true} />
            <Footer />
            <Chatbot />
        </main>
        </>
    )
}