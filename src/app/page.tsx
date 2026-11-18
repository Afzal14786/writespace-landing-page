import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Benefits } from "@/components/sections/benefits";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Benefits />
      </main>
    </>
  );
}
