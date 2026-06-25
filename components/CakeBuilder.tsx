"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import RippleButton from "@/components/ui/RippleButton";
import { ArrowRight } from "lucide-react";

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className?: string;
  scrollYProgress: any;
}) => {
  // SVG má na začátku spoustu smyček (nahoru a dolů), kvůli kterým se opticky 
  // nevykresluje směrem dolů a "nestíhá" obrazovku. Proto prvních 65 % délky 
  // čáry vyženeme rychle na začátku scrollování a zbytek už jen plynule dojíždí.
  const pathLength = useTransform(scrollYProgress, [0, 0.35, 0.85], [0, 0.65, 1]);

  return (
    <svg
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#B24C63"
        strokeWidth="14"
        strokeLinecap="round"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

export default function CakeBuilder() {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 10%"]
  });

  return (
    <section id="konfigurator" ref={containerRef} className="relative bg-cream pt-16 pb-24 sm:pt-20 sm:pb-32 overflow-hidden">
      
      {/* Background SVG Animation */}
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-40 pointer-events-none flex justify-center">
        <LinePath scrollYProgress={scrollYProgress} className="w-[120%] md:w-[80%] h-full max-w-none" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-rose">
            {lang === "cs" ? "Slož si svůj dort" : "Build your cake"}
          </span>
          <AnimatedHeading
            wrapperClassName="mt-3"
            className="text-4xl sm:text-5xl"
            text={lang === "cs" ? "Je to celé na tobě." : "It's all up to you."}
          />
          <p className="mt-4 text-[17px] leading-relaxed text-ink/75">
            {lang === "cs"
              ? "Žádné pevné menu ani omezující tabulky. Proces je jednoduchý, plynulý a dá ti plnou svobodu vytvořit si dort snů."
              : "No fixed menus or restrictive tables. The process is simple, fluid and gives you full freedom to create your dream cake."}
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto max-w-3xl flex flex-col gap-16 md:gap-24">
          
          {/* Step 1 */}
          <div className="relative rounded-[2rem] border border-ink/10 bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-10">
            <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose text-xl font-bold text-cream shadow-lg">
              1
            </div>
            <div className="mt-2">
              <h3 className="font-display text-2xl text-ink">
                {lang === "cs" ? "Tvoje představa" : "Your idea"}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink/75">
                {lang === "cs"
                  ? "Vybereš si jakékoliv specifikace, oblíbené chutě a styl dortu. Nezáleží na tom, jestli máš jasnou vizi, fotku z Pinterestu, nebo jen víš, že oslavenec miluje čokoládu s malinami."
                  : "You choose any specifications, favorite flavors and style. It doesn't matter if you have a clear vision, a photo from Pinterest, or just know they love chocolate and raspberries."}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-[2rem] border border-ink/10 bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-10 md:ml-12">
            <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose text-xl font-bold text-cream shadow-lg">
              2
            </div>
            <div className="mt-2">
              <h3 className="font-display text-2xl text-ink">
                {lang === "cs" ? "Aniččin návrh" : "Anička's design"}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink/75">
                {lang === "cs"
                  ? "Předáš nám to. Anička se na tvé přání podívá a svými zkušenostmi z toho sestaví ten nejlepší možný návrh přesně pro tebe. Krok za krokem, od korpusu až po finální zdobení."
                  : "You pass it to us. Anička reviews your wishes and uses her experience to put together the best possible design just for you. Step by step, from the sponge to the final decoration."}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-[2rem] border border-ink/10 bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-10 md:ml-24">
            <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose text-xl font-bold text-cream shadow-lg">
              3
            </div>
            <div className="mt-2">
              <h3 className="font-display text-2xl text-ink">
                {lang === "cs" ? "Dokonalý dort" : "The perfect cake"}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink/75">
                {lang === "cs"
                  ? "Návrh ti pošleme zpět. Ty se na něj podíváš, společně ho případně doladíme do detailu a Anička se pak rovnou pustí do pečení."
                  : "We send the design back to you. You review it, we fine-tune any details together, and then Anička gets straight to baking."}
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-24 flex justify-center">
          <RippleButton href="/sloz-si-dort">
            {lang === "cs" ? "Začít s poptávkou" : "Start your inquiry"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </RippleButton>
        </div>
      </div>
    </section>
  );
}
