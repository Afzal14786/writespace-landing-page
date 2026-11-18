import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Benefits } from "@/components/sections/benefits";
import { Preview } from "@/components/sections/preview";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Benefits />
        <Preview/>
      </main>
    </>
  );
}
