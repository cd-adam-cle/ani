// Frgály a tradiční české zákusky, real generated product cutouts (transparent
// webp). Same shape as lib/cakes.ts so they drop straight into CakeCard and the
// gallery. Split by `kind` so the gallery can group Dorty / Zákusky / Frgály.

export type DessertKind = "frgal" | "zakusek";

export type Dessert = {
  id: string;
  kind: DessertKind;
  cs: string;
  en: string;
  exterior: string;
  slice: string;
  noteCs: string;
  noteEn: string;
  occasions: string[];
};

const base = "/photos/desserts";

export const frgaly: Dessert[] = [
  {
    id: "frgal-hruskovy",
    kind: "frgal",
    cs: "Hruškovo-povidlový frgál",
    en: "Pear & plum-butter frgál",
    exterior: `${base}/01-frgal-hruskovy-exterior.webp`,
    slice: `${base}/01-frgal-hruskovy-slice.webp`,
    noteCs: "Tenké kynuté těsto, povidla, hrušky a drobenka",
    noteEn: "Thin yeast dough, plum butter, pears and crumble",
    occasions: ["oslava", "svatba", "firemni"],
  },
  {
    id: "frgal-makovy",
    kind: "frgal",
    cs: "Makový frgál",
    en: "Poppy-seed frgál",
    exterior: `${base}/02-frgal-makovy-exterior.webp`,
    slice: `${base}/02-frgal-makovy-slice.webp`,
    noteCs: "Domácí mletý mák a křehká drobenka",
    noteEn: "Homemade ground poppy seed and crisp crumble",
    occasions: ["oslava", "svatba", "firemni"],
  },
  {
    id: "frgal-tvarohovy",
    kind: "frgal",
    cs: "Tvarohový frgál",
    en: "Quark frgál",
    exterior: `${base}/03-frgal-tvarohovy-exterior.webp`,
    slice: `${base}/03-frgal-tvarohovy-slice.webp`,
    noteCs: "Jemný tvaroh s rozinkami pod drobenkou",
    noteEn: "Soft quark with raisins under a crumble",
    occasions: ["oslava", "svatba", "firemni"],
  },
  {
    id: "frgal-jablecny",
    kind: "frgal",
    cs: "Jablečný frgál",
    en: "Apple frgál",
    exterior: `${base}/04-frgal-jablecny-exterior.webp`,
    slice: `${base}/04-frgal-jablecny-slice.webp`,
    noteCs: "Jablka se skořicí a poctivou drobenkou",
    noteEn: "Apples with cinnamon and a generous crumble",
    occasions: ["oslava", "svatba", "firemni"],
  },
];

export const zakusky: Dessert[] = [
  {
    id: "vetrnik",
    kind: "zakusek",
    cs: "Větrník",
    en: "Větrník (cream puff)",
    exterior: `${base}/05-vetrnik-exterior.webp`,
    slice: `${base}/05-vetrnik-slice.webp`,
    noteCs: "Odpalované těsto, karamel a šlehačkový krém",
    noteEn: "Choux pastry, caramel and whipped cream",
    occasions: ["oslava", "narozeniny", "svatba"],
  },
  {
    id: "medovnik",
    kind: "zakusek",
    cs: "Medovník",
    en: "Medovník (honey cake)",
    exterior: `${base}/06-medovnik-exterior.webp`,
    slice: `${base}/06-medovnik-slice.webp`,
    noteCs: "Mnoho tenkých medových vrstev a krém",
    noteEn: "Many thin honey layers with cream",
    occasions: ["oslava", "narozeniny", "svatba"],
  },
  {
    id: "puncovy-rez",
    kind: "zakusek",
    cs: "Punčový řez",
    en: "Punch slice",
    exterior: `${base}/07-puncovy-rez-exterior.webp`,
    slice: `${base}/07-puncovy-rez-slice.webp`,
    noteCs: "Piškot v rumu s růžovou polevou",
    noteEn: "Rum-soaked sponge with a pink glaze",
    occasions: ["oslava", "narozeniny", "svatba"],
  },
];

export const desserts: Dessert[] = [...frgaly, ...zakusky];
