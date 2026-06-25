export type CakePreset = {
  id: string;
  name: string;
  image: string;
  description: string;
  presetConfig: string[]; // array of keys like "sponge:chocolate", "finish:ganachedrip"
  occasions: string[];
};

export const cakesData: CakePreset[] = [
  {
    id: "chocodrip",
    name: "Čokoládový Drip",
    image: "/photos/cakes/02-chocodrip-exterior.webp",
    description: "Klasický kakaový korpus s jemným čokoládovým krémem a bohatým stekem z pravé belgické čokolády.",
    presetConfig: [
      "sponge:chocolate",
      "cream:parisian",
      "addins:raspberry",
      "finish:ganachedrip",
    ],
    occasions: ["narozeniny", "oslava", "vyroci"],
  },
  {
    id: "berry",
    name: "Lesní Ovoce",
    image: "/photos/cakes/03-berry-exterior.webp",
    description: "Svěží vanilkový korpus doplněný lehkým mascarpone krémem a obrovskou hromadou čerstvého lesního ovoce.",
    presetConfig: [
      "sponge:vanilla",
      "cream:mascarpone",
      "addins:forestberries",
      "finish:naked",
      "decoration:fruittop",
    ],
    occasions: ["narozeniny", "oslava", "svatba"],
  },
  {
    id: "forest",
    name: "Mechový Dort",
    image: "/photos/cakes/01-forest-exterior.webp",
    description: "Náš signature dort. Špenátový korpus, který nejen krásně vypadá, ale skvěle chutná. Svěží tvarohový krém a spousta ovoce.",
    presetConfig: [
      "sponge:vanilla",
      "cream:cheesecake",
      "addins:strawberry",
      "finish:naked",
      "decoration:forest",
    ],
    occasions: ["narozeniny", "svatba", "oslava"],
  },
  {
    id: "redvelvet",
    name: "Red Velvet",
    image: "/photos/cakes/04-redvelvet-exterior.webp",
    description: "Královna mezi dorty. Sametově červený kakaový korpus promazaný klasickým cream cheese krémem.",
    presetConfig: [
      "sponge:redvelvet",
      "cream:cheesecake",
      "addins:raspberry",
      "finish:naked",
      "decoration:fruittop",
    ],
    occasions: ["narozeniny", "vyroci", "svatba"],
  },
  {
    id: "cheesecake",
    name: "Pečený Cheesecake",
    image: "/photos/cakes/05-cheesecake-exterior.webp",
    description: "Hutný a krémový pečený cheesecake v New York stylu s karamelovou polevou.",
    presetConfig: [
      "sponge:vanilla",
      "cream:cheesecake",
      "addins:citrus",
      "finish:naked",
      "decoration:freshflowers",
    ],
    occasions: ["oslava", "narozeniny", "firemni"],
  },
  {
    id: "birthday",
    name: "Narozeninový",
    image: "/photos/cakes/06-birthday-exterior.webp",
    description: "Veselý narozeninový dort s duhovými vrstvami uvnitř a hromadou barevných sprinkles navrch.",
    presetConfig: [
      "sponge:vanilla",
      "cream:mascarpone",
      "addins:forestberries",
      "finish:buttercream",
      "decoration:sprinkles",
    ],
    occasions: ["narozeniny", "oslava"],
  },
  {
    id: "wedding",
    name: "Svatební",
    image: "/photos/cakes/07-wedding-exterior.webp",
    description: "Elegantní dvoupatrový svatební dort. Čistě bílý design zdobený čerstvými květinami.",
    presetConfig: [
      "size:tiered",
      "sponge:vanilla",
      "cream:mascarpone",
      "addins:raspberry",
      "finish:fondant",
      "decoration:freshflowers",
    ],
    occasions: ["svatba"],
  },
  {
    id: "ferrero",
    name: "Oříškový Ferrero",
    image: "/photos/cakes/08-ferrero-exterior.webp",
    description: "Pro milovníky oříšků. Oříškový korpus, lahodný nugátový krém a spousta křupavých lískových ořechů.",
    presetConfig: [
      "sponge:hazelnut",
      "cream:nougat",
      "addins:nuts",
      "finish:ganachedrip",
      "decoration:marzipan",
    ],
    occasions: ["narozeniny", "oslava", "vyroci"],
  },
  {
    id: "lemon",
    name: "Citronový",
    image: "/photos/cakes/09-lemon-exterior.webp",
    description: "Lehký, svěží a jemně nakyslý citronový dort s hladkým máslovým krémem, ideální pro letní dny.",
    presetConfig: [
      "sponge:lemon",
      "cream:mascarpone",
      "addins:citrus",
      "finish:buttercream",
      "decoration:fruittop",
    ],
    occasions: ["oslava", "firemni"],
  },
  {
    id: "oreo",
    name: "Oreo Cookies & Cream",
    image: "/photos/cakes/10-oreo-exterior.webp",
    description: "Americká klasika s oblíbenými sušenkami Oreo, které jsou zašlehané přímo do lahodného smetanového krému.",
    presetConfig: [
      "sponge:chocolate",
      "cream:mascarpone",
      "addins:cookies",
      "finish:buttercream",
      "decoration:sprinkles",
    ],
    occasions: ["narozeniny", "oslava", "svatba"],
  },
];
