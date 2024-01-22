import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-neutral-1 min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
