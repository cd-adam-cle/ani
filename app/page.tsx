import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CakeBuilder from "@/components/CakeBuilder";
import Testimonials from "@/components/Testimonials";
import TextReveal from "@/components/TextReveal";
import BrandLine from "@/components/effects/BrandLine";
import {
  Categories,
  Gallery,
  Story,
  CtaBand,
  Footer,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <BrandLine />
      <Navbar />
      <main>
        <Hero />
        <TextReveal />
        <Categories />
        <CakeBuilder />
        <Gallery />
        <Testimonials />
        <Story />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
