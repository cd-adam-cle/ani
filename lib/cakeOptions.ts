// The full taxonomy a custom cake is built from. Shared by the landing picker
// (multi-select wishlist) and the step-by-step inquiry page, so the two never
// drift apart. 7 categories, 40+ options, a real cake is not "three things".

export type CakeOption = { id: string; cs: string; en: string };

export type CakeCategory = {
  id: string;
  cs: string;
  en: string;
  /** short helper line shown under the category title */
  hintCs: string;
  hintEn: string;
  /** lucide-react icon name (resolved in the component) */
  icon: string;
  /** which step of the dedicated builder this belongs to (1-3) */
  step: 1 | 2 | 3;
  options: CakeOption[];
};

export const cakeCategories: CakeCategory[] = [
  {
    id: "occasion",
    cs: "Příležitost",
    en: "Occasion",
    hintCs: "Pro jakou chvíli dort bude",
    hintEn: "What the cake is for",
    icon: "Sparkles",
    step: 1,
    options: [
      { id: "birthday", cs: "Narozeniny", en: "Birthday" },
      { id: "wedding", cs: "Svatba", en: "Wedding" },
      { id: "christening", cs: "Křtiny", en: "Christening" },
      { id: "anniversary", cs: "Výročí", en: "Anniversary" },
      { id: "corporate", cs: "Firemní akce", en: "Corporate event" },
      { id: "justbecause", cs: "Jen tak pro radost", en: "Just because" },
    ],
  },
  {
    id: "size",
    cs: "Velikost",
    en: "Size",
    hintCs: "Kolik lidí dort nakrmí",
    hintEn: "How many it serves",
    icon: "Users",
    step: 1,
    options: [
      { id: "s", cs: "6-8 porcí", en: "6-8 servings" },
      { id: "m", cs: "10-15 porcí", en: "10-15 servings" },
      { id: "l", cs: "20-30 porcí", en: "20-30 servings" },
      { id: "tiered", cs: "Patrový dort", en: "Tiered cake" },
    ],
  },
  {
    id: "sponge",
    cs: "Korpus",
    en: "Sponge",
    hintCs: "Základ, od kterého se vše odvíjí",
    hintEn: "The base it all builds on",
    icon: "Layers",
    step: 2,
    options: [
      { id: "vanilla", cs: "Vanilkový", en: "Vanilla" },
      { id: "chocolate", cs: "Čokoládový", en: "Chocolate" },
      { id: "hazelnut", cs: "Oříškový", en: "Hazelnut" },
      { id: "lemon", cs: "Citronový", en: "Lemon" },
      { id: "redvelvet", cs: "Red velvet", en: "Red velvet" },
      { id: "carrot", cs: "Mrkvový", en: "Carrot" },
      { id: "glutenfree", cs: "Bezlepkový", en: "Gluten-free" },
    ],
  },
  {
    id: "cream",
    cs: "Krém & náplň",
    en: "Cream & filling",
    hintCs: "Sametové srdce dortu",
    hintEn: "The velvety heart",
    icon: "Heart",
    step: 2,
    options: [
      { id: "mascarpone", cs: "Mascarpone s vanilkou", en: "Vanilla mascarpone" },
      { id: "parisian", cs: "Pařížská čokoláda", en: "Parisian chocolate" },
      { id: "pistachio", cs: "Pistáciový", en: "Pistachio" },
      { id: "cheesecake", cs: "Tvarohový (cheesecake)", en: "Cream cheese" },
      { id: "saltedcaramel", cs: "Slaný karamel", en: "Salted caramel" },
      { id: "fruitcompote", cs: "Domácí ovocný rozvar", en: "Homemade fruit compote" },
      { id: "nougat", cs: "Nugát / Ferrero", en: "Nougat / Ferrero" },
    ],
  },
  {
    id: "addins",
    cs: "Ovoce & přísady",
    en: "Fruit & add-ins",
    hintCs: "Co schováme mezi vrstvy",
    hintEn: "Tucked between the layers",
    icon: "Cherry",
    step: 2,
    options: [
      { id: "forestberries", cs: "Lesní ovoce", en: "Forest berries" },
      { id: "raspberry", cs: "Maliny", en: "Raspberries" },
      { id: "blueberry", cs: "Borůvky", en: "Blueberries" },
      { id: "strawberry", cs: "Jahody", en: "Strawberries" },
      { id: "citrus", cs: "Citrusy", en: "Citrus" },
      { id: "nuts", cs: "Ořechy", en: "Nuts" },
      { id: "cookies", cs: "Oreo / sušenky", en: "Oreo / cookies" },
    ],
  },
  {
    id: "finish",
    cs: "Poleva & potah",
    en: "Finish",
    hintCs: "Jak bude dort vypadat zvenku",
    hintEn: "How the outside looks",
    icon: "Brush",
    step: 3,
    options: [
      { id: "buttercream", cs: "Máslový krém", en: "Buttercream" },
      { id: "ganachedrip", cs: "Ganache drip", en: "Ganache drip" },
      { id: "naked", cs: "Naked (bez potahu)", en: "Naked (semi-bare)" },
      { id: "fondant", cs: "Fondán", en: "Fondant" },
      { id: "mirror", cs: "Zrcadlová poleva", en: "Mirror glaze" },
    ],
  },
  {
    id: "decoration",
    cs: "Zdobení",
    en: "Decoration",
    hintCs: "Poslední tečka, charakter dortu",
    hintEn: "The finishing character",
    icon: "Flower2",
    step: 3,
    options: [
      { id: "freshflowers", cs: "Čerstvé květiny", en: "Fresh flowers" },
      { id: "marzipan", cs: "Marcipánové figurky", en: "Marzipan figures" },
      { id: "forest", cs: "Lesní motiv (mech, houbičky)", en: "Forest theme (moss, mushrooms)" },
      { id: "goldleaf", cs: "Zlaté lístky", en: "Gold leaf" },
      { id: "sprinkles", cs: "Sprinkles", en: "Sprinkles" },
      { id: "fruittop", cs: "Čerstvé ovoce navrch", en: "Fresh fruit on top" },
      { id: "topper", cs: "Nápis / topper", en: "Lettering / topper" },
    ],
  },
];

// Categories where a single choice is the natural answer; everything else is
// free multi-select.
export const SINGLE_CHOICE = new Set(["occasion", "size"]);

export const categoryById = Object.fromEntries(
  cakeCategories.map((c) => [c.id, c]),
);

export function optionLabel(
  catId: string,
  optId: string,
  lang: "cs" | "en",
): string | null {
  const cat = categoryById[catId];
  const opt = cat?.options.find((o) => o.id === optId);
  return opt ? (lang === "cs" ? opt.cs : opt.en) : null;
}
