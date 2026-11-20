import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { OneIdea } from "@/components/sections/one-idea";
import { Benefits } from "@/components/sections/benefits";
import { Preview } from "@/components/sections/preview";
import { Developers } from "@/components/sections/developers";
import { Audience } from "@/components/sections/audience";
import { FAQ } from "@/components/sections/faq";
// import { Waitlist } from "@/components/sections/waitlist";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <OneIdea />
        <Benefits />
        <Preview />
        <Developers />
        <Audience />
        <FAQ />
        {/* <Waitlist /> */}
      </main>

      <Footer />
    </>
  );
}
