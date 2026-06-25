// Client stories. Each one is a small "before → after": the original request
// (what the client asked Anička for) sitting next to their review afterwards.
// Cake photos reuse the real product shots until real client photos arrive.

export type Testimonial = {
  id: string;
  name: string;
  occasionCs: string;
  occasionEn: string;
  image: string;
  /** the brief the client originally sent */
  requestCs: string;
  requestEn: string;
  /** what they said afterwards */
  reviewCs: string;
  reviewEn: string;
};

const base = "/photos/cakes";

export const testimonials: Testimonial[] = [
  {
    id: "tereza",
    name: "Tereza K.",
    occasionCs: "Svatební dort · 60 hostů",
    occasionEn: "Wedding cake · 60 guests",
    image: `${base}/07-wedding-exterior.webp`,
    requestCs:
      "Sháněli jsme dvoupatrový svatební dort, čistě bílý a jednoduchý, s živými květinami v boho stylu. Korpus citronový, ať není těžký, a termín půlka června.",
    requestEn:
      "We wanted a two-tier wedding cake, pure white and simple, with fresh boho-style flowers. A lemon sponge so it isn't heavy, for mid-June.",
    reviewCs:
      "Anička trefila náš styl úplně přesně. Dort byl nádherný a hosté pořád mluvili o té citronové náplni. Domluva byla naprosto v pohodě.",
    reviewEn:
      "Anička nailed our style exactly. The cake was gorgeous and guests kept talking about the lemon filling. The whole process was effortless.",
  },
  {
    id: "martin",
    name: "Martin D.",
    occasionCs: "Narozeniny syna · lesní motiv",
    occasionEn: "Son's birthday · forest theme",
    image: `${base}/01-forest-exterior.webp`,
    requestCs:
      "Syn miluje les a houby. Chtěl jsem dort, co vypadá jako kus lesa, mech, houbičky, kůra, a uvnitř pořádná čokoláda. Nechal jsem zdobení na Aničce.",
    requestEn:
      "My son loves the forest and mushrooms. I wanted a cake that looks like a piece of woodland, moss, mushrooms, bark, and proper chocolate inside. I left the decoration to Anička.",
    reviewCs:
      "Když to syn uviděl, jen zíral. Vypadalo to jako z pohádky a chutnalo ještě líp. Přesně ten detail, co bych sám nevymyslel.",
    reviewEn:
      "When my son saw it he just stared. It looked like a fairytale and tasted even better. Exactly the detail I'd never have thought of myself.",
  },
  {
    id: "lucie",
    name: "Lucie M.",
    occasionCs: "Oslava · nechala výběr na Aničce",
    occasionEn: "Celebration · left the choice to Anička",
    image: `${base}/03-berry-exterior.webp`,
    requestCs:
      "Potřebovala jsem dort na oslavu a měla jen pár chutí: čokoláda, lesní ovoce, nic přeslazeného. Jasnou představu o vzhledu jsem neměla, tak jsem to nechala na Aničce.",
    requestEn:
      "I needed a cake for a celebration and only had a few flavours in mind: chocolate, forest berries, nothing too sweet. I had no clear look in mind, so I left it to Anička.",
    reviewCs:
      "Řekla jsem jen pár chutí a Anička z toho vykouzlila něco, co bych sama nevymyslela. Přesně tohle jsem chtěla, jen jsem to ještě nevěděla.",
    reviewEn:
      "I gave a few flavours and Anička conjured something I'd never have designed. Exactly what I wanted, I just didn't know it yet.",
  },
  {
    id: "petra",
    name: "Petra V.",
    occasionCs: "Firemní akce · 30 porcí",
    occasionEn: "Corporate event · 30 servings",
    image: `${base}/04-redvelvet-exterior.webp`,
    requestCs:
      "Pro firemní večírek jsem chtěla něco elegantního, ale ne nudného. Red velvet s tvarohovým krémem, decentní, v našich firemních barvách.",
    requestEn:
      "For a company evening I wanted something elegant but not boring. Red velvet with cream-cheese frosting, understated, in our brand colours.",
    reviewCs:
      "Profesionální od první zprávy po předání. Dort byl přesně tak decentní, jak jsem potřebovala, a zmizel za chvíli. Budeme objednávat znovu.",
    reviewEn:
      "Professional from the first message to handover. The cake was exactly as understated as I needed, and it vanished in minutes. We'll order again.",
  },
];
