import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CakeBuilder from "@/components/CakeBuilder";
import Testimonials from "@/components/Testimonials";
import BrandLine from "@/components/effects/BrandLine";
import {
  Categories,
  Gallery,
  WhyAnicka,
  Story,
  Faq,
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
        <Categories />
        <CakeBuilder />
        <Gallery />
        <WhyAnicka />
        <Testimonials />
        <Story />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
