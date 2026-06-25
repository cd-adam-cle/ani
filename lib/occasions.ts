// Occasion landing pages. One data row per příležitost drives both the index
// (/prilezitost) and the shared template (/prilezitost/[slug]). `occasionId`
// matches an option in cakeOptions ("occasion" category), so the page CTA can
// pre-select it in the builder via loadPreset(["occasion:<id>"]).

export type Occasion = {
  slug: string;
  occasionId: string;
  accent: "rose" | "honey" | "coral" | "teal";
  cs: { title: string; tagline: string; body: string; ideas: string[] };
  en: { title: string; tagline: string; body: string; ideas: string[] };
  /** featured classic presets, must be ids that exist in cakesData (have /dort/[id]) */
  featured: string[];
};

export const occasions: Occasion[] = [
  {
    slug: "narozeniny",
    occasionId: "birthday",
    accent: "coral",
    cs: {
      title: "Narozeninové dorty",
      tagline: "Aby oslavenec zíral dřív, než ochutná.",
      body: "Od duhových vrstev pro děti po elegantní dort pro dospělé. Řekni, koho slavíme a co má rád, zbytek vymyslíme.",
      ideas: ["Oblíbená chuť oslavence", "Jméno nebo věk na dortu", "Motiv podle koníčku", "Porce přesně na počet hostů"],
    },
    en: {
      title: "Birthday cakes",
      tagline: "So they stare before they even taste it.",
      body: "From rainbow layers for kids to an elegant cake for adults. Tell me who we're celebrating and what they love, we'll figure out the rest.",
      ideas: ["The birthday person's favourite flavour", "Name or age on the cake", "A theme from their hobby", "Servings to match your guests"],
    },
    featured: ["chocodrip", "berry", "redvelvet"],
  },
  {
    slug: "svatba",
    occasionId: "wedding",
    accent: "rose",
    cs: {
      title: "Svatební dorty",
      tagline: "Hlavní hvězda sladkého stolu.",
      body: "Patrové dorty, candy bar i tradiční koláče a frgály pro hosty. Sladíme to s vaší výzdobou a stylem do detailu.",
      ideas: ["Jedno až tři patra", "Živé květiny v boho stylu", "Lehký korpus, ať není těžký", "Mini zákusky a frgály pro hosty"],
    },
    en: {
      title: "Wedding cakes",
      tagline: "The star of the sweet table.",
      body: "Tiered cakes, a candy bar, plus traditional pastries and frgály for guests. We match it to your decor and style down to the detail.",
      ideas: ["One to three tiers", "Fresh boho-style flowers", "A light sponge so it isn't heavy", "Mini desserts and frgály for guests"],
    },
    featured: ["berry", "cheesecake", "redvelvet"],
  },
  {
    slug: "krtiny",
    occasionId: "christening",
    accent: "teal",
    cs: {
      title: "Křtiny a vítání občánků",
      tagline: "Jemné, světlé a nepřeslazené.",
      body: "Decentní dort i drobné zákusky pro rodinu. Něžné barvy, lehká chuť a klidně i jméno miminka.",
      ideas: ["Pastelové barvy", "Lehký smetanový krém", "Jméno a datum", "Menší porce pro rodinu"],
    },
    en: {
      title: "Christenings",
      tagline: "Gentle, light and not too sweet.",
      body: "A subtle cake and small desserts for the family. Soft colours, a light taste and the baby's name if you like.",
      ideas: ["Pastel colours", "Light cream filling", "Name and date", "Smaller servings for the family"],
    },
    featured: ["berry", "cheesecake"],
  },
  {
    slug: "vyroci",
    occasionId: "anniversary",
    accent: "honey",
    cs: {
      title: "Výročí a oslavy",
      tagline: "Připomínka, která se sní s úsměvem.",
      body: "Ať slavíte rok, nebo padesát let spolu, vymyslíme dort, který sedne k příběhu i k chuti.",
      ideas: ["Datum nebo počet let", "Oblíbená chuť z minula", "Elegantní zdobení", "Klasika jako medovník"],
    },
    en: {
      title: "Anniversaries",
      tagline: "A keepsake eaten with a smile.",
      body: "Whether it's one year or fifty together, we'll design a cake that fits the story and the taste.",
      ideas: ["The date or number of years", "A favourite flavour from the past", "Elegant decoration", "A classic like medovník"],
    },
    featured: ["chocodrip", "redvelvet"],
  },
  {
    slug: "firemni",
    occasionId: "corporate",
    accent: "teal",
    cs: {
      title: "Firemní akce",
      tagline: "Elegantní, ale ne nudné.",
      body: "Dort i zákusky ve firemních barvách, decentně a profesionálně. Postaráme se o porce pro celý tým.",
      ideas: ["Firemní barvy a logo", "Porce pro celý tým", "Decentní, profesionální vzhled", "Mix dortu a mini zákusků"],
    },
    en: {
      title: "Corporate events",
      tagline: "Elegant, but never boring.",
      body: "A cake and desserts in your brand colours, understated and professional. We'll cover servings for the whole team.",
      ideas: ["Brand colours and logo", "Servings for the whole team", "Understated, professional look", "A mix of cake and mini desserts"],
    },
    featured: ["redvelvet", "cheesecake"],
  },
  {
    slug: "jen-tak",
    occasionId: "justbecause",
    accent: "honey",
    cs: {
      title: "Jen tak pro radost",
      tagline: "Nepotřebuješ důvod na dobrý dort.",
      body: "Chuť na něco dobrého? Frgál, zákusek nebo malý dort jen pro sebe a své blízké. Klidně i tradiční klasika.",
      ideas: ["Malá porce jen pro vás", "Tradiční frgály a koláče", "Tvoje oblíbená chuť", "Bez velkého plánování"],
    },
    en: {
      title: "Just because",
      tagline: "You don't need a reason for a good cake.",
      body: "Craving something good? A frgál, a dessert or a small cake just for you and your people. A traditional classic works too.",
      ideas: ["A small portion just for you", "Traditional frgály and pastries", "Your favourite flavour", "No big planning needed"],
    },
    featured: ["berry", "chocodrip"],
  },
];

export const occasionBySlug = Object.fromEntries(occasions.map((o) => [o.slug, o]));
