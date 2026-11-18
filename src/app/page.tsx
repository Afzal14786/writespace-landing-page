import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Benefits } from "@/components/sections/benefits";
import { Preview } from "@/components/sections/preview";
import { Audience } from "@/components/sections/audience";
import { FounderNote } from "@/components/sections/founder-note";
import { Roadmap } from "@/components/sections/roadmap";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Benefits />
        <Preview />
        <Audience />
        <FounderNote />
        <Roadmap />
        <FAQ />
      </main>
    </>
  );
}
