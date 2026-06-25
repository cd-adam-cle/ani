// Real generated product photos (transparent cutouts, web-optimized webp).
// One source of truth for the gallery, the hero and the builder previews.

export type Cake = {
  id: string;
  cs: string;
  en: string;
  exterior: string;
  slice: string;
  /** one-line flavour note shown as a caption below the photo */
  noteCs: string;
  noteEn: string;
  occasions: string[];
};

const base = "/photos/cakes";

export const cakes: Cake[] = [
  {
    id: "forest",
    cs: "Lesní dort",
    en: "Forest Cake",
    exterior: `${base}/01-forest-exterior.webp`,
    slice: `${base}/01-forest-slice.webp`,
    noteCs: "Čokoláda, mech z pistácie, marcipánové houbičky",
    noteEn: "Chocolate, pistachio moss, marzipan mushrooms",
    occasions: ["narozeniny", "svatba", "oslava"],
  },
  {
    id: "chocodrip",
    cs: "Čokoládový drip",
    en: "Chocolate Drip",
    exterior: `${base}/02-chocodrip-exterior.webp`,
    slice: `${base}/02-chocodrip-slice.webp`,
    noteCs: "Belgická čokoláda a stékající ganache",
    noteEn: "Belgian chocolate with a flowing ganache drip",
    occasions: ["narozeniny", "oslava", "vyroci"],
  },
  {
    id: "berry",
    cs: "Ovocný s lesním ovocem",
    en: "Forest-Berry Cake",
    exterior: `${base}/03-berry-exterior.webp`,
    slice: `${base}/03-berry-slice.webp`,
    noteCs: "Lehký korpus, maliny, borůvky a smetanový krém",
    noteEn: "Light sponge, raspberries, blueberries, cream",
    occasions: ["narozeniny", "oslava", "svatba"],
  },
  {
    id: "redvelvet",
    cs: "Red Velvet",
    en: "Red Velvet",
    exterior: `${base}/04-redvelvet-exterior.webp`,
    slice: `${base}/04-redvelvet-slice.webp`,
    noteCs: "Sametový korpus a tvarohový krém",
    noteEn: "Velvet sponge with cream-cheese frosting",
    occasions: ["narozeniny", "vyroci", "svatba"],
  },
  {
    id: "cheesecake",
    cs: "Cheesecake",
    en: "Cheesecake",
    exterior: `${base}/05-cheesecake-exterior.webp`,
    slice: `${base}/05-cheesecake-slice.webp`,
    noteCs: "New York styl s ovocným toppingem",
    noteEn: "New York style with a fruit topping",
    occasions: ["oslava", "narozeniny", "firemni"],
  },
  {
    id: "birthday",
    cs: "Narozeninový",
    en: "Birthday Cake",
    exterior: `${base}/06-birthday-exterior.webp`,
    slice: `${base}/06-birthday-slice.webp`,
    noteCs: "Duhové vrstvy a barevné sprinkles",
    noteEn: "Rainbow layers and colourful sprinkles",
    occasions: ["narozeniny", "oslava"],
  },
  {
    id: "wedding",
    cs: "Svatební",
    en: "Wedding Cake",
    exterior: `${base}/07-wedding-exterior.webp`,
    slice: `${base}/07-wedding-slice.webp`,
    noteCs: "Dvoupatrový, čistě bílý s živými květy",
    noteEn: "Two-tier, pure white with fresh flowers",
    occasions: ["svatba"],
  },
  {
    id: "ferrero",
    cs: "Oříškový Ferrero",
    en: "Hazelnut Ferrero",
    exterior: `${base}/08-ferrero-exterior.webp`,
    slice: `${base}/08-ferrero-slice.webp`,
    noteCs: "Oříškový korpus, nugát a křupavé lískáče",
    noteEn: "Hazelnut sponge, nougat and crunchy praline",
    occasions: ["narozeniny", "oslava", "vyroci"],
  },
  {
    id: "lemon",
    cs: "Citronový",
    en: "Lemon Cake",
    exterior: `${base}/09-lemon-exterior.webp`,
    slice: `${base}/09-lemon-slice.webp`,
    noteCs: "Svěží citron a jemný máslový krém",
    noteEn: "Fresh lemon with a delicate buttercream",
    occasions: ["oslava", "firemni"],
  },
  {
    id: "oreo",
    cs: "Oreo cookies & cream",
    en: "Oreo Cookies & Cream",
    exterior: `${base}/10-oreo-exterior.webp`,
    slice: `${base}/10-oreo-slice.webp`,
    noteCs: "Sušenky Oreo ve smetanovém krému",
    noteEn: "Oreo cookies folded through cream",
    occasions: ["narozeniny", "oslava", "svatba"],
  },
];
