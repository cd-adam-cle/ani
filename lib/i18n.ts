// Minimal i18n dictionary. Czech is the default; English is a toggle.
// Only the keys actually rendered by the site live here.

export type Lang = "cs" | "en";

export type Dict = {
  nav: { order: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
  };
  sections: {
    pickTitle: string;
    pickSubtitle: string;
    cakes: string;
    cakesDesc: string;
    desserts: string;
    dessertsDesc: string;
    koláče: string;
    koláčeDesc: string;
    galleryTitle: string;
    storyTitle: string;
    storyBody: string;
    ctaBandTitle: string;
    ctaBandBody: string;
  };
  footer: { tagline: string; madeWith: string };
};

export const dict: Record<Lang, Dict> = {
  cs: {
    nav: { order: "Objednat" },
    hero: {
      eyebrow: "10 let zkušeností",
      title: "Domácí cukrářství",
      titleAccent: "",
      subtitle: "",
      ctaPrimary: "",
    },
    sections: {
      pickTitle: "Na co máš chuť?",
      pickSubtitle: "Vyber kategorii a najdi to pravé pro tvou příležitost.",
      cakes: "Dorty",
      cakesDesc: "Narozeninové, svatební i sváteční dorty na míru.",
      desserts: "Zákusky",
      dessertsDesc: "Malé dobroty na akce i jen tak pro radost.",
      koláče: "Koláče & frgále",
      koláčeDesc: "Tradiční chutě, jak je znáš z domova.",
      galleryTitle: "Co Anička upekla",
      storyTitle: "Peču od svých třinácti",
      storyBody:
        "Anička peče přes deset let, od domácích koláčů až po vícepatrové dorty na zakázku. Každý dort je originál: žádné šablony, jen tvoje představa a její řemeslo.",
      ctaBandTitle: "Máš v hlavě dort?",
      ctaBandBody: "Pojď si ho složit nebo napiš a vymyslíme ho spolu.",
    },
    footer: {
      tagline: "Domácí dorty, zákusky a frgály na míru.",
      madeWith: "Pečeno s láskou",
    },
  },

  en: {
    nav: { order: "Order" },
    hero: {
      eyebrow: "10 years of craft",
      title: "Homemade Patisserie",
      titleAccent: "",
      subtitle: "",
      ctaPrimary: "",
    },
    sections: {
      pickTitle: "What are you craving?",
      pickSubtitle: "Pick a category and find the right thing for your occasion.",
      cakes: "Cakes",
      cakesDesc: "Birthday, wedding and celebration cakes, made to order.",
      desserts: "Desserts",
      dessertsDesc: "Little treats for events or just because.",
      koláče: "Koláče & frgále",
      koláčeDesc: "Traditional flavours, just like home.",
      galleryTitle: "What Anička baked",
      storyTitle: "Baking since I was thirteen",
      storyBody:
        "Anička has been baking for over ten years, from homemade pastries to multi-tier custom cakes. Every cake is one of a kind: no templates, just your idea and her craft.",
      ctaBandTitle: "Got a cake in mind?",
      ctaBandBody: "Come build it, or write us and we'll figure it out together.",
    },
    footer: {
      tagline: "Homemade custom cakes, desserts and pastries.",
      madeWith: "Baked with love",
    },
  },
};
