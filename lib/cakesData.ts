export type CakePreset = {
  id: string;
  name: string;
  image: string;
  description: string;
  presetConfig: string[]; // array of keys like "sponge:chocolate", "finish:ganachedrip"
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
  },
];
